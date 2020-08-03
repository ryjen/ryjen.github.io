---
title: Schemaless Databases
description: a look into the trend
tags: [database, schema, data]
categories: [software engineering]
date: 2020-08-03
---

Schemaless databases came into my radar with [MongoDB](https://www.mongodb.com/), [Redis](https://redis.io/) and such.  I have often admired the ability to alter schema on fly and enjoyed experimenting with the possibilities.

Solutions like the now defunct [cparse](https://github.com/cparse/cparse), [couchbase](https://www.couchbase.com/) and [Firebase](https://firebase.google.com/) have been big successes. 

### Why?

The success of schemaless databases makes a lot of sense in part because of API consumption as JSON and mobile devices if you can get the synchronization part right.

At [a startup I worked at for a few years](https://www.epactnetwork.com/), I experimented with a hybrid relational database and schemaless using [JSON extensions for SQLite](https://www.sqlite.org/json1.html) - the industry de facto mobile database.  

This was quite fascinating and enabled serving queryable dynamic data very easily from an engineering perspective without changing to much of the underlying core architecture.

### Recently

Not too long ago I read an article from [Uber engineering](https://eng.uber.com/schemaless-part-one-mysql-datastore/) describing how they transitioned from postgres to a hybrid schemaless using [MySQL and JSON](https://dev.mysql.com/doc/refman/8.0/en/json.html).  

Databases have introduced JSON a while back and have been around for quite a few years.  They could definitely be considered a stable feature.  

[Postgres also has JSON extensions](https://www.postgresql.org/docs/9.3/functions-json.html) for querying and storage, but I believe Uber went with MySQL for some replication features needed for scalability.

### Micrantha

This is very inline with what I am doing at [micrantha](https://micrantha.com/labratory) labs.  **Garden** as is is called, is currently an experimental extension that makes it easier to perform basic CRUD using schemaless JSON on postgres.

I have plans for a hash based mobile synchronization piece based on my experience with the same in SQLite.

The reasoning is frankly, because I am a hugely egoic when it comes to tech and think I can do something more lightweight or better. 


