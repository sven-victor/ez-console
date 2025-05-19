
.DEFAULT_GOAL := build

GO ?= go
FIRST_GOPATH := $(firstword $(subst :, ,$(shell $(GO) env GOPATH)))

SWAG ?= $(FIRST_GOPATH)/bin/swag


$(SWAG):
	go install github.com/swaggo/swag/cmd/swag@v1.16.4

docs: $(SWAG)
	$(SWAG) init -g main.go -o docs -pd

web/node_modules:
	cd web && pnpm install

server/static: web/node_modules
	cd web && pnpm build
	cp -r web/dist/ server/static

dist/server:
	go mod tidy
	go build -o dist/server main.go

clean:
	rm -rf dist/server
	rm -rf server/static

.PHONY: build
build:server/static dist/server

	