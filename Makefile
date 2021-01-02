
.PHONY: setup theme blog all test clean

all: setup theme blog

setup:
	@yarn install
	@yarn --cwd themes/coda install

theme:
	@yarn build:theme

blog:
	@yarn build

dist: setup
	@yarn build:dist

clean:
	@yarn clean
	@rm -rf public/*

update:
	@yarn --cwd themes/coda
	@yarn

test:
	@yarn test

certs:
	@mkcert -install -cert-file test/ssl/cert.pem -key-file test/ssl/key.pem micrantha.test labratory localhost 127.0.0.1 ::1

retest: theme blog test

image:
	@create-registry-image -r registry.gitlab.com ryjen/blog
