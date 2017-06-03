module.exports = {
  name: 'Navigate Between Pages',
  intro: `
Now we know how to create a simple Next.js app and run it. Our simple app only had a single page, but we can add as many pages as we want. For example, we can create an "About" page by adding the following content to \`pages/about.js\`:

~~~js
export default () => (
  <div>
    <p>This is the about page</p>
  </div>
)
~~~

Then we can access that page with http://localhost:3000/about.

After that, we need to connect these pages. We could use an HTML "a" tag for that. However, it won't perform client-side navigation; it navigates to the page via the server, which is not what we want.

In order to support client-side navigation, we need to use Next.js's Link API, which is exported via \`next/link\`.

Let's see how to use it.
  `,

  steps: [
    {
      id: 'setup',
      type: 'text',
      points: 5,
      text: `
## Setup

In order to follow along with this lesson, you need to have a simple Next.js app. For that, continue your work from the previous lesson or download the following example app:

~~~bash
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout getting-started
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
      id: 'using-link',
      type: 'mcq',
      points: 25,
      answers: [
        'Back button didn\'t work.',
        'Back button threw an error on the browser console.',
        'It navigated the page to the index (home) page via the client side.',
        'It popped up an alert saying, "import \'next/back\' to support back button".'
      ],
      correctAnswer: 'It navigated the page to the index (home) page via the client side.',
      text: `
## Using Link

Now we are going to use \`next/link\` to link our two pages.

Add the following code into \`pages/index.js\`

~~~js
// This is the Link API
import Link from 'next/link'

const Index = () => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
)

export default Index
~~~

Here we've imported \`next/link\` as \`Link\` and use it like this:

~~~js
<Link href="/about">
  <a>About Page</a>
</Link>
~~~

Now try to visit http://localhost:3000/

Then click the "About Page" link. It will navigate you to the "About" page.

> This is client-side navigation; the action takes place in the browser, without making a request to the server.
> You can verify this by opening your browser's network request inspector.


Okay, now we have a simple task for you:

* Visit http://localhost:3000/
* Then click the "About Page"
* Then hit your browser's Back button

How would you best describe the experience of the Back button?
      `
    },

    {
      id: 'client-side-history',
      points: 5,
      type: 'text',
      text: `
## Client-Side History Support

When you hit the Back button, it navigates the page to the index page entirely via the client; \`next/link\` does all the [\`location.history\`](https://developer.mozilla.org/en-US/docs/Web/API/History_API) handling for you.

You don't need to write even a single line of client-side routing code.

Simply link pages; it just works!
    `
  },

  {
    id: 'styling-a-link',
    type: 'mcq',
    points: 15,
    answers: [
      'It applied the style correctly as expected.',
      'It didn\'t do anything to the link\'s style.',
      'It applied the style after a full page reload.',
      'It applied the style, but with a warning in the console.'
    ],
    correctAnswer: 'It didn\'t do anything to the link\'s style.',
    text: `
## Styling a Link

Most of the time, we may want to style our links. This is how we can do it:

~~~js
<Link href="/about">
  <a style={{ fontSize: 20 }}>About Page</a>
</Link>
~~~

Once we add this, you can see the style applied correctly.

How about doing this instead?

~~~js
<Link href="/about" style={{ fontSize: 20 }}>
  <a>About Page</a>
</Link>
~~~

What has happened with the above code change?
    `
  },

  {
    id: 'hoc',
    type: 'text',
    points: 5,
    text: `
## Link is Just a Higher Order Component (HOC)

Actually, the style prop on \`next/link\` has no effect. That's because \`next/link\` is just a [higher order component](https://facebook.github.io/react/docs/higher-order-components.html) which only accepts the "href" and some similar props. If you need to style it, you need to do it to the underlying component.

In this case, it's our anchor.
    `
  },

  {
    id: 'link-with-a-button',
    type: 'mcq',
    points: 20,
    answers: [
      'It does nothing.',
      'It throws an error saying "button is not allowed inside link".',
      'It reloads the page.',
      'It navigates the page to the about page.'
    ],
    correctAnswer: 'It navigates the page to the about page.',
    text: `
## Link With a Button

Let's say that we need to use a "button" instead of an anchor for our link. Then we need to edit our navigation code like this:

~~~js
<Link href="/about">
  <button>Go to About Page</button>
</Link>
~~~

What will happen when you click the button on the index page?
    `
  },

  {
    id: 'works-with-anything',
    points: 5,
    type: 'text',
    text: `
## Link Works With Anything

Just like a button, you can place any of your custom React components or even a \`div\` within a Link.

The only requirement for components placed inside a Link is they should accept an \`onClick\` prop.
    `
  },

  {
    id: 'simple-but-powerful',
    points: 5,
    type: 'text',
    text: `
## Link is Simple, but Powerful

Here we've only looked at the very basic usage of \`next/link\`. There are some interesting ways to use it, and we'll learn about them in upcoming lessons.

In the meantime, have a look at the [Next.js Routing documentation](https://github.com/zeit/next.js#routing). You'll find it useful.
    `
  }
  ]
}
