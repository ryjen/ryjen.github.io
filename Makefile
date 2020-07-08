
.PHONY: setup theme blog all

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

