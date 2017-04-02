module.exports = {
  name: 'Getting Started',
  intro: `
It's no secret that creating single-page JavaScript applications can be pretty challenging these days. Fortunately, there are some projects available which simplify things and help you build apps faster.

[Create React App](https://github.com/facebookincubator/create-react-app) is a very good example of that.

Even still, there's a high learning curve before you can build a proper application. That's because you need to learn about client-side routing, page layout, and so on. If you'd like to perform server-side rendering for faster page loads, things can become even more difficult.

**So, we need something simple but customizable.**

Think about how webapps are created with PHP. You create some files, write PHP code, then simply deploy it. We don't have to worry about routing much, and the app is rendered on the server by default.

<img width="112" alt="Next.js Logo" src="https://cloud.githubusercontent.com/assets/50838/24116055/7076ba9c-0dcb-11e7-93d0-ba8f9ac8f6e4.png">

That's exactly what we do with [Next.js](https://github.com/zeit/next.js). Instead of PHP, we build the app with JavaScript and React. Here are some other cool features Next.js brings to the table:

  * Server-rendered by default
  * Automatic code splitting for faster page loads
  * Simple client-side routing (page based)
  * Webpack-based dev environment which supports [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) (HMR)
  * Able to implement with Express or any other Node.js HTTP server
  * Customizable with your own Babel and Webpack configurations

Sounds great, right?
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

Next.js works with Windows, Mac and Linux alike. You only need to have Node.js installed on your system to begin building Next.js applications.

Besides that you need to have a text editor to write code, and a Terminal application to invoke some commands.


> If you are on Windows, try to use PowerShell.
> Next.js works with any shell or terminal, but we'll be using some UNIX-specific commands in this guide.
> We recommend using PowerShell to make it easy to follow along.


To start, create a sample project by running the following commands:

~~~sh
mkdir hello-next
cd hello-next
npm init -y
npm install --save react react-dom next
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

What's the output you see on the screen?
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
## Creating Our First Page

Now let's create our first page.

Create a file named \`pages/index.js\` and add the following content:

~~~js
const Index = () => (
  <div>
    <p>Hello Next.js</p>
  </div>
)

export default Index
~~~

Now if you visit [http://localhost:3000](http://localhost:3000/) again, you'll see a page with "Hello Next.js"

Here, we've exported a simple React Component from the \`pages/index.js\` module. Likewise, you could write your own React component and export it.


> Make sure your React Component is the **default** export.


Now try to prompt a syntax error in your Index page. Here's an example:
(We have simply removed the **&#x3C;/p&#x3E;** HTML tag)

~~~js
const Index = () => (
  <div>
    <p>Hello Next.js
  </div>
)

export default Index
~~~

What will happen to the app loaded at [http://localhost:3000](http://localhost:3000/)?
      `,
    },

    {
      id: 'errors',
      type: 'text',
      points: 5,
      text: `
## Handling Errors

By default, Next.js will track errors like these and show it in the browser. This helps you identify errors and fix them quickly.

Once you fix the issue, the page will appear instantly without a full page reload. We do this with the help of Webpack's [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) facility, which is supported in Next.js by default.
      `
    },

    {
      id: 'finally',
      type: 'text',
      points: 5,
      text: `
## You are Awesome

Seems like you've built your first Next.js app! What do you think?
If you like it, let's dive deeper.

If not, just let us know.
You can post an [issue](https://github.com/zeit/next.js/issues) on our [GitHub repo](https://github.com/zeit/next.js) or on our [Slack channel](https://zeit.chat/), #next.
      `
    }
  ]
}
