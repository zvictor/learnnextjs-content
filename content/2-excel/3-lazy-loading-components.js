module.exports = {
  name: 'Lazy Loading Components',
  intro: `
We use a lot of React components in our applications. We include them in our main JavaScript bundle (\`app.js\`) or in one of the page's JavaScript bundles. Sometimes some of these components are pretty big.

For example, this a pretty simple blog site we built with Next.js based on markdown.

![](https://user-images.githubusercontent.com/50838/28258427-ca01153c-6aee-11e7-8974-69ad7609ed2b.png)

It also supports syntax highlighting. For that, we use [react-highlight](https://github.com/akiran/react-highlight), and it's a pretty big module.

> Actually, the \`react-highlight\` module itself is very small but the [highlight.js](https://github.com/isagalaev/highlight.js/) module used inside that is bulky.

Here's how we use it.

~~~jsx
import Highlight from 'react-highlight'

// some other code

<div>
  <Highlight innerHTML>
    {marked(blogPostMarkdown)}
  </Highlight>
</div>

// some other code
~~~

Since it's used in almost all of the pages, \`react-highlight\` is included in our main JavaScript bundle.

But we don't need to use the syntax highlighter on every page. It's only needed when there's a code sample in the blog post.

So, if we can load react-highlight only when needed, that will reduce the initial app bundle dramatically, and that will help our app load faster.

This is something we can do with Next.js (since version 3.0).
Let's get started.
  `,
  steps: [
    {
      id: 'setup',
      type: 'text',
      points: 5,
      text: `
## Setup

Let's download the sample blog app we are going to use in this lesson:

~~~sh
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout markdown-blog
~~~

Then you can run the app with:

~~~sh
npm install
npm run dev
~~~

Now visit <http://localhost:3000> and try out the app.
      `
    },

    {
      id: 'lets-analyze',
      type: 'mcq',
      points: 15,
      answers: [
        'main.js',
        'commons.js',
        'app.js',
        'pages/post.js'
      ],
      correctAnswer: 'commons.js',
      text: `
## Let's Analyze

Before we do anything else, let's analyze our app's JavaScript bundles.
For that, simply run the following command:

~~~sh
npm run analyze
~~~

After the command completes, you can see the results in the web browser.
What is the bundle where the \`highlight.js\` module exists?
      `
    },

    {
      id: 'analyze-result',
      type: 'text',
      points: 5,
      text: `
## Analyze Result

As you have seen, it's included in the \`commons.js\` bundle. That's because it's used in almost every page in our blog app.

![](https://user-images.githubusercontent.com/50838/28258431-ca80888a-6aee-11e7-9f38-5d27fee0d649.png)

In this result page, we can't even see the \`react-highlight\` module. That's because it's pretty small. The module \`highlight.js\`, which is used inside it, is the heavy module.
      `
    },

    {
      id: 'hello-dynamic-components',
      type: 'mcq',
      points: 25,
      answers: [
        'No, since that page doesn\'t have any code snippet.',
        'No. It throws an error: `Unwanted bundle.`',
        'Yes.',
        'Yes. But with a warning: `Unwanted bundle loaded.`'
      ],
      correctAnswer: 'Yes.',
      text: `
## Hello Dynamic Components

In this app, we've isolated markdown rendering into a React [Higher Order Component](https://facebook.github.io/react/docs/higher-order-components.html) (HOC).
It's located at \`lib/with-post.js\`. Here's the content of that file:

~~~js
import React from 'react'
import MyLayout from '../components/MyLayout'
import marked from 'marked'
import Highlight from 'react-highlight'

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true
})

export default function WithPost (options) {
  return class PostPage extends React.Component {
    render () {
      return (
        <MyLayout>
          <h1>{options.title}</h1>
          <div>
            <Highlight innerHTML>
              {marked(options.content)}
            </Highlight>
          </div>
        </MyLayout>
      )
    }
  }
}
~~~

You can visit \`pages/p/hello-nextjs.js\` and see how we are using this HOC.

---

Now we are trying to convert the above \`Highlight\` component into a **dynamic component**. Dynamic components are powered by the [dynamic imports](https://github.com/zeit/next.js#dynamic-import) in Next.js.

Most importantly, these components will be loaded only when they are about to rendered in your app.

Creating a dynamic component is simple. You can use the [\`next/dynamic\`](https://github.com/zeit/next.js#dynamic-import) utility. Here's how you can convert \`Highlight\` into a dynamic component.

~~~js
//import Highlight from 'react-highlight'
import dynamic from 'next/dynamic'

const Highlight = dynamic(import('react-highlight'))
~~~

That's all you have to do.
Apply the above code change in \`lib/with-post.js\`.

Then try to start your app again and access http://localhost:3000/p/hello-nextjs. You'll be able to see \`react-highlight\` loaded as a separate bundle.

![](https://user-images.githubusercontent.com/50838/28258428-ca7e1a96-6aee-11e7-95b8-ea7874649771.png)

Now try to visit http://localhost:3000/p/learn-nextjs and see whether it loads the \`react-highlight\` bundle.

Select the correct statement regarding \`react-highlight\` bundle based on what you've experienced.
      `
    },

    {
      id: 'it-always-loads',
      type: 'text',
      points: 5,
      text: `
## It Always Loads

As you've seen, the \`react-highlight\` bundle loads even for the page http://localhost:3000/p/hello-nextjs which doesn't have any code samples.

![](https://user-images.githubusercontent.com/50838/28258429-ca7e452a-6aee-11e7-8b4f-7168a237f676.png)

It loaded \`react-highlight\` because we asked it to load each and every time.
You can see that by looking at \`lib/with-load.js\`. Here's the related code block:

~~~js
export default function WithPost (options) {
  return class PostPage extends React.Component {
    render () {
      return (
        <MyLayout>
          <h1>{options.title}</h1>
          <div>
            <Highlight innerHTML>
              {marked(options.content)}
            </Highlight>
          </div>
        </MyLayout>
      )
    }
  }
}
~~~

We've always used the \`Highlight\` component whether \`options.content\` has any code snippet or not.
      `
    },

    {
      id: 'load-only-if-needed',
      type: 'mcq',
      points: 25,
      answers: [
        'It doesn\'t load the bundle at all. Then it throws an error when trying to visit the second page.',
        'It doesn\'t load the bundle at all. It loads the second page, but there\'s no syntax highlighting.',
        'It doesn\'t load the bundle for the first page. Then it loads it for the second page.',
        'It loads the bundle for the first page, and everything works great.'
      ],
      correctAnswer: 'It doesn\'t load the bundle for the first page. Then it loads it for the second page.',
      text: `
## Load Only If Needed

Now we are trying to use the \`Highlight\` component only when it's needed.

This is the modified \`WithPost\` HOC which uses the \`Highlight\` component only when needed.

~~~js
export default function WithPost (options) {
  return class PostPage extends React.Component {
    renderMarkdown () {
      // If a code snippet contains in the markdown content
      // then use Highlight component
      if (/~~~/.test(options.content)) {
        return (
          <div>
            <Highlight innerHTML>
              {marked(options.content)}
            </Highlight>
          </div>
        )
      }

      // If not, simply render the generated HTML from markdown
      return (
        <div
          dangerouslySetInnerHTML={{__html: marked(options.content)}}
        />
      )
    }

    render () {
      return (
        <MyLayout>
          <h1>{options.title}</h1>
          { this.renderMarkdown() }
        </MyLayout>
      )
    }
  }
}
~~~

Try to apply the above change to \`lib/with-post.js\` and start your app again.

Then visit http://localhost:3000/p/learn-nextjs. The app won't download the react-highlight bundle.
But if you visit http://localhost:3000/p/hello-nextjs, it will download the bundle.

---

Now we have a simple task for you. Run your app in production mode with:

~~~sh
npm run build
npm run start
~~~

Open a blank page in Chrome with "Network Inspect" selected in the dev console.

Then visit <http://localhost:3000/>.
After the page loads, click “Hello Next.js” title.

Select the correct statement regarding the \`react-highlight\` bundle based on what you experienced:
      `
    },

    {
      id: 'lazy-loading',
      type: 'text',
      points: 5,
      text: `
As you've seen, the app will download \`react-highlight\` in the client side when it's needed. That's the whole purpose of dynamic components. While it's loading, it will show a loading component.

You can also set a [custom loading component](https://github.com/zeit/next.js#2-with-custom-loading-component) if needed.

### Direct Visit

If you directly visit a page that contains a code snippet (such as http://localhost:3000/p/hello-nextjs), that's a special case. Then the app will load the component in the server side, and it includes the bundle with the initial HTML.

You can verify that by looking into the HTML content of the above-mentioned page.

![](https://user-images.githubusercontent.com/50838/28258430-ca7e91d8-6aee-11e7-8b23-6744d9033b7c.png)
      `
    },

    {
      id: 'finally',
      type: 'text',
      points: 5,
      text: `
## Finally

Lazy loading dynamic components are pretty important for a high performing app. It allows you to load components whenever you need to. If you do this wisely, you can reduce the amount of JavaScript that needs to be downloaded and make your app load faster.

Next.js supports server-side rendering (SSR) for these dynamic components by default. So, you don't lose anything by using dynamic components.

We've only used the basic functionality of dynamic components. You can learn more about them by referring to [documentation](https://github.com/zeit/next.js#dynamic-import).
      `
    }
  ]
}
