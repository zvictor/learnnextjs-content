module.exports = {
  name: 'Getting Started',
  intro: `
It's not a secret that creating client-side JavaScript is pretty difficult these days. Fortunately, there are some projects which simplify things and help you build apps faster.

[Create React App](https://github.com/facebookincubator/create-react-app) is a very good example of that.

But still, there's a big learning curve before you can build a proper app. That's because you need to learn about routing, state management etc. If you need to do server side rendering for faster page loads, things will get pretty difficult.

**So, we need something simple.**

Just think about how we created webapps with PHP in the early days. We just created some pages and wrote PHP code. Then, we simply deployed it. We didn't need to worry about routing much and the app was server rendered by default.

<img width="112" alt="Next.js Logo" src="https://cloud.githubusercontent.com/assets/50838/24116055/7076ba9c-0dcb-11e7-93d0-ba8f9ac8f6e4.png">

That's exactly what we are doing with [Next.js](https://github.com/zeit/next.js). Instead of  PHP, you create the app with JavaScript and React. Here are some other cool features Next.js brings to the table:

  * Server Rendered by default.
  * Automatic Code Splitting for faster page loads
  * Simple Client Side Routing (page based)
  * Hot code reloading dev environment
  * Embed with Express or any other Node.js HTTP Server
  * Customize with Custom Babel and Webpack configurations

Let's give it a try.
  `,

  steps: [
    {
      id: 'setup',
      type: 'mcq',
      points: 20,
      answers: [
        'Error No Page Found',
        '404 - This page could not be found',
        'Hello Next.js',
        'Hello World'
      ],
      correctAnswer: '404 - This page could not be found',
      text: `
## Setup

Next.js works with Windows, Mac and Linux alike. You just only need to have Node.js installed in your system.

Besides that, you need to have Text Editor to write code and a Terminal to invoke some commands.


> If you are on Windows, try to use PowerShell.
> Next.js works with any shell or a terminal. But we use some unix specific commands in this guide.
> That's why we need to use PowerShell in Windows.


First of all, create a sample project by running the following commands:

~~~sh
mkdir hello-next
cd hello-next
npm init -y
npm install --save next@beta react react-dom
mkdir pages
~~~

Then open the "package.json" in the hello-next directory and add the following NPM script.

~~~json
{
  "scripts": {
    "dev": "next"
  }
}
~~~

Now everything is ready. Run the following command to start the dev server:

~~~sh
npm run dev
~~~

Then open [http://localhost:3000](http://localhost:3000/) from your favourite browser.

What's the output you see on the Screen?
`
    },


    {
      id: '404-page',
      type: 'text',
      points: 5,
      text: `
## 404 Page

You'll see a 404 page like this:

![Next.js 404 Page](https://cloud.githubusercontent.com/assets/50838/24114002/ac4786f2-0dc4-11e7-8d84-b6f33c8f9aae.png)
      `
    },

    {
      id: 'first-page',
      type: 'mcq',
      points: 20,
      answers: [
        'Nothing happened',
        'There\'s an error with page not found',
        'There\'s an error showing the syntax error',
        'There\'s an error with 500 - Internal Error'
      ],
      correctAnswer: 'There\'s an error showing the syntax error',
      text: `
## Creating our First Page

Now let's create our first page.

Create a file called \`pages/index.js\` and add following content.

~~~js
const Index = () => (
  <div>
    <p>Hello Next.js</p>
  </div>
)

export default Index
~~~

Now if you visit [http://localhost:3000](http://localhost:3000/) again, you'll see a page with "Hello Next.js"

Here, we've exported a simple React Component from the "index.js" module. Likewise, you could write your own React component and export it.


> Make sure your React Component is the **default** export.


Now try to make a syntax error in our Index page. Here's an example:
(We have simply removed the "
" HTML tag)

~~~js
const Index = () => (
  <div>
    <p>Hello Next.js
  </div>
)

export default Index
~~~

What'll happen to the app loaded at [http://localhost:3000](http://localhost:3000/)?
      `,
    },

    {
      id: 'errors',
      type: 'text',
      points: 5,
      text: `
## Handling Errors

By default, Next.js will track errors like these and show it on the browser. That'll help you to identify errors and fix them quickly.

Once you simply fix the issue, the page will appear instantly without a full page reload. We do it with the help of Webpack's [hot code replacement](https://webpack.js.org/concepts/hot-module-replacement/) facility. We support it by default.
      `
    },

    {
      id: 'finally',
      type: 'text',
      points: 5,
      text: `
## You are Awesome

Seems like you've built your first Next.js  app. What do you think?
If you like it, let's dive deeper.

If not, just let us know.
You can post an [issue](https://github.com/zeit/next.js/issues) on our [GitHub repo](https://github.com/zeit/next.js) or on our [Slack channel](https://zeit.chat/) #next.
      `
    }
  ]
}
