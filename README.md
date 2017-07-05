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
