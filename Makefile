
.PHONY: theme blog all

all: theme blog

theme:
	@gulp --cwd themes/coda

blog:
	@gulp
	@hugo
