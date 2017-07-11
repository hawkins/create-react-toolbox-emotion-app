# ⚡️ create-react-toolbox-emotion-app

An example of ejecting Create React App to add support for [react-toolbox](https://github.com/react-toolbox/react-toolbox) (using CSS Modules, not [`themr`](https://github.com/react-toolbox/react-toolbox-themr)) and [⚡️emotion](https://github.com/tkh44/emotion)

## Rationale

Emotion has a great API for styling React components, not too much unlike Styled Components in some ways. However, Emotion has added composition with CSS Modules, and my favorite React component library, React Toolbox, is built with CSS Modules. So this repo serves as an example of ejecting CRA to configure Webpack for both Emotion and React Toolbox.

## Why eject?

I've found that custom `react-scripts` implementations can be decent for some use cases, but overall I prefer to simply eject and patch in newer features as needed myself.

Furthermore, some third-party implementations such as `custom-react-scripts` haven't been updated since February (as of my writing this in June 2017), while `react-scripts` has made some pretty big updates since then. To my knowledge, users would first lose out on some features added since then (I think PWA, SW support is there but I'm not positive) and they would lose the ability to stay up-to-date with CRA's features, that in my mind justify *not* ejecting in the first place. Where in contrast, they could have ejected to expose config and patched babel to add decorator support, then manually update CRA whenever they needed.

Thus, the main reasons here is keeping up-to-date with CRA's major features at the expense of some of your own development time to update dependencies instead of relying on a third-party to do this for you.

## Behind the scenes

The secret to this example is in the Webpack and babel config. I've combined emotion's suggested webpack instructions with react toolbox's.

You can browse the `package.json`'s `babel` config, `webpack.config.dev.js` and `webpack.config.prod.js` files at your own leisure to see the CSS loader configs that are relevant, but I'll outline what this means to you writing code:

- `*.css` files are interpreted as CSS Modules. This means the default styling of CRA (`App.css`) does not work out of the box, so it has been remodeled to serve as a basic CSS Modules example now.
- `*.emotion.css` files are compiled by babel with help of emotion, so they're ignored by git. Run `yarn start` to compile everything and see them, but they'll also be CSS Modules that are handled by emotion separately, so we separate them in Webpack config from normal CSS files.

## Styling in practice

Now, you can theme React Toolbox as you normally would, if you normally use CSS Modules with it (as is recommended).

For your own React components, you can style them with emotion.

Finally, you could also write your own CSS Modules and save them as `.css` files, and compose them with emotion. See [here](https://github.com/tkh44/emotion/blob/master/example/src/markdown/index.js#L8) for the emotion official example on that.

## Step-by-step instructions

1. Eject from Create React App (`yarn run eject`)
2. Install react toolbox, emotion (`yarn add react-toolbox emotion`)
3. Add emotion to babel config

```diff
  "babel": {
    "presets": [
      "react-app"
-   ]
+   ],
+   "plugins": [
+     "emotion/babel"
+   ]
  },
```
4. Prevent CSS rules from being applied to `*.emotion.css` files in both Webpack configs

```diff
{
  test: /\.css$/,
+ exclude: /\.emotion\.css$/,
  use" [
    /* ... */
  ]
}
```

5. Use React Toolbox's configuration for `css-loader` in dev config

```diff
          require.resolve('style-loader'),
-         {
-          loader: require.resolve('css-loader'),
-          options: {
-            importLoaders: 1,
-          },
-         },
+        "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
```

... and in prod config

```diff
-               {
-                 loader: require.resolve('css-loader'),
-                 options: {
-                   importLoaders: 1,
-                   minimize: true,
-                   sourceMap: true,
-                 },
-               },
+               "css-loader?minimize&sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
```

> TODO: Are string configs deprecated?

6. Add config for `*.emotion.css` files in dev config

```diff
  {
    test: /\.css$\,
    /* ... */
  },
+ {
+   test: /\.emotion\.css$/,
+   use: [
+     "style-loader",
+     "css-loader"
+   ]
+ }
```

... and in prod config

```diff
  {
    test: /\.css$\,
    /* ... */
  },
+ {
+   test: /emotion\.css$/,
+   use: ExtractTextPlugin.extract({
+     fallback: "style-loader",
+     use: {
+       loader: "css-loader",
+       options: {
+         sourceMap: true
+       }
+     }
+   })
+ }
```

7. Use CSS Modules instead of vanilla CSS in`src/App.css`

```diff
+.app {
   text-align: center;
 }

+.appLogo {
+  animation: appLogoSpin infinite 20s linear;
   height: 80px;
 }

+.appHeader {
   background-color: #222;
   height: 150px;
   padding: 20px;
   color: white;
 }

+.appIntro {
   font-size: large;
 }

+@keyframes appLogoSpin {
   from { transform: rotate(0deg); }
   to { transform: rotate(360deg); }
 }
```

... and in `src/App.js`:

```diff
 import React, { Component } from "react";
 import logo from "./logo.svg";
+import styles from "./App.css";

 class App extends Component {
   render() {
     return (
+      <div className={styles.app}>
+        <div className={styles.appHeader}>
+          <img src={logo} className={styles.appLogo} alt="logo" />
           <h2>Welcome to React</h2>
         </div>
+        <p className={styles.appIntro}>
           To get started, edit <code>src/App.js</code> and save to reload.
         </p>
       </div>
     );
   }
 }

 export default App;
```

8. Add demonstration files

`src/css/theme.css`:

```css
$color-primary: $palette-pink-700;
```

`src/reactToolboxExample.js`:

```javascript
import React from "react";
import { Button } from "react-toolbox/lib/button";

export default () => (
  <Button accent raised>
    Themed with `react-toolbox`
  </Button>
);
```

`src/emotionExample.js`:

```javascript
import React from "react";
import styled from "emotion/react";

const H1 = styled.h1`
  color: #ff4081;
`;

const Code = styled.code`
  color: rgb(35, 93, 230);
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  &:after { content: "\`" };
  &:before { content: "\`" };
`;

export default () => <H1>This was styled with <Code>emotion</Code>!</H1>;
```

include them in `src/App.js`:

```diff
 import React, { Component } from "react";
+import ThemeProvider from "react-toolbox/lib/ThemeProvider";
+import ReactToolboxExample from "./reactToolboxExample";
+import EmotionExample from "./emotionExample";
+import theme from "./css/theme.css";
 import logo from "./logo.svg";
 import styles from "./App.css";

 class App extends Component {
   render() {
     return (
+      <ThemeProvider theme={theme}>
         <div className={styles.app}>
           <div className={styles.appHeader}>
             <img src={logo} className={styles.appLogo} alt="logo" />
             <h2>Welcome to React</h2>
           </div>
           <p className={styles.appIntro}>
             To get started, edit <code>src/App.js</code> and save to reload.
           </p>

+         <ReactToolboxExample />
+         <EmotionExample />
         </div>
       </ThemeProvider>
     );
   }
 }

 export default App;
```

9. You may also want to add this line to your `.gitignore`

```
*.emotion.css
```
