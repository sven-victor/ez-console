// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package server

import (
	"fmt"
	"io"
	"strings"

	"github.com/go-kit/log/level"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/storage"
	"github.com/sven-victor/ez-console/pkg/storage/dbfs"
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/log/flag"
)

// NewStorageCommand returns the standalone `storage` command group used by the
// framework binary (`ez-console storage migrate`). Downstream applications
// already get the same group as a subcommand of NewCommandServer.
func NewStorageCommand(serviceName string) *cobra.Command {
	var cfgFile string
	return newStorageCommand(serviceName, &cfgFile, true)
}

func newStorageCommand(serviceName string, cfgFile *string, standalone bool) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "storage",
		Short: "Storage backend utilities",
		Long: `Utilities for the pluggable object-storage backends (local, db, s3).

Registered drivers in this binary: ` + strings.Join(storage.Drivers(), ", ") + `.
The s3 driver is a separate module and only appears after a blank import of
github.com/sven-victor/ez-console/pkg/storage/s3.`,
	}
	if standalone {
		flag.AddFlags(cmd.PersistentFlags(), nil)
		cmd.PersistentFlags().StringVar(cfgFile, "config", "", "config file (default is ./config.yaml)")
		cmd.PersistentFlags().String("global.encrypt-key", "", "global encrypt key (The encryption key length must be 0, 8, 16, 24, or 32)")
	}
	cmd.PersistentFlags().AddFlagSet(newDatabaseFlagSet(serviceName))
	cmd.AddCommand(newStorageMigrateCommand(serviceName, cfgFile))
	return cmd
}

func newStorageMigrateCommand(serviceName string, cfgFile *string) *cobra.Command {
	var (
		fromSpec    string
		toSpec      string
		fromCurrent string
		toCurrent   string
		prefix      string
		dryRun      bool
		overwrite   bool
		concurrency int
	)

	cmd := &cobra.Command{
		Use:   "migrate",
		Short: "Copy files between storage backends",
		Long: `Copy the file tree from one storage backend to another.

Source and destination are independent of (or taken from) the running
configuration. Specs accept a local directory path or the compact driver map
used by --server.file_upload_path (driver=db,namespace=uploads).

Typical cut-over:

  1. Stop writers (or the whole process).
  2. Copy while config still points at the source:
       storage migrate --from ./uploads --to 'driver=db,namespace=uploads'
       storage migrate --from ./skills  --to 'driver=db,namespace=skills'
  3. Point server.file_upload_path / server.skills_path at the destination.
  4. Restart. Source files are left in place until you delete them.

--to/--from only name the storage driver (local path or driver=db|s3,...).
Database host, user, password, and encrypt-key come from the same sources
as the HTTP server: --config (config.yaml), --database.* flags, and
--global.encrypt-key / GLOBAL_ENCRYPT_KEY. A compact spec such as
driver=db,namespace=uploads does not contain connection credentials.

The command is idempotent: files that already exist at the destination with
the same size are skipped unless --overwrite is set. Re-run after an
interrupted copy to finish missing or size-mismatched files.

Database tables for the db driver are created if needed. The s3 driver must
already be registered in this binary.`,
		Example: `  # Local disk -> database (credentials from config.yaml)
  ez-console storage migrate --config ./config.yaml --global.encrypt-key="$ENCRYPT_KEY" \
    --from ./uploads --to 'driver=db,namespace=uploads'

  # Override DB password on the CLI (MySQL also needs cluster.enabled in the config file)
  ez-console storage migrate --config ./config.yaml --global.encrypt-key="$ENCRYPT_KEY" \
    --database.password='secret' --from ./uploads --to 'driver=db,namespace=uploads'

  # Current skills mount -> S3 (requires the s3 driver import)
  ez-console storage migrate --from-current skills --to 'driver=s3,bucket=ez,prefix=skills/,force_path_style=true'

  # Preview only
  ez-console storage migrate --from ./uploads --to 'driver=db,namespace=uploads' --dry-run`,
		Args: cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			if err := viper.BindPFlags(cmd.Flags()); err != nil {
				return err
			}
			bindTracingEnv()
			cfgPath := ""
			if cfgFile != nil {
				cfgPath = *cfgFile
			}
			if _, err := config.LoadConfig(serviceName, cfgPath); err != nil {
				return err
			}

			needsDB := storage.NeedsDatabase(fromSpec) || storage.NeedsDatabase(toSpec) ||
				mountNeedsDatabase(fromCurrent) || mountNeedsDatabase(toCurrent)
			cfg := config.GetConfig()
			if cfg.Database != nil {
				db.InitDB(cmd.Context(), cfg)
				defer db.CloseDB()
			} else if needsDB {
				return fmt.Errorf("database is not configured but the db storage driver was requested")
			}

			ctx, logger := log.NewContextLogger(cmd.Context())
			if needsDB {
				gormDB := db.Session(cmd.Context())
				if isSQLiteDriver() {
					if sqlDB, err := gormDB.DB(); err == nil {
						sqlDB.SetMaxOpenConns(1)
						sqlDB.SetMaxIdleConns(1)
					}
					if concurrency != 1 {
						level.Info(logger).Log("msg", "using concurrency=1 for sqlite db storage (concurrent writes cause SQLITE_BUSY)")
						concurrency = 1
					}
				}
				if err := gormDB.AutoMigrate(&dbfs.StorageFile{}, &dbfs.StorageChunk{}); err != nil {
					return fmt.Errorf("failed to prepare database for db storage: %w", err)
				}
			}

			src, srcLabel, err := resolveMigrateFs(fromSpec, fromCurrent, true)
			if err != nil {
				return err
			}
			dst, dstLabel, err := resolveMigrateFs(toSpec, toCurrent, false)
			if err != nil {
				return err
			}

			level.Info(logger).Log("msg", "Starting storage migrate", "from", srcLabel, "to", dstLabel, "dry_run", dryRun, "prefix", prefix, "concurrency", concurrency)

			result, err := storage.Migrate(ctx, src, dst, storage.MigrateOptions{
				Prefix:      prefix,
				DryRun:      dryRun,
				Overwrite:   overwrite,
				Concurrency: concurrency,
				OnFile: func(event storage.MigrateEvent) {
					if event.Action == storage.MigrateActionFailed {
						level.Error(logger).Log("msg", "storage migrate file failed", "path", event.Path, "err", event.Err)
						return
					}
					level.Debug(logger).Log("msg", "storage migrate file", "path", event.Path, "action", string(event.Action), "size", event.Size)
				},
			})
			if result != nil {
				printMigrateSummary(cmd.OutOrStdout(), result, dryRun)
				for _, e := range result.Errors {
					fmt.Fprintf(cmd.ErrOrStderr(), "error: %v\n", e)
				}
			}
			if err != nil {
				return err
			}
			level.Info(logger).Log("msg", "Storage migrate finished", "copied", result.Copied, "skipped", result.Skipped, "failed", result.Failed, "bytes", result.Bytes)
			return nil
		},
	}

	cmd.Flags().StringVar(&fromSpec, "from", "", "source storage spec (local path or compact driver=... map)")
	cmd.Flags().StringVar(&toSpec, "to", "", "destination storage spec (local path or compact driver=... map)")
	cmd.Flags().StringVar(&fromCurrent, "from-current", "", "use a configured mount as the source: uploads | skills")
	cmd.Flags().StringVar(&toCurrent, "to-current", "", "use a configured mount as the destination: uploads | skills")
	cmd.Flags().StringVar(&prefix, "prefix", "", "only copy files under this relative prefix")
	cmd.Flags().BoolVar(&dryRun, "dry-run", false, "list files that would be copied without writing")
	cmd.Flags().BoolVar(&overwrite, "overwrite", false, "replace destination files even when size matches")
	cmd.Flags().IntVar(&concurrency, "concurrency", 4, "number of parallel file copies")
	cmd.SilenceUsage = true
	return cmd
}

