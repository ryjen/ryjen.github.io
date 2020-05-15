---
title: "Poor Man's Polymorphism"
tags:
  - c
  - polymorphism
  - programming
date: 2012-11-30
updated: 2019-01-26
description: "c wierdness"
aliases:
  - blog/2012/11/30/poor-mans-polymorphism/
---


Found out that C structs can be casted between each other if the **field types and ordering are the same**.  It is not portable code, but you can start too see how and why the virtual table and object oriented programming evolved in c++.

As far as I know it would still be possible to write this in c++, but as always, you should definitely not.


#### A Quick Example

```c
struct Animal {
  int eyes;
}

struct Dog {
  int eyes;
  /* dog specific */
  int tail;
}

struct Human{
  int eyes;
  /* human specific */
  int brain;
}
```

Passing humans or dogs to any function that takes an animal with a cast.

```
int look(Animal *this, int object) {
  this->eyes = object;
}

Dog *dog = new_dog();

look((Animal*) dog, obj);
```


