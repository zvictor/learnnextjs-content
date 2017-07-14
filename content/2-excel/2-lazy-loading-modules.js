module.exports = {
  name: 'Lazy Loading Modules',
  intro: `
Next.js does automatic code splitting and it is based on the pages in your app. For example, if one of your modules is used at-least in half of your pages, then it moves into the main JavaScript bundle. If not, that module stays inside the page's bundle.

This is a pretty decent default setup. But sometimes, we need much better control for loading modules. For example, have a look at the following scenario, where:

* We are building a hacker news clone based on the [official firebase API](https://github.com/HackerNews/API),
* We fetch the data on the server to do SSR,
* We also fetch data in the client side when needed (when switching pages).

In this case, our main app bundle contains the [\`firebase\`](https://www.npmjs.com/package/firebase) module, simply because it is used in all of our pages. It is a pretty big module. (More than the size of react, react-dom and next.js all combined)

But when it comes to client side, we only need it when the user starts navigating into a different page. So, if we can load the \`firebase\` module at that time, we can improve the initial loading of our app.

That is exactly what we are trying to do with this lesson.
  `,
  steps: [
    {
      id: 'setup',
      type: 'text',
      points: 5,
      text: `
## Setup

For this lesson, we have already built a very basic hacker news clone.
Here is how to get it:

~~~bash
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout firebase-hn
~~~

Then you can run the app with:

~~~bash
npm install
npm run dev
~~~

Now, visit <http://locahost:3000> and try out the app.
      `
    },
    {
      id: 'analyze',
      type: 'mcq',
      points: 20,
      answers: [
        'inside commons.js bundle',
        'inside main.js bundle',
        'inside pages/index.js bundle',
        'in all pages'
      ],
      correctAnswer: 'inside commons.js bundle',
      text: `
## Analyze

The app will look like this and it is a pretty basic one:

![](https://user-images.githubusercontent.com/50838/28233925-2ff5dacc-6918-11e7-935c-61cd5df2d0f0.png)

Now, let's try to understand what is inside our app bundle.

For that, simply run the following command:

~~~bash
npm run analyze
~~~

Then, it will start a [webpack bundle analyzer](https://github.com/th0r/webpack-bundle-analyzer) and you will be able to inspect what is inside each of the JavaScript bundle.

So, the \`firebase\` bundle may contain:
      `
    },

    {
      id: 'analyze-result',
      type: 'text',
      points: 5,
      text: `
## Analyze Result

As you have seen, the firebase module stays inside the \`commons.js\` bundle.

![](https://user-images.githubusercontent.com/50838/28233926-30504a3e-6918-11e7-96fc-473b9f7a4a29.png)

That is simply happening because it is used in all of the pages in our app.
      `
    },
    {
      id: 'lazy-loading',
      type: 'mcq',
      points: 25,
      answers: [
        'commons.js',
        'main.js',
        'chunks/firebase.js',
        'chunks/firebase-[a-random-string].js'
      ],
      correctAnswer: 'chunks/firebase-[a-random-string].js',
      text: `
## Lazy Loading

We use the \`firebase\` module, only when the user is trying to navigate into a different page. So, if we can load the \`firebase\` module at that time, that is a huge win for our app.

Luckily, we can easily do that with Next.js's [dynamic import](https://github.com/zeit/next.js#dynamic-import) functionality.

Let's do it.

The firebase related code is located in the \`lib/load-db.js\` file. Here is the content:

~~~js
export default async () => {
  const firebase = require('firebase')

  try {
    firebase.initializeApp({
      databaseURL: 'https://hacker-news.firebaseio.com'
    })
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
  }

  return firebase.database().ref('v0')
}
~~~

This code is used inside the \`getInitialProps\` function in each page.
This is a pretty decent code and it uses \`require\` to load the firebase module.

Now, we are going to do a small change to the above code, when we require the \`firebase\` module.

~~~js
// const firebase = require('firebase')
const firebase = await import('firebase')
~~~

Here, we use \`import()\` function to load the firebase module. It returns a promise and we use \`await\` to wait and resolve the module.

Try to apply the above change and analyze the JavaScript bundles again with:

~~~bash
npm run analyze
~~~

Then, select the name of the bundle where the firebase module reside. That might be:
      `
    },
    {
      id: 'its-own-bundle',
      type: 'text',
      points: 5,
      text: `
## Its own bundle

As you can see, it has its own bundle and its name looks like:

~~~
chunks/firebase-[a-random-string].js
~~~

![](https://user-images.githubusercontent.com/50838/28233928-308214b0-6918-11e7-9dac-d7cfc5ee2299.png)

This bundle is loaded when you try to import \`firebase\`.
      `
    },
    {
      id: 'lets-test-it',
      type: 'mcq',
      points: 25,
      answers: [
        '“firebase” bundle loads every time',
        '“firebase” bundle loads only in the first time',
        '“firebase” bundle loads only in the second time',
        '“firebase” bundle never loads'
      ],
      correctAnswer: '“firebase” bundle loads only in the first time',
      text: `
## Let's test it

Now let's try to see how this works in the browser.

For that, we need to run the production version of our app. You can do that with:

~~~
npm run build
npm run start
~~~

Then, start the app in the browser which has a decent Network inspect debugger.
(To make things simple, I suggest that you should use Chrome)

Now, load <http://localhost:3000> in Chrome and open the Network inspector.

![](https://user-images.githubusercontent.com/50838/28233927-307dc752-6918-11e7-8976-e30b9fc843cf.png)

Then, clear the current data in the Network inspector.

> You can click the selected icon with red square in the above image.
> But if the browser version changes, the location might be in a different place.

Now, click on any title listed on the page. Check the Network inspector.
Then, click the “Home” link and go to the index page again. Check the Network inspector.

How do you best describe what you've inspected?
      `
    },

    {
      id: 'test-results',
      type: 'text',
      points: 5,
      text: `
## Test Result

As you have witnessed, it only loads when you navigate a page for the first time. Here is what is actually happening.

At the first time, \`getIntitialProps\` of the \`pages/post.js\` page imports the \`firebase\` module (via \`lib/load-db.js\`). So, the app loads the bundle.

Even the second time, \`pages/index.js\` page imports the \`firebase\` module. But at that time, it is already loaded and there is no reason to load it again.
      `
    },
    {
      id: 'finally',
      type: 'text',
      points: 5,
      text: `
## Finally

Frankly, this example is not the perfect use case for lazy loading. That is simply because,

* You need the \`firebase\` module in all of the pages.
* Lazy loaded firebase module reduces the size of the main JavaScript bundle \`app.js\`,
but it doesn't affect the initial page loading time since the page is server rendered.
* Loading of the main JavaScript bundle doesn't block the initial HTML rendering

The only benefit this gives us, is the quick JavaScript interactivity because the \`app.js\` loads faster due to the reduced size.

Anyway, this is a pretty good example where we can demonstrate the lazy loading module.
So, you can use it in your app when it is needed.
      `
    }
  ]
}
