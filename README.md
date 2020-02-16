<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [References](#references)
- [Firebase Auth](#firebase-auth)
- [Conversion to TypeScript](#conversion-to-typescript)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# References

1. Copied from this [tutorial](https://tinyurl.com/sgrm2lq)
2. Importing images into webpack + react [tutorial](https://tinyurl.com/t86rwy7)
3. Event emitters and other patterns [tutorial](https://tinyurl.com/uh9evav)

# Firebase Auth

The most interesting thing about Firebase Auth is that you should not use the
promises returned by the signed in (`signInWithPopup()`) or signed out
(`signOut()`) functions to actually do anything to change your app's signed in
or signed out state. Instead, there is a different callback called
`onAuthStateChanged(user)` which should actually be handling this.

Why?

`onAuthStateChanged(user)` is called by Firebase Auth when the app is first
loaded. So if the user has already been successfully signed in, in a previous
session of the app, then this information is not lost, and the user does not
have to sign in again. Also, there is no need for your app to even remember the
credentials, since Firebase Auth will provide this in the user parameter that is
passed to your callback (that handles `onAuthStateChanged`).

```js
this.firebaseAuth.onAuthStateChanged(user => {
  if (user) {
    console.log("🐥", user.displayName, "has signed in!");
    this.handleSignIn(user);
  } else {
    console.log("🥚User has signed out!");
    this.handleSignOut();
  }
});
```

So it is a very complex dance that your app has to perform to get a user signed
in or out. It goes something like:

1. Register your callback w/ `onAuthStateChanged()` right away when your app
   starts.
2. If the user has previously successfully signed in, then this will result in
   the user being signed in again into your app.
3. If the user has not previously signed in, then when the user initiates some
   UI event that results in `signInWithPopup()` being called, this will result
   in (depending on whether they are able to sign in or not) the
   `onAuthStateChanged()` callback to be fired in your app by Firebase Auth.

So there isn't any "direct" flow from your user clicking the sign in button to
your app transitioning to a signed in state. The middleman is
`onAuthStateChanged()` which is the traffic cop you have to go thru. It's not
the most elegant API design or flow. And it does little to hide the async nature
of this process. Sadly it complicates things by not providing a single path that
you can take. This is because you can even use a promise returned by
`signInWithPopup()` which has a `result` object, that contains the `user` object
that you would get in your callback registered w/ `onAuthStateChanged()`.

```js
signIn = () => {
  const authProvider = new firebase.auth.GoogleAuthProvider();
  this.firebaseAuth.signInWithPopup(authProvider).then(result => {
    console.log("Signed in!");
    // Do not use the `result.user` object here! Instead leverage your callback
    // registered w/ `onAuthStateChanged()` to handle the sign in in your app.
  });
};
```

And the
[Firebase API reference on Auth](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
are sparse at best, and misleading at worst.

# Conversion to TypeScript

The [following tutorial](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)
is a great reference to follow to convert JS projects that use React to TS projects.

One of the biggest changes is that the import statements are all different. For TS and
React, they look like the following now.

```typescript
import * as React from "react";
import * as myData from "../data/data.json";
```

Here are some more references that helped along the way.

1. [SO discussion on react import statements](https://stackoverflow.com/a/57741687/2085356)
2. [Tutorial on React.Component types](https://fettblog.eu/typescript-react/components/)
3. [SO discussion on how to import SVG files](https://stackoverflow.com/a/45887328/2085356)
4. [Tutorial on importing JSON files](https://mariusschulz.com/blog/importing-json-modules-in-typescript)
5. [Tutorial on TS arrow functions](https://www.tutorialsteacher.com/typescript/arrow-function)
6. [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)