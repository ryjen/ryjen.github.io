---
title: why golang
description: why golang is a guru language
date: 2020-07-24
draft: true
tags: [golang, programming language, philosophy, guru]
categories: [programming]
---

Have become a fan boy of [golang](https://golang.org) as a replacement for my beloved C purely because it is so simplified, and thus a **guru** language to me.

As it stands now, I am somewhat burned out in the depths of a mid-life crisis and pandemic.  Do not have, or want, the memory capacity for anything more complex or verbose.

A language like go meets these soft skill requirements more than others:

- is not verbose
- does not mix strict object oriented principles with other principles (functional, extensions)
- implementations from different people are mostly consistent
- sufficient tooling
- efficient with no virtual machine or binary dependency
- cross platform and C-compatible binaries
- used in industry

[Rust]() is a very close second only because it is more verbose and you have to master the borrow checker.
[Swift]() suffers from implementation differences and the apple bias, but benefits from optimizations.
[C++]() is hell if a person is not pragmatic enough to use wisely and strictly.

The rest of the languages are great in their own right but do not meet my needs.  

Frontend work it is hard to avoid javascript for web.  For mobile languages are locked into swift/objc or java/kotlin. Cross-mobile frameworks are more common and to keep transferable with web, you might as well use a javascript one.

Possible modern language upgrade paths:

Legacy || Modern
--- | ---
C | Go
C++, Objc | Rust
Objc | Swift
Java | Kotlin, Scala, Clojure
Erlang | Elixir
VB | C#, F#
JS | TypeScript, Babel

A common problem with libraries and frameworks is [overchoice](https://en.wikipedia.org/wiki/Overchoice).  One does not need overchoice in the fundamental idiosyncrasies of a language.

That being said, wanted a closer look at some things.

## golang testing and assertions

Will assume you are familiar with testing in go and the various frameworks.  

### assertions

In my experience, assertion frameworks in general are sometime overkill, or in other words are unnecessary verbose.

Methods like **IsFalse()/IsTrue()** or **IsNil()/IsNotNil()** are superfluous or could be reduced to a simple boolean if check.

Golang does not include an assertion framework.  That being said, writing repeated if conditions can still be tedious and a more fluent way may be desired.  

In the spirit of simplicity, a fluent assertion can be reduced to a wrapper for a single boolean condition.

```golang
// +build test

package assert

// Action for a condition
type Action func()

// Handler for a condition
type Context struct {
  // the context value if any
  value string
  // the condition to handle
	condition bool
}

// Then performs the action
func (c Context) Then(action Action) {
  // Check the test condition...
	if c.condition {
    // and perform the action if needed.
    // typically a failure indication.
		action()
	}
  // if the condition is not true the action is ignored
}

// When tests a condition for an action
func When(condition bool) Handler {
	return Handler{condition: condition}
}
```

Running an action for a failed boolean condition handles ~95% of unit testing.

Some examples:

```golang
func TestLogic(t *testing.T) {
  err := performLogic()
  When(err != nil).Do(t.Fail)
}
```

This test performs the logic functionality, when there is an error condition, the standard failure method is used.

```golang
func TestLogicVerbose(t *testing.T) {
  err := performLogic()
  When(err != nil).Do(func() {
    t.Fatal("performing logic failed:", err.Error())
  })
}
```

In this example, when the logic functionality has an error condition, a custom action reports the failure with a message.

## resource dependencies and cleanup

In some tests there are dependencies on external resources such as a file system or a database.

Golang does not provide the junit style **Before** or **After** hooks like some testing frameworks.

Instead there is a **Cleanup** hook and the ability to **run sub-tests** from within a test to preserve state.

For example:

```golang
func TestWrite(t *testing.T) {

  // the data to use for IO
  expected := randomData()

  // register a cleanup after the test
  t.Cleanup(func() {
    if err := storage.Remove(expected); err != nil {
      panic(err)
    }
  })

  // Write to storage
  err := storage.Write(expected)
  When(err != nil).Do(t.Fail)

  // Run a sub test to read data back
  t.Run(func (t *testing.T) {

    result, err := storage.Read()

    When(err != nil).Do(t.Fail)
    When(result != expected).Do(t.Fail)
  })
}
```

In this example the test some data is generated to read/write and a cleanup hook is registered to remove it.

The unit test writes the data and runs a sub test to read it back, asserting failure on errors.

When the test and the sub-test have finished the cleanup hook will run and remove the resource.

## conclusion

So simple, so clean, so guru.  No fuss, no muss.

I am also a fan of **[behaviour driven development]()** when it comes to unit testing
