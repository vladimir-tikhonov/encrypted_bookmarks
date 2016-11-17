start:
	$(MAKE) clean-build
	$(MAKE) setup-dev-build
	$(MAKE) start-webpack

build-dev:
	$(MAKE) clean-build
	$(MAKE) setup-dev-build
	npm run build-dev

build-prod:
	$(MAKE) clean-build
	$(MAKE) setup-prod-build
	npm run build-prod
	rm -f build/dll/manifest.json build/.DS_Store
	cd build; zip -r -T release.zip ./*; cd ..

clean-build:
	rm -rf ./build/*

setup-dev-build:
	npm run build-dev-dll
	$(MAKE) build-assets

setup-prod-build:
	npm run build-prod-dll
	$(MAKE) build-assets

build-assets:
	cp src/html/* ./build/
	npm run generate-manifest

start-webpack:
	npm run start-webpack

setup:
	npm install

build-ci:
	npm run eslint
	$(MAKE) build-dev
	$(MAKE) build-prod
