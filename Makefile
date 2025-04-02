
.DEFAULT_GOAL := build

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

	