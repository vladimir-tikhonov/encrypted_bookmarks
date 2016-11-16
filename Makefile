.PHONY : clean-build build-dll start-devserver

start: clean-build build-dll start-devserver

build-dll:
	npm run build-dll

start-devserver:
	npm run start

clean-build:
	rm -r ./build
	mkdir build

setup:
	npm install

build-ci:
	npm run eslint
