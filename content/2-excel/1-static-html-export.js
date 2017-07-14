module.exports = {
  name: 'Export into a Static HTML App',
  intro: `
The best way to deploy your web app is as a static HTML app, if that's possible. With a static app, you can use a fast and efficient web server like [NGINX](https://nginx.org/en/) or a cost-effective static hosting service like [ZEIT now](https://zeit.co/blog/unlimited-static) or GitHub pages.

But not every app can be deployed as a static app. If your app needs to generate dynamic pages at the runtime, you can't deploy it as a static app.

If you can categorize your app as a static app, you can build it with Next.js.
Next.js 3.0 comes with a feature that allows you to export an app into a set of HTML pages. 

In this lesson, we are going to explore that feature.
Let's get started.
  `,
  steps: [
    {
      id: 'setup',
      type: 'text',
      points: 5,
      text: `
In this lesson, we need a simple Next.js app to play with. Try to download the example app below.
(This is the blog app we created in previous lessons.)

~~~bash
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout static-blog-base
~~~

You can run it with:

~~~bash
npm install
npm run dev
~~~

Now you can access the app by navigating to http://localhost:3000/.
      `
    },

    {
      id: 'export-the-index-page',
      type: 'mcq',
      points: 20,
      answers: [
        'A page with the usual page content',
        'An empty page but Not Found in the browser console',
        'A page with \'Not Found\' as the content',
        'A page with \'500 Internal Error\' as the content'
      ],
      correctAnswer: 'A page with \'Not Found\' as the content',
      text: `
## Export the Index Page

Now we are going to export our index page (\`pages/index.js\`) as a static HTML page.

First of all, create a file called \`next.config.js\` in the root of your app and add the following content:

~~~js
module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  }
}
~~~

Then add the following NPM scripts into the package.json.

~~~js
{
  "scripts": {
    "build": "next build",
    "export": "next export"
  }
}
~~~

Then run the following commands:

~~~bash
npm run build
npm run export
~~~

Now you can see the exported HTML content on a directory called "out" inside your project.

That's a fully functioning static web app. You can deploy it to any static hosting service, and it will work fine.
But before we do that, we need to test it out locally.

In order to test the app, install the following [serve](https://www.npmjs.com/package/serve) NPM module globally:

~~~bash
npm install -g serve
~~~

> "serve" is a pretty simple static web server. You can also use any other similar tool.
But to make things simple, use serve for this lesson.


After you've installed "serve", run following commands from the app root:

~~~
cd out
serve -p 8080
~~~

Now you can access your static app with: [http://localhost:8080](http://localhost:8080/).
Everything should be working as usual.

Now try to visit this page: http://localhost:8080/p/hello-nextjs/.

How do you describe the output?
      `
    },

    {
      id: 'only-the-index-page',
      type: 'text',
      points: 5,
      text: `
## Only the Index Page

As you experienced, you'll get a page with "Not Found" as the content. You get it when you try to access the page directly. You can see the same behavior for any other page except the index page (/).

This is what's happening here:

You can access all the pages via client side since the app loads the relevant JavaScript content. But when you try to load it directly, it has no HTML content to serve.

That's because we asked Next.js to export only the index (/) page. 

Have a look at the config we've added:

~~~js
module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  }
}
~~~
      `
    },

    {
      id: 'exporting-other-pages',
      type: 'mcq',
      points: 25,
      answers: [
        'The expected page content',
        'An empty page but Not Found in the browser console',
        'A page with \`Not Found\` as the content',
        'A page with \`500 Internal Error\` as the content'
      ],
      correctAnswer: 'The expected page content',
      text: `
## Exporting Other Pages

Now, let's try to export all the other pages as well. 

For that, add the following content to the \`next.config.js\` file:

~~~js
module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/p/hello-nextjs': { page: '/post', query: { title: "Hello Next.js" } },
      '/p/learn-nextjs': { page: '/post', query: { title: "Learn Next.js is awesome" } },
      '/p/deploy-nextjs': { page: '/post', query: { title: "Deploy apps with Zeit" } }
    }
  }
}
~~~

As is shown in the above config, the \`/about\` path is very similar to the \`/\` path. But the others are a bit different.

Here's what's going on here:

To render blog posts in our app, we've got a single page called \`/post\`. We pass different content to that page via query strings.
So, we need to provide those query strings when we are exporting our app too.

That's what we are doing with the above config for all the pages starting with \`/p/\`.

Now close the existing app running with serve and run the following commands in your app root:

~~~bash
npm run build
npm run export
cd out
serve -p 8080
~~~

Now you'll be able to access the following page without any issues:

http://localhost:8080/p/learn-nextjs/

---

Let's do a simple task.

Add the following content to your config:

~~~js
'/p/exporting-pages': { page: '/post', query: { title: "Learn to Export HTML Pages" } }
~~~

Our final config will now look like this:

~~~js
module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/p/hello-nextjs': {page: '/post', query: { title: "Hello Next.js" } },
      '/p/learn-nextjs': { page: '/post', query: { title: "Learn Next.js is awesome" } },
      '/p/deploy-nextjs': { page: '/post', query: { title: "Deploy apps with Zeit" } },
      '/p/exporting-pages': { page: '/post', query: { title: "Learn to Export HTML Pages" } }
    }
  }
}
~~~

Then close the current "serve" instance and run the following commands in the app root:

~~~bash
npm run export
cd out
serve -p 8080
~~~

Now try to access this page: http://localhost:8080/p/exporting-pages/.
What's the output of the page?
      `
    },

    {
      id: 'no-need-to-build-always',
      type: 'mcq',
      points: 15,
      answers: [
        'It\'s not required for `next export`',
        'Next export invokes `next build` inside it',
        'The page `/post` already exists in the build',
        'The page `/p` already exists in the build'
      ],
      correctAnswer: 'The page `/post` already exists in the build',
      text: `
## No Need to Always Build

As you've seen, we can access the page without any issues. That page is not available in the \`/\` page, but we were able to generate the static HTML for it.

That's because the exporting HTML is totally controlled by the config we've added to the \`next.config.js\`.

In order to export that page, these are the commands we've invoked:

~~~bash
npm run export
cd out
serve -p 8080
~~~

As you can see, there's no \`npm run build\` command. Why is that?
      `
    },

    {
      id: 'post-page-is-already-there',
      type: 'text',
      points: 5,
      text: `
## Post Page is Already There

Next.js won't build the app when running the \`next export\` command. In this case, the \`/post\` page already exists in the build, and there's no need to build the whole app again.

But if we've made any changes to the app, we need to build the app again to get those changes.
      `
    },

    {
      id: 'deploying-the-app',
      type: 'text',
      points: 5,
      text: `
## Deploying the App

Deploying the app is pretty simple. Simply visit the "out" directory and deploy it to your favorite static hosting service.

If you are using [ZEIT now](https://zeit.co/blog/unlimited-static), this is how to do it:

~~~bash
cd out
now
~~~

![](https://user-images.githubusercontent.com/50838/28051263-be887132-6620-11e7-814a-9b2e5903c250.png)

      `
    },

    {
      id: 'thats-it',
      type: 'text',
      points: 5,
      text: `
## That's It

This is all about the [static HTML export](https://github.com/zeit/next.js#static-html-export) feature of Next.js. You can develop your app, usually with \`next\` (AKA: \`npm run dev\`), and when it's time to deploy the app, you can export it as a static app.

But if you need to create pages dynamically after you've deploy the app, this is not the solution.
For that, you need to build the app and start it with \`next start\` or use our [programmatic API](https://github.com/zeit/next.js#custom-server-and-routing).
      `
    }
  ]
}
