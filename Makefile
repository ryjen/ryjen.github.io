
.PHONY: setup theme blog all test

all: setup theme blog

setup:
	@yarn install
	@yarn --cwd themes/coda install

theme:
	@yarn build:theme

blog:
	@yarn build

dist: setup theme
	@yarn build:dist

update:
	@yarn --cwd themes/coda
	@yarn

test:
	@yarn test

retest: theme blog test

image:
	@create-registry-image -r registry.micrantha.com ryjen/blog
