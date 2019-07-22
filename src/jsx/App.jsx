import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {useCookies} from 'react-cookie';
import {AppContext} from './contexts/AppContext';

// Main Containers
import HeaderContainer from './containers/HeaderContainer';
import BodyContainer from './containers/BodyContainer';
import FooterContainer from './containers/FooterContainer';
import AuthenticationContainer from './containers/AuthenticationContainer';

// Multiple Language Support
import {addLocaleData, IntlProvider} from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import translations from '../translations/locales';
const defaultLanguage = 'en';

// English and French (add more languages here)
addLocaleData(enLocaleData);
addLocaleData(frLocaleData);

function App() {

    const [cookies, setCookie] = useCookies(['user', 'language']); // login cookie.
    const [navigateIndex, setNavigateIndex] = useState(0); // navigation (main panel) index.
    const [languageKey, setLanguageKey] = useState(cookies.language ?? defaultLanguage); // language key.

    const getSession = (obj) => {
        if (obj === undefined || obj === null) return false;
        return Object.entries(obj).length !== 0 && obj.constructor === Object;
    };

    console.log('Cookie Data:');
    console.log(cookies);

    const header = (
        <HeaderContainer
            session={cookies.session ?? null}
            language={languageKey}
        />
    );

    const body = (
        <BodyContainer
            navigateIndex={navigateIndex}
        />
    );

    const footer = (
        <FooterContainer
            language={languageKey}
        />
    );

    if (getSession(cookies.session)) {
        return (
            <IntlProvider
                locale={languageKey}
                defaultLocale={defaultLanguage}
                key={languageKey}
                messages={translations[languageKey]}
            >
                <AppContext.Provider value={{
                    numbers: ['4', '2', '0'],
                    letters: ['a', 'l', 'i', 'z', 'e', 'e'],
                    navigateIndex: navigateIndex,
                    setNavigateIndex: (index) => {
                        setNavigateIndex(index);
                    },
                    languageKey: languageKey,
                    setLanguageKey: (key) => {
                        setLanguageKey(key);
                        setCookie('language', key, { path: '/' });
                    }
                }
                }>
                    <div>
                        {header}
                        {body}
                        {footer}
                    </div>
                </AppContext.Provider>
            </IntlProvider>
        );
    } {
        return (
            <IntlProvider
                locale={languageKey}
                defaultLocale={defaultLanguage}
                key={languageKey}
                messages={translations[languageKey]}
            >
                <AppContext.Provider value={{
                    languageKey: languageKey,
                    setLanguageKey: (key) => {
                        setLanguageKey(key);
                        setCookie('language', key, { path: '/' });
                    }
                }
                }>
                    <AuthenticationContainer
                        language={languageKey}
                    />
                </AppContext.Provider>
            </IntlProvider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('create-app-main')
);

export default App;