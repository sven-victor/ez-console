// Copyright 2026 Sven Victor
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
	"os"
	"strings"

	"github.com/go-kit/log/level"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/log/flag"
	"github.com/sven-victor/ez-utils/safe"
)

// NewEncryptCommand returns the standalone `encrypt` command group used by the
// framework binary (`ez-console encrypt rotate`). Downstream applications
// already get the same group as a subcommand of NewCommandServer.
func NewEncryptCommand(serviceName string) *cobra.Command {
	var cfgFile string
	return newEncryptCommand(serviceName, &cfgFile, true)
}

func newEncryptCommand(serviceName string, cfgFile *string, standalone bool) *cobra.Command {
	var (
		newKey string
		oldKey string
	)
	cmd := &cobra.Command{
		Use:   "encrypt",
		Short: "Encryption key utilities",
		Long: `Stop-the-world helpers for rotating global.encrypt-key.

Re-encrypt database {CRYPT} values (and, optionally, ciphertext scalars in the
config file) with a new key. Runtime remains a single encrypt-key; change the
key in env / flags / YAML only after this command succeeds.`,
	}
	if standalone {
		flag.AddFlags(cmd.PersistentFlags(), nil)
		cmd.PersistentFlags().StringVar(cfgFile, "config", "", "config file (default is ./config.yaml)")
		cmd.PersistentFlags().String("global.encrypt-key", "", "global encrypt key (The encryption key length must be 0, 8, 16, 24, or 32)")
	}
	cmd.PersistentFlags().AddFlagSet(newDatabaseFlagSet(serviceName))
	cmd.PersistentFlags().StringVar(&newKey, "new-key", "", "new encrypt key (8, 16, 24, or 32 bytes)")
	cmd.PersistentFlags().StringVar(&oldKey, "old-key", "", "old encrypt key (defaults to global.encrypt-key / GLOBAL_ENCRYPT_KEY)")
	cmd.AddCommand(newEncryptRotateCommand(serviceName, cfgFile, &newKey, &oldKey))
	cmd.AddCommand(newEncryptReencryptCommand(serviceName, cfgFile, &newKey, &oldKey))
	return cmd
}

func newEncryptRotateCommand(serviceName string, cfgFile *string, newKey, oldKey *string) *cobra.Command {
	var (
		dryRun          bool
		rewriteConfig   bool
		writeEncryptKey bool
	)
	cmd := &cobra.Command{
		Use:   "rotate",
		Short: "Re-encrypt database (and config file) ciphertext with a new key",
		Long: `Stop all application nodes before running this command.

The current global.encrypt-key is used as the old key (override with --old-key).
Do not change encrypt-key in config or env until this command finishes.

Typical cut-over:

  1. Stop every node.
  2. Backup the database (and config.yaml if it contains {CRYPT} values).
  3. ez-console encrypt rotate --config ./config.yaml --new-key "$NEW_KEY"
  4. Point GLOBAL_ENCRYPT_KEY / --global.encrypt-key (and any {CRYPT} CLI/env
     values, via encrypt reencrypt) at the new key.
  5. Start the nodes.

--rewrite-config (default when a config file was loaded) re-encrypts YAML
scalars that start with {CRYPT}. --write-encrypt-key also replaces
global.encrypt-key in that file. If the key lives only in the environment,
leave --write-encrypt-key unset and update the env/Secret yourself.`,
		Example: `  ez-console encrypt rotate --config ./config.yaml --new-key "$NEW_KEY"
  ez-console encrypt rotate --config ./config.yaml --new-key "$NEW_KEY" --dry-run
  myapp encrypt rotate --new-key "$NEW_KEY" --write-encrypt-key`,
		Args: cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			if err := bindEncryptCommandFlags(cmd); err != nil {
				return err
			}
			bindTracingEnv()
			resolvedOld, resolvedNew, err := loadRotateKeys(serviceName, cfgFile, *oldKey, *newKey, true)
			if err != nil {
				return err
			}

			cfg := config.GetConfig()
			if cfg.Database == nil {
				return fmt.Errorf("database is not configured")
			}
			if err := db.InitDB(cmd.Context(), cfg); err != nil {
				return err
			}
			defer db.CloseDB()

			ctx, logger := log.NewContextLogger(cmd.Context())
			level.Info(logger).Log("msg", "Starting encrypt rotate", "dry_run", dryRun)

			result, err := db.RotateEncryption(ctx, db.Session(ctx), resolvedOld, resolvedNew, dryRun)
			if err != nil {
				return err
			}
			printRotateSummary(cmd.OutOrStdout(), result, dryRun)

			cfgPath := viper.ConfigFileUsed()
			doRewrite := rewriteConfig
			if !cmd.Flags().Changed("rewrite-config") {
				doRewrite = cfgPath != ""
			}
			if writeEncryptKey {
				doRewrite = true
			}
			if doRewrite && cfgPath != "" {
				yamlResult, err := rewriteConfigFile(cfgPath, resolvedOld, resolvedNew, writeEncryptKey, dryRun)
				if err != nil {
					return err
				}
				fmt.Fprintf(cmd.OutOrStdout(), "config file: %s  ciphertexts=%d  encrypt_key_writes=%d  dry_run=%v\n",
					cfgPath, yamlResult.Ciphertexts, yamlResult.EncryptKeyWrites, dryRun)
			} else if cfgPath != "" && !doRewrite {
				fmt.Fprintf(cmd.OutOrStdout(), "config file %s not rewritten (--rewrite-config=false); update any {CRYPT} values before starting with the new key\n", cfgPath)
			}

			if !dryRun {
				fmt.Fprintf(cmd.OutOrStdout(), "Set global.encrypt-key / %s to the new key before starting the server.\n", safe.SecretEnvName)
			}
			level.Info(logger).Log("msg", "Encrypt rotate finished", "dry_run", dryRun)
			return nil
		},
	}
	cmd.Flags().BoolVar(&dryRun, "dry-run", false, "count rows that would be rewritten without writing")
	cmd.Flags().BoolVar(&rewriteConfig, "rewrite-config", true, "re-encrypt {CRYPT} scalars in the loaded config file")
	cmd.Flags().BoolVar(&writeEncryptKey, "write-encrypt-key", false, "also replace global.encrypt-key in the config file with --new-key")
	return cmd
}

