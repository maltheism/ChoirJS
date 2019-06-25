import 'jquery'
import 'popper.js'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';

import App from './jsx/App';

import { CookiesProvider } from 'react-cookie';

export default function Root() {
    return (
        <CookiesProvider>
            <App />
        </CookiesProvider>
    );
}

// import AppContainer from './jsx/containers/AppContainer.jsx';