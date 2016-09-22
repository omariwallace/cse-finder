BIN = ./node_modules/.bin

.PHONY: build

build:
	$(BIN)/webpack --progress --colors