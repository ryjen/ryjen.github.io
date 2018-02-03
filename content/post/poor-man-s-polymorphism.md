---
title: "Poor Man's Polymorphism"
tags:
  - c
  - polymorphism
  - programming
date: 2012-11-30
description: "hacking in c"
aliases:
  - blog/2012/11/30/poor-mans-polymorphism/
---

Just when you think you know everything about C... a way to polymorph C data structures.

How?  Structs with the same field types and ordering can be casted.


This is an attempt at an example.

<div class="card bg-default">
<span class="larger"><b>Note:</b></span> Don't do anything like this in the real world.
</div>


#### Example Story

Given a base structure called vehicle...

```c
typedef struct 
{
  int key;
} 
Vehicle;
```

Sub structures must implement the exact types and order to cast it.

and a similar structure called car....

```c
typedef struct
{
  int key;
  /* car specific */
  int doors;
  int wheels;
}
Car;
```

and a third structure called boat...

```c
typedef struct 
{
  int key;
  /* boat specific */
  int life_jackets;
  int anchors;
}
Boat;
```

We can use a function designed for the base type with the two subtypes.

<div class="card bg-default">
	<b>Note</b>: this is copy by value, not a pointer, but it shouldn't matter
</div>

```c
int key_fits_vehicle(Vehicle this, int key)
{
  /* check for the right key */
  return this.key == key;
}
```

##### Test the Ignition

This is really what the black magic is all about.  We can cast a Car or Plane to a Vehicle because the field type and order is the same.

```c
Car car;
car.key = key1;
car.doors = 4;
car.wheels = 4;

Boat boat;
boat.key = boat;
boat.life_jackets = 6;
boat.anchors = 1;

if (key_fits_vehicle((Vehicle) car, key1)) {
  puts("key1 fits the car");
} else {
  puts("key2 does not fit the car");
}

if (key_fits_vehicle((Vehicle) car, key2)) {
  puts("key2 fits the car");
} else {
  puts("key2 does not fit the car");
}

if (key_fits_vehicle((Vehicle) boat, key1)) {
  puts("key1 fits the boat");
} else {
  puts("key1 does not fit the boat");
}

if (key_fits_vehicle((Vehicle) boat, key2)) {
  puts("key2 fits the boat");
} else {
  puts("key2 does not fit the boat");
}
```

#### Output

```bash
key1 fits the car
key2 does not fit the car
key1 does not fit the boat
key2 fits the boat
```



