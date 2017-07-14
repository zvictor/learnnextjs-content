module.exports = {
  name: 'Using Shared Components',
  intro: `
We know that Next.js is all about pages. We can create a page by exporting a React component, and putting that component inside the \`pages\` directory. Then it will have a fixed URL based on the file name.

Since exported pages are JavaScript modules, we can import other JavaScript components into them as well.

> This is a feature you'd expect from any JavaScript framework.

In this lesson, we'll create a common Header component and use it in multiple pages. Finally, we'll look at implementing a Layout component and see how it can help us define the look for multiple pages.

Let's get started.
  `,
  steps: [
    {
      id: 'setup',
      type: 'text',
      points: 5,
      text: `
## Setup

In this lesson, we need a simple Next.js app to play with. Try downloading the following example app:

~~~bash
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout navigate-between-pages
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
      id: 'create-the-header-component',
      type: 'text',
      points: 10,
      text: `
## Create the Header Component

Let's create a Header component for our app.
Add the following to the file \`components/Header.js\`.

~~~js
import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>About</a>
        </Link>
    </div>
)

export default Header
~~~

This component contains two links to the pages available in our app. We've also styled the link a bit to make it easy to visualize.
      `
    },

    {
      id: 'using-the-header-component',
      type: 'mcq',
      points: 25,
      answers: [
        'Yes.',
        'No. It will throw an error: “Component not found.”',
        'No. It will throw an error: “Component needs to be in the components directory.”',
        'No. It will throw an error: “comps is an invalid directory.”'
      ],
      correctAnswer: 'Yes.',
      text: `
## Using the Header Component

Next, let's import this component and use it in our pages. For the \`index.js\` page, it will look like this:

~~~js
import Header from '../components/Header'

export default () => (
  <div>
    <Header />
    <p>Hello Next.js</p>
  </div>
)
~~~

You can do the same for the  about.js page as well.

At this point, if you navigate to your app at http://localhost:3000/  you'll be able to see the new Header and navigate between pages.

![](https://cloud.githubusercontent.com/assets/50838/24333679/fa856f00-1279-11e7-931d-a5707e51a801.gif)


---

Let's try to make some simple modifications to our application.

* Stop the running app.
* Rename the \`components\` directory to \`comps\`.
* Import the Header from \`../comps/Header\` instead of \`../components/Header\`.
* Start the app again.

Will it work?
      `
    },

    {
      id: 'the-component-directory',
      type: 'text',
      points: 5,
      text: `
## The Component Directory

Yes. It will work as expected.

We don't need to put our components in a special directory; the directory can be named anything. The only special directory is the \`pages\` directory.

You can even create the Component inside the \`pages\` directory.

Here we didn't do that because we don't need a direct URL to our Header component.
      `
    },

    {
      id: 'the-layout-component',
      type: 'mcq',
      points: 20,
      answers: [
        'There will be no effect.',
        'The content of the page being displayed will be removed.',
        'It will throw an error saying: “Layout needs some content.”',
        'It will log a warning message for the browser component.'
      ],
      correctAnswer: 'The content of the page being displayed will be removed.',
      text: `
## The Layout Component

In our app, we'll use a common style across various pages. For this purpose, we can create a common Layout component and use it for each of our pages. Here's an example:

Add this content to \`components/MyLayout.js\`:

~~~js
import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)

export default Layout
~~~

Once we've done that, we can use this Layout in our pages as follows:

~~~js
// pages/index.js

import Layout from '../components/MyLayout.js'

export default () => (
    <Layout>
       <p>Hello Next.js</p>
    </Layout>
)
~~~

~~~js
// pages/about.js

import Layout from '../components/MyLayout.js'

export default () => (
    <Layout>
       <p>This is the about page</p>
    </Layout>
)
~~~

Remember, you can access the app at http://localhost:3000/ to see what it looks like.

Now let's try removing \`{props.children}\` from the Layout and see what happens to the app.

What will happen to the app?
      `
    },

    {
      id: 'rendering-children-components',
      type: 'text',
      points: 5,
      text: `
## Rendering Child Components

If you remove \`{props.children}\`, the Layout cannot render the content we put inside the \`Layout\` element, as shown below:

~~~js
export default () => (
    <Layout>
       <p>This is the about page</p>
    </Layout>
)
~~~

This is just one way to create a Layout component. Here are some other methods of creating a Layout component:

~~~js
import withLayout from '../lib/layout'

const Page = () => (
  <p>This is the about page</p>
)

export default withLayout(Page)
~~~

~~~js
const Page = () => (
  <p>This is the about page</p>
)

export default () => (<Layout page={Page}/>)
~~~

~~~js
const content = (<p>This is the about page</p>)

export default () => (<Layout content={content}/>)
~~~
      `
    },

    {
      id: 'use-components',
      type: 'text',
      points: 5,
      text: `
## Using Components

We've mentioned two use cases for shared components:

1. As common header components.
2. As Layouts.

You can use components for styling, page layouts, and any other tasks you like. Additionally, you can import components from NPM modules and use them.
      `
    }
  ]
}
