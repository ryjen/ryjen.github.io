
.PHONY: theme blog all

all: theme blog

theme:
	@yarn build:theme

blog:
	@yarn build

update:
	@yarn --cwd themes/coda
	@yarn

