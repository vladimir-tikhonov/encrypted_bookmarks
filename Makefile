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
	rm -f build/vendors-manifest.json build/.DS_Store
	cd build; zip -r -T release.zip ./*; cd ..
	du -h build/release.zip

clean-build:
	rm -rf ./build/*

setup-dev-build:
	npm run build-dev-dll
	$(MAKE) build-assets
	$(MAKE) copy-vendor-libs

setup-prod-build:
	npm run build-prod-dll
	$(MAKE) build-assets
	$(MAKE) copy-vendor-libs

build-assets:
	cp src/html/* ./build/
	npm run generate-manifest

copy-vendor-libs:
	cp src/scripts/vendors/* build/

start-webpack:
	npm run start-webpack

setup:
	npm install

build-ci:
	npm run eslint
	npm run sass-lint
	$(MAKE) build-dev
	$(MAKE) build-prod
