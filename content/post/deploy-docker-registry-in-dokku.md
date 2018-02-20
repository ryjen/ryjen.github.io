+++
title = "Deploy Docker Registry with Dokku"
date = "2018-02-19"
tags = [ "docker", "registry", "dokku" ]
categories = ["development", "containerization"]
+++

#### Prerequisites

You'll need to prepare a bit.

-----

1. A local path on the server to store registry data. For example: `/mydir/registry`
2. [Docker](https://www.docker.com/community-edition#/download) installed on the client and server machine
3. [Dokku](http://dokku.viewdocs.io/dokku/) installed on the server

##### For Authentication

1. httpasswd command is installed

##### For an External Registry

1. Dokku [letsencrypt plugin](https://github.com/dokku/dokku-letsencrypt) installed
2. A working domain name pointing to the dokku app. For example, *https://registry.mydomain.com*

### Create the dokku app

Create the dokku app and retag a pre-existing repository image to it.
To persist data, a volume is used.

-----

1. Create a new app named "registry" in dokku: `dokku apps:create registry`

2. Go ahead an pull the docker registry image (using alpine for reduced size): `docker pull ses1er/alpine-registry`

3. Now retag the image so dokku knows about it: `docker tag ses1er/alpine-registry dokku/registry`

4. Deploy the image to dokku: `dokku tags:deploy registry`

##### Configure the app

1. Configure the local storage directory for the registry: `dokku config:set --no-restart registry REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY="/container/dir/registry"`

2. Now add an application mount point for the local storage directory: `dokku storage:mount registry /mydir/registry:/container/dir/registry`  *(note: the default container location is /var/lib/registry)*

3. Now remove the default http port mapping: `dokku proxy:ports-remove registry 80`

4. And and a new one pointing to the repository: `dokku proxy:ports-add registry 80:5000 5000:5000`

### Authorization

Require a valid login to create a repository.

-----

1. Create a directory for authorization data in the local application volume: `mkdir -p /mydir/registry/auth`

2. Create a username/password file: `htpasswd -Bn username > /mydir/registry/auth/htpasswd` *(will prompt for password)*

3. Add configuration variables to dokku registry app: `dokku config:set --no-restart registry REGISTRY_AUTH=htpasswd REGISTRY_AUTH_HTPASSWD_REALM="My Registry" REGISTRY_AUTH_HTPASSWD_PATH=/container/dir/registry/auth/htpasswd`


### External Registry
To allow your registry to be remotely accessible.

-----

1. Add your domain to the registry dokku app: `dokku domains:add registry https://registry.mydomain.com` 

2. Add letsencrypt to the app: `dokku letsencrypt registry` and ensure a valid certificate is always available: `dokku letsencrypt:auto-renew registry`

3. Remove the default HTTPS port mapping: `dokku proxy:ports-remove 443`

4. And add a new port mapping to the repository: `dokku proxy:ports-add 443:5000`

### Testing
Does it work?

-----

1. Restart the server: `dokku ps:restart registry`

2. You can test it by logging in from a remote machine (or local if not external facing): `docker login --username <username> https://registry.mydomain.com`

3. Retag an image: `docker tag myimage registry.mydomain.com/username/myimage` and push it: `docker push registry.mydomain.com/username/myimage`

#### Gotchas

There is always at least one.

-----

NGINX by default will throw an HTTP 413 error if your image is too big.  To fix that we have to disable the max HTTP body size.

1. Edit the configuration for the repository app: `vim /home/dokku/registry/nginx.conf`

2. In any server{} blocks add: `client_max_body_size 0;` which will disable the max body size limitation.


#### Conclusion

Super easy to get a private docker repository running on dokku.   Why would you want to?  

1. Because you can
2. Private registries are generally not free
3. Sometimes doesn't make sense for an image to be public
4. Control over your data from another country's jurisdiction

For example, I have a docker image to run weechat with very customized configuration and only usable by me.  I only want to run it on my server and attach to it when I need to.


