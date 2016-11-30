import './favicon.ico';
import './index.html';
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';
import './scss/app.scss';

import React from 'react';
// import { render } from 'react-dom';
import App from './components/App/App';

/**
 * Load default App in Root
 */
React.render(
    <App />,
    document.getElementById('app')
);
