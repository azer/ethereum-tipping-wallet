MAKEFLAGS += --silent
PROJECTNAME=$(shell basename "$(PWD)")

## help: Show help and exit
.PHONY: help
all: help
help: Makefile
	@echo
	@echo "  Choose a command:"
	@echo
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'
	@echo

## chrome/build: Build Chrome extension files
chrome/build:
	@cp chrome-extension-manifest.json dist/manifest.json

## background/compile: Compile TypeScript into JavaScript
background/compile:
	@notify-send "Compiling" "Compiling background source code" -u normal -t 1000
	@cd background; ./node_modules/.bin/browserify src/main.ts  -p [ tsify --noImplicitAny ] > ../dist/background.js
	@notify-send "Ready" "Background is compiled and ready" -u normal -t 1000

## background/compile: Compile TypeScript into JavaScript
background/watch: background/compile
	@yolo -i background/src -c "make background/compile"

## content/compile: Compile TypeScript into JavaScript
content/compile:
	@notify-send "Compiling" "Compiling content source code" -u normal -t 1000
	@cd content; ./node_modules/.bin/browserify src/main.ts  -p [ tsify --noImplicitAny ] > ../dist/content.js
	@notify-send "Ready" "Content is compiled and ready" -u normal -t 1000

## content/compile: Compile TypeScript into JavaScript
content/watch: content/compile
	@yolo -i content/src -c "make content/compile"

## popup/compile: Compile TypeScript into JavaScript
.PHONY: popup/compile
popup/compile:
	@notify-send "Compiling" "Compiling popup source code" -u normal -t 1000
	@rm -rf ./dist/popup
	@cd popup; npx react-scripts-ts build
	@mv popup/build dist/popup
	@notify-send "Ready" "Popup is compiled and ready" -u normal -t 1000

## popup/watch: Run `make compile` at every change. (github.com/azer/yolo required)
popup/watch: popup/compile
	@yolo -i popup/src -c "make popup/compile"
