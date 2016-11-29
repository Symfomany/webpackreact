# React Project Seed

Demo d'une App avec  **React + Flux + Webpack**

![enter image description here](http://no-kill-switch.ghost.io/content/images/2015/06/react.png)

![enter image description here](https://camo.githubusercontent.com/ebc085019011ababb0d35024824304831c7dc72a/68747470733a2f2f7765627061636b2e6769746875622e696f2f6173736574732f6c6f676f2e706e67)

![enter image description here](http://seanamarasinghe.com/wp-content/uploads/2016/04/eslint-1050x360.jpg)

## All NPM scripts

* `npm start` - Build and start the app in dev mode at http://localhost:8000
* `npm run build` - Run a production build



## Code

### Writing components:

```js
// Filename: Menu.jsx

'use strict';

import styles from './_Menu.scss';
import React from 'react';
import MenuItem from './MenuItem';

let { Component, PropTypes } = React;

export default class Menu extends Component {

  static defaultProps = {
    items: []
  };

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return (
      <ul className={styles.menu}>
        {this.props.items.map((item) => {
          return (<MenuItem item={item} />);
        }, this)}
      </ul>
    );
  }
}
```

## Sass, CSS & webpack

`import` Sass and CSS files from within your JavaScript component files:

```js
// Filename: app.jsx
import 'normalize.css/normalize.css';
import styles from './scss/app.scss';
```

* **Note:** If you're importing component Sass files from within your JavaScript component files, then each sass file will be compiled as part of a different compile process, and thus you cannot share global references. 
* Sass include paths can be adjusted in the `webpack/loaders.js` file.
* All CSS (compiled or otherwise) is run through Autoprefixer and style-loader. Any images/fonts etc referenced in the CSS will be copied to the build dir.
* CSS files are combined in the order in which they are imported in JavaScript, thus
you should always import your CSS/Sass before importing any other JavaScript files.
* If not using local CSS, use an approach like [BEM](http://cssguidelin.es/#bem-like-naming) to avoid specificity
issues that might exist due to unpredicatable order of CSS rules.

## HTML files

All required `.html` files are compiled with lodash.template and synced into the `./build` directory:

```js
// Filename: app.jsx
import './index.html';
```

* You can adjust the lodash template data in the `webpack/loaders.js` file.

## Conventions in JS

* Use fat arrows for anonymous functions
* Don't use `var`. Use `let` and `const`.


## License

Copyright (c) 2016 Boyer Julien

MIT (http://opensource.org/licenses/MIT)
