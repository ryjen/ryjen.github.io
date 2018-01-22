---
title: "Experience Creating a Golang Slack App"
date: 2018-01-22
tags: [golang, slack, api, microservice, docker, dokku, http, rest, go, fortunes, micrantha, ryan jennings, amazon, aws, ecs, postgres, git, css]
draft: true
---


# Concept

UNIX has this command called 'fortunes', which displays witty jokes, quotes, poems and proverbs.  Porting it to different platforms has become a 'hello world' for me because I don't need to worry about where my data comes from - its already there.

This time a slack app was on the radar from other concepts, and besides, who would not want some project stress relief with a humorous fortune cookie?

# First things first

Going to need a database, content is still king.  I've done some of the heaving lifting of converting the fortune commands data files to SQLite for another project.

A few changes to the schema were needed, to support expanded features in the future.  For one, the assumption that fortunes have one category is fine for a file system data set, but a link table to allow multiple categories is even better.  Second, this is going to be a micro-service API, so using PostgreSQL is my choice of database.  


### Converting databases

After trying various ways I found the easiest way was to create the schema in Postgres and import from CSV.  To create the Postgres schema you can use a modified Sqlite schema dump or manually.

1. set the output file: `sqlite> .output fortunes_schema.sql`
2. dump the schema: `sqlite> .dump`

Repeated for other schema's.  To export Sqlite tables into CSV its a few steps:

1. set the output format: `sqlite> .mode csv`
2. set the output file: `sqlite> .output fortunes_table.csv`
3. select all the data: `sqlite> select * from fortunes;`

And repeat for the other tables.  Importing a CSV to Postgres is relatively simple:

1. copy from the file: `\copy fortunes from './fortunes_table.csv' csv;`


# Serving it

---

OK, so the trustworthy Postgres database is setup.   Now, to serve it to the masses.

## The server 

Golang is such a beautiful, simple and fast language with good standard packages it was an obvious choice for me (its almost like what C should have been).

The server components can be broken down into 4 parts:

### 1) the router 
	
Using [routing middle-ware](https://github.com/gorilla/mux) for golang's standard HTTP package means this is dead simple.  As the API's we're already designed, I just had to create routers to match them.  The endpoints end up being vanilla go functions with a response and a request.

### 2) the model

Simple golang structs with schema/json attributes that get parsed by the Postgres driver and [gomodel](https://github.com/clarkf/gomodel).  The model closely followed the API design.

### 3) the web api

The web API was designed using an OpenAPI definition generated at SwaggerHub. Golang's encoding/json package is all thats needed to output the model in the endpoint functions. Errors respond with a default HTTP error code and message.

Query arguments are used to support all the options to the fortune command.  A little bit of extra processing is done to transform the query arguments into getopt style arguments which are used to define options for the queries.

### 3) the slack api

The slack API closely follows the web API, however extra parsing is done to transform the HTTP request into a slack request.  Extra security validation is also done on each request.  The responses will use a custom HTTP client to post json to a supplied URL in the request.   Error messages will attempt to respond to the same supplied URL, but defaults to an HTTP error code and message.

Arguments from the slack request come in the form on a string of text.  A little bit of extra processing is done to transform the arguments into getopt style arguments.

The help command, uses the getopt argument definitions to render the help message.

### 4) the web views

No template system was used other than golang's HTML/template package.   A map of templates is lazy initialized on endpoint requests.  Each template contains a layout with a content block that get overridden in the endpoint template.   Additional partial templates are also parsed for use in the endpoint template.

The html5/css/js started out as a boilerplate for browser support and responsiveness.

## The architecture

To handle SSL, compression and load the server will sit behind an NGINX proxy.  This comes by default in Dokku.  If you don't know Dokku, its a lightweight Heroku clone to make deployments dead simple.  You just push your repository and Dokku builds it and deploys the appropriate docker container with close to no downtime behind the NGINX proxy.

Right now I'm still running in my digital ocean droplet, but I'd like to share some of my experiences migrating to Amazon Web Services, specifically the Elastic Container Service.


### the amazon ECS experiment

The need to move to Amazon is an incomplete experiment to see if I can reduce or par costs while increasing availability.

While Dokku uses containers behind the scenes, you don't actually have to create Dockerfile's.  To use Amazon's service, I needed to create A dockerfile for the server which is relatively straight forward.  Used a golang alpine base container (alpine is a popular minimalist Linux). Then just a matter of specifying commands and variables to build and start the server.

The command line util `ecs-cli` can use docker compose files to create the definitions it needs once you have setup your account and permissions.