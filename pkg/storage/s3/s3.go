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

// Package s3 implements an S3-compatible object storage driver ("driver: s3")
// for the ez-console storage registry. It works with AWS S3, MinIO
// (force_path_style: true), and Alibaba Cloud OSS S3-compatible endpoints.
//
// This package lives in its own Go module so that the AWS SDK dependency tree
// is only pulled in by applications that actually need S3 support. Enable it
// with a blank import in your main package:
//
//	import _ "github.com/sven-victor/ez-console/pkg/storage/s3"
//
// Example configuration (config.yaml):
//
//	server:
//	  file_upload_path:
//	    driver: s3
//	    endpoint: http://minio.internal:9000   # empty = AWS S3
//	    region: us-east-1
//	    bucket: ez-console
//	    prefix: uploads/                       # optional key prefix
//	    access_key_id: minioadmin              # empty = default AWS credential chain
//	    secret_access_key: minioadmin          # supports encrypted values (safe.String)
//	    force_path_style: true                 # required for MinIO
//	    presign_enabled: true                  # default true
//	    presign_expiry: 10m
//
// The driver implements storage.PresignerStorage (downloads are redirected to
// presigned URLs unless presign_enabled is false) and storage.RemoteStorage
// (skill files are materialized to a local cache).
package s3

import (
	"context"
	"fmt"
	"path"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	awsconfig "github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	awss3 "github.com/aws/aws-sdk-go-v2/service/s3"
	s3fs "github.com/fclairamb/afero-s3"
	"github.com/mitchellh/mapstructure"
	"github.com/spf13/afero"
	"github.com/sven-victor/ez-console/pkg/storage"
	"github.com/sven-victor/ez-utils/safe"
)

func init() {
	storage.Register("s3", New)
}

// Config is the YAML configuration of the s3 storage driver.
type Config struct {
	// Endpoint is a custom S3-compatible endpoint (MinIO, OSS, ...).
	// Leave empty for AWS S3.
	Endpoint string `mapstructure:"endpoint"`
	Region   string `mapstructure:"region"`
	Bucket   string `mapstructure:"bucket"`
	// Prefix is an optional object key prefix (e.g. "uploads/") so multiple
	// mount points can share one bucket.
	Prefix string `mapstructure:"prefix"`
	// AccessKeyID / SecretAccessKey are static credentials. When AccessKeyID
	// is empty the default AWS credential chain is used (env vars, shared
	// config, IAM roles). SecretAccessKey supports encrypted values.
	AccessKeyID     string      `mapstructure:"access_key_id"`
	SecretAccessKey safe.String `mapstructure:"secret_access_key"`
	// ForcePathStyle enables path-style addressing (required for MinIO;
	// must stay false for OSS which requires virtual-host style).
	ForcePathStyle bool `mapstructure:"force_path_style"`
	// PresignEnabled toggles presigned download URLs (default true). Disable
	// it when the endpoint is not reachable from user browsers.
	PresignEnabled *bool `mapstructure:"presign_enabled"`
	// PresignExpiry overrides the presigned URL lifetime (default: the
	// caller-requested expiry, currently 10m for file downloads).
	PresignExpiry time.Duration `mapstructure:"presign_expiry"`
}

// New creates an s3 storage driver instance from its raw config map.
func New(cfg map[string]any) (afero.Fs, error) {
	var c Config
	decoder, err := mapstructure.NewDecoder(&mapstructure.DecoderConfig{
		Result: &c,
		DecodeHook: mapstructure.ComposeDecodeHookFunc(
			mapstructure.StringToTimeDurationHookFunc(),
			safe.SafeStringHookFunc(),
		),
	})
	if err != nil {
		return nil, err
	}
	if err := decoder.Decode(cfg); err != nil {
		return nil, fmt.Errorf("invalid s3 storage config: %w", err)
	}
	if c.Bucket == "" {
		return nil, fmt.Errorf("s3 storage driver requires a non-empty \"bucket\"")
	}
	region := c.Region
	if region == "" {
		// MinIO and most S3-compatible endpoints accept any region,
		// but the SDK requires one to be set.
		region = "us-east-1"
	}

	var awsCfg aws.Config
	if c.AccessKeyID != "" {
		secret, err := c.SecretAccessKey.UnsafeString()
		if err != nil {
			return nil, fmt.Errorf("failed to decrypt s3 secret_access_key: %w", err)
		}
		awsCfg = aws.Config{
			Region:      region,
			Credentials: credentials.NewStaticCredentialsProvider(c.AccessKeyID, secret, ""),
		}
	} else {
		// Default credential chain: env vars, shared config, IAM roles.
		// Credentials are resolved lazily on first request.
		awsCfg, err = awsconfig.LoadDefaultConfig(context.Background(), awsconfig.WithRegion(region))
		if err != nil {
			return nil, fmt.Errorf("failed to load default AWS config: %w", err)
		}
	}

	client := awss3.NewFromConfig(awsCfg, func(o *awss3.Options) {
		if c.Endpoint != "" {
			o.BaseEndpoint = aws.String(c.Endpoint)
		}
		o.UsePathStyle = c.ForcePathStyle
	})

	var inner afero.Fs = s3fs.NewFsFromClient(c.Bucket, client)
	prefix := strings.Trim(strings.TrimSpace(c.Prefix), "/")
	if prefix != "" {
		// The prefix is applied inside the driver (BasePathFs is an internal
		// detail here); capability assertions happen on *Fs itself.
		inner = afero.NewBasePathFs(inner, "/"+prefix)
	}

	presignEnabled := true
	if c.PresignEnabled != nil {
		presignEnabled = *c.PresignEnabled
	}
	return &Fs{
		Fs:             inner,
		presignClient:  awss3.NewPresignClient(client),
		bucket:         c.Bucket,
		prefix:         prefix,
		presignEnabled: presignEnabled,
		presignExpiry:  c.PresignExpiry,
	}, nil
}

// Fs is the S3-backed afero.Fs with presign support.
type Fs struct {
	afero.Fs // object operations (afero-s3, wrapped with the key prefix)

	presignClient  *awss3.PresignClient
	bucket         string
	prefix         string
	presignEnabled bool
	presignExpiry  time.Duration
}

var (
	_ afero.Fs                 = (*Fs)(nil)
	_ storage.PresignerStorage = (*Fs)(nil)
	_ storage.RemoteStorage    = (*Fs)(nil)
)

// IsRemote reports that S3 storage is not local to the node.
func (f *Fs) IsRemote() bool { return true }

// PresignGetURL returns a presigned GET URL for the object at key, letting
// clients download directly from the object storage. Returns
// storage.ErrPresignNotSupported when presigning is disabled by config.
func (f *Fs) PresignGetURL(ctx context.Context, key string, expiry time.Duration, contentDisposition string) (string, error) {
	if !f.presignEnabled {
		return "", storage.ErrPresignNotSupported
	}
	if f.presignExpiry > 0 {
		expiry = f.presignExpiry
	}
	fullKey := strings.TrimPrefix(path.Clean("/"+key), "/")
	if f.prefix != "" {
		fullKey = f.prefix + "/" + fullKey
	}
	input := &awss3.GetObjectInput{
		Bucket: aws.String(f.bucket),
		Key:    aws.String(fullKey),
	}
	if contentDisposition != "" {
		input.ResponseContentDisposition = aws.String(contentDisposition)
	}
	req, err := f.presignClient.PresignGetObject(ctx, input, awss3.WithPresignExpires(expiry))
	if err != nil {
		return "", fmt.Errorf("failed to presign S3 GetObject request: %w", err)
	}
	return req.URL, nil
}
