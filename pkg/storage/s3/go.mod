// The s3 storage driver lives in its own Go module so that the AWS SDK
// dependency tree is only pulled in by applications that import it.
//
// Local development resolves the parent module through the replace directive
// below (and the go.work file at the repository root). When releasing, tag
// both modules (vX.Y.Z and pkg/storage/s3/vX.Y.Z) and update the require
// version accordingly.
module github.com/sven-victor/ez-console/pkg/storage/s3

go 1.25.0

require (
	github.com/aws/aws-sdk-go-v2 v1.42.1
	github.com/aws/aws-sdk-go-v2/config v1.32.27
	github.com/aws/aws-sdk-go-v2/credentials v1.19.26
	github.com/aws/aws-sdk-go-v2/service/s3 v1.104.2
	github.com/fclairamb/afero-s3 v0.5.0
	github.com/mitchellh/mapstructure v1.5.0
	github.com/spf13/afero v1.15.0
	github.com/sven-victor/ez-console v0.0.0-00010101000000-000000000000
	github.com/sven-victor/ez-utils v1.1.1
)

require (
	github.com/aws/aws-sdk-go-v2/aws/protocol/eventstream v1.7.14 // indirect
	github.com/aws/aws-sdk-go-v2/feature/ec2/imds v1.18.30 // indirect
	github.com/aws/aws-sdk-go-v2/feature/s3/manager v1.22.30 // indirect
	github.com/aws/aws-sdk-go-v2/internal/configsources v1.4.30 // indirect
	github.com/aws/aws-sdk-go-v2/internal/endpoints/v2 v2.7.30 // indirect
	github.com/aws/aws-sdk-go-v2/internal/v4a v1.4.31 // indirect
	github.com/aws/aws-sdk-go-v2/service/internal/accept-encoding v1.13.13 // indirect
	github.com/aws/aws-sdk-go-v2/service/internal/checksum v1.9.23 // indirect
	github.com/aws/aws-sdk-go-v2/service/internal/presigned-url v1.13.30 // indirect
	github.com/aws/aws-sdk-go-v2/service/internal/s3shared v1.19.31 // indirect
	github.com/aws/aws-sdk-go-v2/service/signin v1.2.2 // indirect
	github.com/aws/aws-sdk-go-v2/service/sso v1.31.5 // indirect
	github.com/aws/aws-sdk-go-v2/service/ssooidc v1.36.8 // indirect
	github.com/aws/aws-sdk-go-v2/service/sts v1.43.5 // indirect
	github.com/aws/smithy-go v1.27.3 // indirect
	github.com/gogo/protobuf v1.3.2 // indirect
	golang.org/x/crypto v0.54.0 // indirect
	golang.org/x/text v0.40.0 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

replace github.com/sven-victor/ez-console => ../../..
