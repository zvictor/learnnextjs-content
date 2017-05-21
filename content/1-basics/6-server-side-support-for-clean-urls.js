module.exports = {
  name: 'Server Side Support for Clean URLs',
  intro: `
In the previous lesson, we learned how to create clean URLs for our app. Basically, we can have URLs like this:

http://localhost:3000/p/my-blog-post

But it only worked with client side navigations. When we reload page, it gives us a 404 page.
That's because there is no actual page called \`p/my-blog-post\` in the pages directory.

![](https://cloud.githubusercontent.com/assets/50838/24919433/475417bc-1f01-11e7-9fae-a17030d3d051.png)

We can solve this pretty easily with the [Next.js custom server API](https://github.com/zeit/next.js#custom-server-and-routing).
Let's see how we can do it.
  `,
  steps: [
    {
      id: 'setup',
      type: 'text',
      points: 5,
      text: `
  First of all, we need a simple Next.js app to play with. Try to download the following example app:

  ~~~bash
  git clone https://github.com/arunoda/learnnextjs-demo.git
  cd learnnextjs-demo
  git checkout clean-urls
  ~~~

  You can run it with:

  ~~~bash
  npm install
  npm run dev
  ~~~

  Now you can access the app by navigating into http://localhost:3000.
      `
    },

    {
      id: 'create-a-custom-server',
      type: 'mcq',
      points: 25,
      answers: [
        'It will add server side support for clean URLs.',
        'The app will work but no server side clean URLs.',
        'The app will throw an error: “Express and Next.js cannot be used together.”',
        'The app will throw an error: “Next.js custom server only work in production.”'
      ],
      correctAnswer: 'The app will work but no server side clean URLs.',
      text: `
## Create a Custom Server

Now we are going to create a custom server for our app using [Express](https://expressjs.com/). It's pretty simple. 

First of all, add Express into your app:

~~~bash
npm install --save express
~~~

Then create a file called \`server.js\` in your app and add following content:

~~~js
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
~~~

Now update your npm dev script to:

~~~json
{
  "scripts": {
    "dev": "node server.js"
  }
} 
~~~

Now try to run your app again with \`npm run dev\`.

What's the you experience you will get?
      `
    },

    {
      id: 'create-our-custom-route',
      type: 'mcq',
      points: 30,
      answers: [
        'No. There are no issues.',
        'Client side rendered title and server side rendered title are different.',
        'Server side rendered page will have an error on the console.',
        'Client side rendered page will have an error on the console.'
      ],
      correctAnswer: 'Client side rendered title and server side rendered title are different.',
      text: `
## Create our Custom Route

As you've experienced, the app will work just like it did previously because the custom server we wrote is similar to the “next” binary command.

Now we are going to add a custom route to match our blog post URLs. 

With the new route, our \`server.js\` will look like this:

~~~js
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
~~~

Have a look at the code below:

~~~js
server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id } 
    app.render(req, res, actualPage, queryParams)
})
~~~

Here, we simply mapped a custom route to our existing page "/post". We have also mapped query params as well.

So, that's it.

Now, restart your app and visit to following page:

http://localhost:3000/p/hello-nextjs

Now you won't see the 404 page anymore but the actual page.

But there's an small issue. Can you identify it?
      `
    },

    {
      id: 'information-on-url',
      type: 'text',
      points: 5,
      text: `
## Information on URL

Our \`/post\` page accepts the title via the query string parameter \`title\`. In client side routing, we can easily give it a proper value with URL masking.
(via the **as** prop in Link).

~~~js
<Link as={\`/p/\${props.id}\`} href={\`/post?title=\${props.title}\`}>
  <a>{props.title}</a>
</Link>
~~~

But in the server route, we don't have that title because we only have an ID for the blog post in the URL.  So, in that case, we set the ID as the server side query string param.

You can see it in the following route definition:

~~~js
server.get('/p/:id', (req, res) => {
  const actualPage = '/post'
  const queryParams = { title: req.params.id } 
  app.render(req, res, actualPage, queryParams)
})
~~~

This is a problem. But in the real world, this won't be much of an issue because we'll use an ID to fetch data from a data server in both client and the server.

So, we only need an ID.
      `
    },

    { 
      id: 'finally',
      type: 'text',
      points: 5,
      text: `
## Finally

Here we've simply created a route using Next.js custom server API. With that, we've added server side support for clean URLs. Just like this, you can create as many routes as you want.

You're not limited to using [Express](https://expressjs.com/). You can use any Node.js server framework for that. You can also look at the Next.js documentation for the [custom server API](https://github.com/zeit/next.js#custom-server-and-routing).
      `
    }
  ]
}