func newEncryptReencryptCommand(serviceName string, cfgFile *string, newKey, oldKey *string) *cobra.Command {
	var value string
	cmd := &cobra.Command{
		Use:   "reencrypt",
		Short: "Re-encrypt a single {CRYPT} value with a new key",
		Long: `Print a ciphertext encrypted with --new-key. Use this to update CLI flags,
environment variables, or Kubernetes Secrets that hold {CRYPT} values.

Reads --value, or stdin when --value is omitted.`,
		Example: `  ez-console encrypt reencrypt --old-key "$OLD" --new-key "$NEW" --value '{CRYPT}$2$...'
  echo '{CRYPT}$2$...' | ez-console encrypt reencrypt --old-key "$OLD" --new-key "$NEW"`,
		Args: cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			if err := bindEncryptCommandFlags(cmd); err != nil {
				return err
			}
			bindTracingEnv()
			ct := strings.TrimSpace(value)
			if ct == "" {
				in, err := io.ReadAll(cmd.InOrStdin())
				if err != nil {
					return err
				}
				ct = strings.TrimSpace(string(in))
			}
			if ct == "" {
				return fmt.Errorf("no ciphertext provided; pass --value or stdin")
			}
			if !util.IsEncrypted(ct) {
				return fmt.Errorf("value is not a {CRYPT} ciphertext")
			}
			resolvedOld, resolvedNew, err := loadRotateKeys(serviceName, cfgFile, *oldKey, *newKey, *oldKey == "")
			if err != nil {
				return err
			}
			out, err := util.ReencryptCiphertext(ct, resolvedOld, resolvedNew)
			if err != nil {
				return err
			}
			fmt.Fprintln(cmd.OutOrStdout(), out)
			return nil
		},
	}
	cmd.Flags().StringVar(&value, "value", "", "ciphertext to re-encrypt (default: stdin)")
	return cmd
}

func bindEncryptCommandFlags(cmd *cobra.Command) error {
	if err := viper.BindPFlags(cmd.Flags()); err != nil {
		return err
	}
	for p := cmd.Parent(); p != nil; p = p.Parent() {
		if err := viper.BindPFlags(p.PersistentFlags()); err != nil {
			return err
		}
	}
	return nil
}

func loadRotateKeys(serviceName string, cfgFile *string, oldKey, newKey string, loadCfg bool) (string, string, error) {
	if newKey == "" {
		return "", "", fmt.Errorf("--new-key is required")
	}
	if !util.ValidEncryptKeyLength(newKey) {
		return "", "", fmt.Errorf("invalid new encrypt key length: %d, must be 8,16,24 or 32", len(newKey))
	}
	if loadCfg {
		cfgPath := ""
		if cfgFile != nil {
			cfgPath = *cfgFile
		}
		if oldKey != "" {
			os.Setenv(safe.SecretEnvName, oldKey)
		}
		if _, err := config.LoadConfig(serviceName, cfgPath); err != nil {
			return "", "", err
		}
		if oldKey == "" {
			oldKey = os.Getenv(safe.SecretEnvName)
		}
	} else if oldKey == "" {
		oldKey = os.Getenv(safe.SecretEnvName)
	}
	if oldKey == "" {
		return "", "", fmt.Errorf("old encrypt key is not set; pass --old-key or --global.encrypt-key / %s", safe.SecretEnvName)
	}
	if !util.ValidEncryptKeyLength(oldKey) {
		return "", "", fmt.Errorf("invalid old encrypt key length: %d, must be 8,16,24 or 32", len(oldKey))
	}
	if oldKey == newKey {
		return "", "", fmt.Errorf("new encrypt key must differ from the old key")
	}
	return oldKey, newKey, nil
}

func rewriteConfigFile(path, oldKey, newKey string, writeEncryptKey, dryRun bool) (*util.YAMLReencryptResult, error) {
	raw, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("failed to read config file %s: %w", path, err)
	}
	result, err := util.ReencryptYAMLDocument(raw, oldKey, newKey, writeEncryptKey, newKey)
	if err != nil {
		return nil, err
	}
	if dryRun {
		return result, nil
	}
	if result.Ciphertexts == 0 && result.EncryptKeyWrites == 0 {
		return result, nil
	}
	if err := os.WriteFile(path, result.Output, 0600); err != nil {
		return nil, fmt.Errorf("failed to write config file %s: %w", path, err)
	}
	return result, nil
}

func printRotateSummary(w io.Writer, result *db.EncryptRotateResult, dryRun bool) {
	if result == nil || len(result.Tables) == 0 {
		fmt.Fprintf(w, "no encrypted rows found (dry_run=%v)\n", dryRun)
		return
	}
	fmt.Fprintf(w, "%-32s %8s %10s %8s\n", "table", "scanned", "rewritten", "skipped")
	for _, t := range result.Tables {
		fmt.Fprintf(w, "%-32s %8d %10d %8d\n", t.Table, t.Scanned, t.Rewritten, t.Skipped)
	}
}
