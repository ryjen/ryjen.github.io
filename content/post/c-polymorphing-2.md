---
title: "c hacking: polymorphing 2"
slug: c-hacking-polymoriphing-2
date: 2015-12-02
tags:
   - c
   - programming
   - polymorphism
   - cparse
description: "c struct reuse"
draft: true
---

While working on [cparse](http://github.com/ryjen/cparse) I found another nifty way to sort of simulate polymorphism.

cparse
======

Another exercise in futility, a C implementation for the  REST api at [parse.com](http://parse.com).  Really the core of it is a web client and an object structure using json.

polymorphing
============

I started off by having separate structure for the different type of objects, but I quickly realized there was a lot of code duplication.
To solve this I used a combination of type defines and function pointers to the library API appear to be working with a seperate type, but are indeed still working with the base object type.

So for an example, I'll explain an object and user types.

object
------

```c
/* the alias */
typedef struct cparse_object cParseObject;

/* the definition */
struct cparse_object
{
	char *objectId;
	cParseJson *attributes;
	/* etc. */
};

/* functions to operate on objects */

bool cparse_object_save(cParseObject *obj, cParseError **error);

bool cparse_object_delete(cParseObject *obj, cParseError **error);

/* etc */

```

user
----

```c
/* the alias: note that it is aliasing an object */
typedef struct cparse_object cParseUser;

/* implementation of functions to operator on users: note that they point to object functions */

bool (*cparse_user_save)(cParseUser *obj, cParseError **error) = cparse_object_save;

bool (*cparse_user_delete)(cParseUser *obj, cParseError **error) = cparse_object_delete;

/* etc */

```

example usage
-------------

```c

/* example object */
cParseObject *obj = cparse_object_new();

cparse_object_save(obj, &error);


/* example user */
cParseUser *user = cparse_user_new();

cparse_user_save(user, &error);

```

Conclusion
----------

As you can see from the example, the library API appears to be working with two distinct objects.  Using JSON as an object structure allows the object type to be resused (aliased) into other types this way without worrying about its members.  User objects can be passed directly to object functions as parameters without any issues.

Another benefit of this implementation is if the user object ever does become a distinct seperate object, the library API does not change or affect existing code!

Cheers!
