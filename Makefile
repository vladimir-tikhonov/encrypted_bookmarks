start:
	$(MAKE) clean-build
	$(MAKE) setup-dev-build
	$(MAKE) start-webpack

build-dev:
	$(MAKE) clean-build
	$(MAKE) setup-dev-build
	npm run build-dev

clean-build:
	rm -rf ./build/*

setup-dev-build:
	npm run build-dev-dll
	cp src/html/* ./build/
	npm run generate-manifest

start-webpack:
	npm run start-webpack

setup:
	npm install

build-ci:
	npm run eslint
	$(MAKE) build-dev
