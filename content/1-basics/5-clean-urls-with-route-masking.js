module.exports = {
  name: 'Clean URLs with Route Masking',
  intro: `
In the previous lesson, we learned how to create dynamic pages with query strings.
With that, a link to one of our blog posts looks like this:

http://localhost:3000/post?title=Hello%20Next.js

But that URL doesn't look nice.
How about if we had something like this?

http://localhost:3000/p/hello-nextjs

![](https://cloud.githubusercontent.com/assets/50838/24586820/b65be244-17c6-11e7-87fd-d6880152261e.png)
It would be awesome, right?
That's exactly what we are trying to do with this lesson.
  `,
  steps: [
    {
      id: 'setup',
      type: 'text',
      points: 5,
      text: `
## Setup

First of all, we need a simple Next.js app to play with. Try to download the following example app:

~~~sh
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout create-dynamic-pages
~~~

You can run it with:

~~~sh
npm install
npm run dev
~~~

Now you can access the app by navigating to http://localhost:3000/.
      `
    },

    {
      id: 'route-masking',
      type: 'mcq',
      points: 25,
      answers: [
        'It throws an error.',
        'It goes back to the index page and navigates again to the post page.',
        'It goes back to the index page but nothing happens after that.',
        'It goes back to the index page then throws an error.'
      ],
      correctAnswer: 'It goes back to the index page and navigates again to the post page.',
      text: `
## Route Masking

Here, we are going to use a unique feature of Next.js called route masking. Basically, it will show a different URL on the browser than the actual URL that your app sees.

Let's add a route mask to our blog post URL.

Use the following code for the \`pages/index.js\`:

~~~js
import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const PostLink = (props) => (
  <li>
    <Link as={\`/p/\${props.id}\`} href={\`/post?title=\${props.title}\`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      <PostLink id="hello-nextjs" title="Hello Next.js"/>
      <PostLink id="learn-nextjs" title="Learn Next.js is awesome"/>
      <PostLink id="deploy-nextjs" title="Deploy apps with Zeit"/>
    </ul>
  </Layout>
)
~~~

Have look at the following code block:

~~~js
const PostLink = (props) => (
  <li>
    <Link as={\`/p/\${props.id}\`} href={\`/post?title=\${props.title}\`}>
      <a>{props.title}</a>
    </Link>
  </li>
)
~~~

In the \`<Link>\` element, we have used another prop called “as”. That's the URL which we need to show on the browser. The URL your app sees is mentioned in the “href” prop.

---

Now try to click on the first blog post and you'll be navigated to the blog post.

After that, hit the **back** button and then hit the **forward** button. What will happen?
      `
    },

    {
      id: 'history-awareness',
      type: 'text',
      points: 5,
      text: `
## History Awareness

As you have witnessed, route masking works pretty nicely with the browser history.
All you have to do is just add the “as” prop for the link.
      `
    },

    {
      id: 'reload',
      type: 'mcq',
      points: 25,
      answers: [
        'The page will render the first blog post as expected.',
        'It won\'t load the page, but keep loading continuously.',
        'It will throw a 500 error.',
        'It will throw a 404 error.'
      ],
      correctAnswer: 'It will throw a 404 error.',
      text: `
## Reload

Now go to the home page: http://localhost:3000/
Then click on the first post title. You'll be navigated to the post page.

![](https://cloud.githubusercontent.com/assets/50838/24586820/b65be244-17c6-11e7-87fd-d6880152261e.png)

Then reload the browser. What will happen?
      `
    },

    {
      id: '404',
      type: 'text',
      points: 5,
      text: `
## 404

It gives us a 404 error. That's because there is no such page to load on the server.
The server will try to load the page \`p/hello-nextjs\`, but we only have two pages: \`index.js\` and \`post.js\`.

With this, we can't run this app in production. We need to fix this.

**Next.js's [custom server API](https://github.com/zeit/next.js#custom-server-and-routing) is the solution for this problem.**

We are going to learn how to use it in the next lesson.
      `
    }
  ]
}
