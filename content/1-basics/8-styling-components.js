module.exports = {
  name: "Styling Components",
  intro: `
Until now, styling components were largely an afterthought. But your app deserves some style.

For a React app, there are many different techniques that we can use to style it, and those can be categorized into two broad methods:

1. Traditional CSS-file-based styling (including SASS, PostCSS etc)
2. [CSS in Js](https://github.com/MicheleBertoli/css-in-js) styling

Consequently, there are a bunch of practical issues to consider with traditional CSS-file-based styling (especially with SSR), so we suggest avoiding this method when styling for Next.js.

Instead we recommend CSS in JS, which you can use to style individual components rather than importing CSS files.

Next.js comes preloaded with a CSS in JS framework called [styled-jsx](https://github.com/zeit/styled-jsx), specifically designed to make your life easier. It allows you to write familiar CSS rules for your components; rules will have no impact on anything other than the components (not even child components).

> That means, your CSS rules are scoped.

Let's see how we can use styled-jsx.
  `,
  steps: [
    {
      id: 'setup',
      type: 'text',
      points: 5,
      text: `
## Setup

In order to follow this lesson, you will need to have a simple Next.js app. For that, you can download the following example app:

~~~bash
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout clean-urls-ssr-markdown
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
      id: 'styling-our-home-page',
      type: 'mcq',
      points: 35,
      answers: [
        'Nothing has changed',
        'New styles are gone',
        'Shows an error on the page: “SyntaxError: Unexpected token”',
        'Shows an error on the page: “Invalid styles provided”'
      ],
      correctAnswer: 'Shows an error on the page: “SyntaxError: Unexpected token”',
      text: `
## Styling our home page

Now let's add some styles into our home page. (\`pages/index.js\`)

Simply replace \`pages/index.js\` with the following code:

~~~js
import Layout from '../components/MyLayout.js'
import Link from 'next/link'

function getPosts () {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js'},
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome'},
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT'},
  ]
}

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      {getPosts().map((post) => (
        <li key={post.id}>
          <Link as={\`/p/\${post.id}\`} href={\`/post?title=\${post.title}\`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
    <style jsx>{\`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    \`}</style>
  </Layout>
)
~~~

Have a look at the \`<style jsx>\` element. This is where we write our CSS rules.

After you have replaced this code, our blog's home page will look like this:

![](https://cloud.githubusercontent.com/assets/50838/25552915/f18f2f12-2c5a-11e7-97aa-4b9d4b9f95a7.png)

In the above code, we did  not write styles directly inside of the style tag; rather, it was written inside of a template string.

Now try to write CSS directly without a template string (\`{\`\`}\`). Like this:

~~~js
<style jsx>
  h1, a {
    font-family: "Arial";
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
    margin: 5px 0;
  }

  a {
    text-decoration: none;
    color: blue;
  }

  a:hover {
    opacity: 0.6;
  }
</style>
~~~

What will happen?
      `
    },

    {
      id: 'styles-template-strings',
      type: 'text',
      points: 5,
      text: `
## Styles should go inside template strings

Styled jsx works as a babel plugin. It will parse all of the CSS and apply it in the build process. (With that our styles get applied without any overhead time)

It also supports having constraints inside styled-jsx. In the future, you will be able to use any dynamic variable inside styled-jsx. That is why CSS needs to go inside of a template string. (\`{\`\`}\`)
      `
    },

    {
      id: 'styles-and-nested-components',
      type: 'mcq',
      points: 25,
      answers: [
        'Nothing has changed',
        'Styles for h1 exists but not for links',
        'There is an error on the page',
        'There is an error on the console'
      ],
      correctAnswer: 'Styles for h1 exists but not for links',
      text: `
## Styles and Nested Components

Now let's add a simple change to our home page. We have isolated our link component like this:

~~~js
import Layout from '../components/MyLayout.js'
import Link from 'next/link'

function getPosts () {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js'},
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome'},
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT'},
  ]
}

const PostLink = ({ post }) => (
  <li>
    <Link as={\`/p/\${post.id}\`} href={\`/post?title=\${post.title}\`}>
      <a>{post.title}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      {getPosts().map((post) => (
        <PostLink key={post.id} post={post}/>
      ))}
    </ul>
    <style jsx>{\`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    \`}</style>
  </Layout>
)
~~~

Replace the above content in \`pages/index.js\`

What will happen?
      `
    },

    {
      id: 'no-effect-for-nested-components',
      type: 'text',
      points: 15,
      text: `
## No Effect for Nested Component

This is what you've seen:

![](https://cloud.githubusercontent.com/assets/50838/25552972/6becac5c-2c5c-11e7-9fce-61cdc207a10d.png)

As you have witnessed, CSS rules have no effect on elements inside of a child component.

This feature of styled-jsx helps you to manage styles for bigger apps.

In that case, you need to style the child component directly. And in our particular case, we need to do this for our Link component:

~~~js
const PostLink = ({ post }) => (
  <li>
    <Link as={\`/p/\${post.id}\`} href={\`/post?title=\${post.title}\`}>
      <a>{post.title}</a>
    </Link>
    <style jsx>{\`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    \`}</style>
  </li>
)
~~~

> Otherwise, you could use [global selectors](https://github.com/zeit/styled-jsx#global-selectors).
      `
    },

    {
      id: 'global-styles',
      type: 'mcq',
      points: 20,
      answers: [
        'Nothing has changed',
        'Styles get applied to the markdown content',
        'Error on the page',
        'Error on the console'
      ],
      correctAnswer: 'Styles get applied to the markdown content',
      text: `
## Global Styles

Sometimes, we do need to change styles inside of a child component. This is especially true when using markdown with React. You can see that on our post page. (\`pages/post.js\`)

This is where global styles come in handy. Now try to add some global style rules with styled-jsx. Apply the following content to pages/post.js.

~~~js
import Layout from '../components/MyLayout.js'
import Markdown from '../components/Markdown'

export default (props) => (
  <Layout>
   <h1>{props.url.query.title}</h1>
   <div className="markdown">
     <Markdown content={\`
This is out blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
     \`}/>
   </div>
   <style jsx global>{\`
     .markdown {
       font-family: 'Arial';
     }

     .markdown a {
       text-decoration: none;
       color: blue;
     }

     .markdown a:hover {
       opacity: 0.6;
     }

     .markdown h3 {
       margin: 0;
       padding: 0;
       text-transform: uppercase;
     }
  \`}</style>
  </Layout>
)
~~~

What will happen?
      `
    },

    {
      id: 'global-styles-work',
      type: 'text',
      points: 10,
      text: `
## Global Styles Work

Yep that worked well. It worked, because our styles applied globally.

While this feature can be incredibly handy, we always recommend trying to write scoped styles (without the global prop).

Still, this is a great solution over normal style tags. With styled-jsx all necessary prefixing and CSS validation is done inside a babel plugin, so there is no additional runtime overhead.
      `
    },

    {
      id: 'what-next',
      type: 'text',
      points: 10,
      text: `
## What Next

We have just scratched the surface with styled-jsx here, and there is a lot more that you can do. Refer to the [styled-jsx](https://github.com/zeit/styled-jsx) GitHub repo for more info.

There are a number of [other styling solutions](https://github.com/zeit/next.js#css-in-js) for Next.js that are pretty good, so have a look at them too.
      `
    }
  ]
}