func resolveMigrateFs(spec, currentMount string, isSource bool) (afero.Fs, string, error) {
	side := "destination"
	if isSource {
		side = "source"
	}
	spec = strings.TrimSpace(spec)
	currentMount = strings.TrimSpace(currentMount)
	if spec != "" && currentMount != "" {
		return nil, "", fmt.Errorf("specify only one %s: --from/--to or --from-current/--to-current", side)
	}
	if spec == "" && currentMount == "" {
		return nil, "", fmt.Errorf("%s is required (--from/--to or --from-current/--to-current)", side)
	}
	if spec != "" {
		fs, err := storage.Open(spec)
		if err != nil {
			return nil, "", fmt.Errorf("failed to open %s storage: %w", side, err)
		}
		return fs, spec, nil
	}
	fs, label, err := currentMountFs(currentMount)
	if err != nil {
		return nil, "", fmt.Errorf("failed to resolve %s mount: %w", side, err)
	}
	return fs, label, nil
}

func currentMountFs(name string) (afero.Fs, string, error) {
	cfg := config.GetConfig()
	if cfg == nil {
		return nil, "", fmt.Errorf("configuration is not loaded")
	}
	switch strings.ToLower(name) {
	case "uploads", "upload", "file_upload_path":
		return cfg.Server.FileUploadPath, "server.file_upload_path", nil
	case "skills", "skills_path":
		return cfg.Server.SkillsPath, "server.skills_path", nil
	default:
		return nil, "", fmt.Errorf("unknown mount %q (want uploads or skills)", name)
	}
}

func isSQLiteDriver() bool {
	driver := strings.ToLower(strings.TrimSpace(viper.GetString("database.driver")))
	return driver == "" || driver == "sqlite"
}

func mountNeedsDatabase(name string) bool {
	name = strings.ToLower(strings.TrimSpace(name))
	var key string
	switch name {
	case "uploads", "upload", "file_upload_path":
		key = "server.file_upload_path"
	case "skills", "skills_path":
		key = "server.skills_path"
	default:
		return false
	}
	return storage.NeedsDatabase(viper.Get(key))
}

func printMigrateSummary(w io.Writer, result *storage.MigrateResult, dryRun bool) {
	verb := "Copied"
	if dryRun {
		verb = "Would copy"
	}
	fmt.Fprintf(w, "%s: %d file(s) (%s)\n", verb, result.Copied, formatByteCount(result.Bytes))
	fmt.Fprintf(w, "Skipped: %d file(s)\n", result.Skipped)
	fmt.Fprintf(w, "Failed:  %d file(s)\n", result.Failed)
}

func formatByteCount(n int64) string {
	if n < 1024 {
		return fmt.Sprintf("%d B", n)
	}
	units := []string{"KiB", "MiB", "GiB", "TiB"}
	val := float64(n)
	for _, u := range units {
		val /= 1024
		if val < 1024 {
			return fmt.Sprintf("%.1f %s", val, u)
		}
	}
	return fmt.Sprintf("%.1f PiB", val/1024)
}
