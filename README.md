# My Blog

# Prep


## Install Packages

Yarn install the theme: `yarn --cwd themes/coda`

Yarn install the site: `yarn`

Yarn install the editor: `yarn --cwd editor`

## Add remotes

For github pages: `git remote add github git@github.com:ryjen/blog`

For dokku: `git remote add dokku dokku@micrantha.com:blog`

For editor: `git remote add editor dokku@micrantha.com:editor`

# Building

Gulp the theme: `gulp --cwd themes/coda`

Gulp the site: `gulp`

Gulp the editor: `gulp --cwd editor`

# Deploying

Use a git subtree to deploy this server.

See [https://github.com/ryjen/dotfiles/blob/master/git/bin/git-sub-deploy](https://github.com/ryjen/dotfiles/blob/master/git/bin/git-sub-deploy)

To deploy the static website to github: `git sub-deploy --remote=github server/public`

To deploy an http server to dokku: `git sub-deploy --remote=dokku server`

To deploy the editor to dokku: `git sub-deploy --remote=editor editor`

