module.exports = {
  name: 'Deploying a Next.js App',
  intro: `
Have you ever come across this question?

> How can I deploy my Next.js app?

We haven't talked about that yet, but it's pretty simple and straightforward.

You can deploy a Next.js app into anywhere you can run Node.js. So, there's not any kind of lock-in, even though deploying into [▲ZEIT now](https://zeit.co/now) is super simple.

Let's learn about deploying Next.js apps.
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
git checkout using-shared-components
~~~

You can run it with:

~~~bash
npm install
npm run dev
~~~

Now you can access the app by navigating to http://localhost:3000.
      `
    },
    {
      id: 'build-and-start',
      type: 'text',
      points: 10,
      text: `
## Build and Start

First of all, we need to build our Next.js app for production. It will produce an optimized set of code for production.

For that, simply add the following npm script:

~~~json
"scripts": {
  "build": "next build"
}
~~~

Then you need to start your Next.js app on a port. That will do side rendering and serve pages (built with the above command).

For that, add the following npm script:

~~~json
"scripts": {
  "start": "next start"
}
~~~

That will start our app in port 3000.

So, you can run the following commands to run our app in production:

~~~bash
npm run build
npm run start
~~~
      `
    },

    {
      id: 'run-two-instances',
      type: 'mcq',
      points: 25,
      answers: [
        'Yes, both http://localhost:8000 and http://localhost:9000',
        'Only http://localhost:8000',
        'Only http://localhost:9000',
        'Neither one'
      ],
      correctAnswer: 'Yes, both http://localhost:8000 and http://localhost:9000',
      text: `
## Run two instances

Now we are going to run two instances of our app. Usually, we do this to horizontally scale our app.
First of all, make the following changes to our start npm script:

~~~json
"scripts": {
  "start": "next start -p $PORT"
}
~~~

> If you are on Windows, your start script should be \`next start -p %PORT%\`.

Now let's build our app first.

~~~bash
npm run build
~~~

Then try to run the following commands in its own terminal:

~~~
PORT=8000 npm start
PORT=9000 npm start
~~~

> On Windows, you will need to run the command differently. One option is to install the npm module [\`cross-env\`](https://www.npmjs.com/package/cross-env) into your app.
Then run \`cross-env PORT=9000 npm start\` from the command line.

Is it possible to access our app on both ports?
      `
    },

    {
      id: 'build-once-run-many-instances',
      type: 'text',
      points: 5,
      text: `
## Build Once, Run Many Instances

As you can see, you need to build your app once. Then you can start it on as many ports as you wish.
      `
    },

    {
      id: 'deploying-to-zeit-now',
      type: 'mcq',
      points: 30,
      answers: [
        '8000',
        '443 (or without a port mentioned)',
        'Any port you mentioned in the URL',
        'It will throw an error saying, "You can only start your app on port 443"'
      ],
      correctAnswer: '443 (or without a port mentioned)',
      text: `
## Deploying to ▲ZEIT now

Now we know how to build and start a Next.js app. We did everything with npm scripts. So, you will be able to customize it to work with your favorite deployment service.

But if you use [▲ZEIT now](https://zeit.co/now), there is only a single step.

Just add the following npm scripts:

~~~json
"scripts": {
  "build": "next build",
  "start": "next start -p 8000"
}
~~~

Then [install now](https://zeit.co/now). Then apply the following command:

~~~
now
~~~

> Basically, you run the “now” command inside your app's root directory.

Here, we mentioned port 8000 as the port in which we start our app. But we didn't change it when deploying to ZEIT now.

So, in which port could we access our app when deployed to ZEIT now?
      `
    },

    {
      id: 'zeit-now-port-443',
      type: 'text',
      points: 5,
      text: `
## ZEIT will always use 443

Actually, even if you start your app on port 8000, once deployed to now, you can access it with port 443 (the default port for "https" websites).

That's a feature of ▲ZEIT now. You only need to start your app on any port you like. ▲ZEIT now will map it to port 443 always.
      `
    },

    {
      id: 'build-your-app-locally',
      type: 'text',
      points: 10,
      text: `
## Build Your App Locally

▲ZEIT now will detect the \`npm build\` script and build it inside it's build infrastructure.

But, not every hosting providers have something like that.
In that case, you can build your app locally with:

~~~bash
npm run build
~~~

Then deploy the app with the \`.next\` directory.
      `
    },

    {
      id: 'deploy-with-a-custom-server',
      type: 'text',
      points: 20,
      text: `
## Deploying an app with a custom server

The app we just deployed doesn't use a custom server code. But if we have that, how can we deploy it?

So, checkout the following branch:

~~~bash
git checkout .
git checkout clean-urls-ssr
~~~

In that, we use a custom server to run our app, so add Express into your app:

~~~bash
npm install --save express
~~~

### Build the app

Even for that, you can build your app with the next build. So add the following npm script for that:

~~~json
"scripts": {
  "build": "next build"
}
~~~

### Start the app

We need to create our custom server code to mention that this is a production app. For that, have a look at this code from our server.js

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

Have a look at the line below:

~~~js
const dev = process.env.NODE_ENV !== 'production'
~~~

So, we can start our app like this for production:

~~~bash
NODE_ENV=production node server.js
~~~

So, our “npm start” script will be like this:

~~~json
"scripts": {
   "start": "NODE_ENV=production node server.js"
}
~~~

That's all you have to do.
      `
    },

    {
      id: 'finally',
      type: 'text',
      points: 5,
      text: `
## Finally

Now you know almost everything about deploying a Next.js app.

You can also learn more about [deploying Next.js](https://github.com/zeit/next.js#production-deployment) from our docs.

If you have any questions regarding deployments, feel free to ping us on [Slack](https://zeit.chat/) or submit an [issue](https://github.com/zeit/next.js/issues).
      `
    }
  ]
}
