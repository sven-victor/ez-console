
.DEFAULT_GOAL := build

GO ?= go
FIRST_GOPATH := $(firstword $(subst :, ,$(shell $(GO) env GOPATH)))

SWAG ?= $(FIRST_GOPATH)/bin/swag

VERSION ?= 1.0.0

$(SWAG):
	go install github.com/swaggo/swag/cmd/swag@v1.16.4

docs: $(SWAG)
	$(SWAG) init -g main.go -o docs -pd --requiredByDefault --overridesFile overrides.swaggo

web/src/service/api:docs
	cp docs/swagger.json web/swagger.json
	cd web && pnpm run openapi2ts

openapi2ts:web/src/service/api
	

clean-docs:
	rm -rf docs

clean-openapi2ts:
	rm -rf web/src/service/api


web/node_modules:
	cd web && pnpm install

server/static: web/node_modules
	cd web && pnpm build
	cp -r web/dist/ server/static

web/lib:
	cd web && pnpm build:lib


clean-web-lib:
	rm -rf web/lib
	rm -rf web/types

dist/server:
	go mod tidy
	go build -ldflags "-s -w -X github.com/sven-victor/ez-console/cmd.VERSION=$(VERSION)" -o dist/server main.go

clean:clean-web-lib
	rm -rf dist/server
	rm -rf server/static

.PHONY: build
build:server/static dist/server web/lib

	
