---
title: Hugo + Dokku + Wercker = Goodness
slug: hugo-dokku-wercker-goodness
date: 2016-06-22
tags:
    - hugo
    - wercker
    - dokku
    - automation
description: "generating and automating deployment of a site"
banner: /images/blog/hugo.png
---

## [Hugo](http://gohugo.io)

Hugo is a static site generator with many powerful features like archtypes, themes, customization, etc.

Combined with tools like [bower](http://bower.io) and [brunch](http://brunch.io) it makes for a pretty powerful app that could be more than a blog.

The workflow is simple - build your assets with brunch, run the hugo generator.
The end result is a complete static html site you can deploy.

### [Dokku](http://dokku.viewdocs.io/dokku/)

Dokku has been great for running multiple small apps on a single [digitalocean](http://digitialocean.com) droplet. The best part is its heroku buildpack compatible, so anything you can run on heroku you can deploy to dokku and more.

## [Wercker](http://wercker.com)

A continuous integration solution that is quite powerful and free.  I'm slowly migrating all my [travisci](http://travis-ci.org) configurations.

With a single wercker.yml config file, each git commit one can combine the static site generation and the deploy to dokku.  Beautiful!

### Requirements

- add the dokku git repo as a submodule called "public" which will contain the generated site
- create some dokku git environment variables in wercker config
- create an ssh key in the wercker config for the project
- add the generated ssh key to the dokku acl list

The wercker.yml file:

```YAML
box: digitallyseamless/nodejs-bower-grunt
build:
  steps:
    - wercker/npm-install@1.1.4
    - plasticine/bower-install@0.0.4
    - add-to-known-hosts:
        hostname: $GIT_DEPLOY_HOST
    - add-ssh-key:
        keyname: dokku
    - script:
        name: Initialize git submodules
        code: |
            git submodule update --init --recursive
    - script:
        name: Build assets
        code: ./node_modules/.bin/brunch build
    - arjen/hugo-build:
        version: "0.15"
deploy:
  steps:
    - add-to-known-hosts:
        hostname: $GIT_DEPLOY_HOST
    - add-ssh-key:
        keyname: dokku
    - script:
        name: push to dokku
        code: |
          cd ./public
          git config user.email "$GIT_USER_EMAIL"
          git config user.name "$WERCKER_STARTED_BY"
          git config push.default simple
          git add -A .
          git commit -m "deploy from wercker"
          git push origin HEAD:master
```

#### Result?

Can simply create a post and commit it.  Once pushed, it will be deployed live.

#### Improvements?

- Create a test suite to run in wercker as well.
- Devise a way to create a blog post on mobile
