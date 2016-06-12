---
title: Java Key Path Json Objects
tags:
  - java
  - json
  - key path
  - programming
date: 2014-02-20
description: "emulating key-value coding in java"
aliases:
   - blog/2014/02/20/java-key-path-json-objects/
---

After using apple's key-value coding to basically have models without writing models, I decided to write rewrite a simple wrapper for java's JSONObject that will allow similar functionality.

So given the following JSON:
```json
    {
      "test1" : {
          "result": "pass",
          "code": 42,
          "verified", true,

          "subtest1": [
              { "result": "fail", "code": 3.14, "verified": false},
              { "result": "unknown", "code": 1234, "verified": "false"}
          ]
      }
    }
```
I can reduce long chucks of code into one-liners (albeit less efficiently speed wise):
```java
    package com.arg3.java.json;
    ...

    // create the object with the above json
    JSONObject json = JSONObject.parse(jsonString);

    // pull a value
    json.getIntPath("test1.code") == 42; // cool!

    // pull a value in an array
    json.getIntPath("test1.subtest1[0].code") == 314;

    // put a value into a completely new array
    json.putPath("test1.subtest2[1].result", "pass");

    // remove the result of the new array
    String result = json.removePath("test1.subtest2[1].result");
    result.equals("pass");

    json.getPath("test1.subtest2[*].result"); // will contain a list of "fail" and "unknown"
```
The source code can be found at: [jsonobject on github](http://github.com/ryjen/jsonobject)

(The original gist and accompanying unit tests are still available as a [Gist](https://gist.github.com/ryjen/e209b4fabded5b2b1c56))
