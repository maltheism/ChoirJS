import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {useCookies} from 'react-cookie';
import {AppContext} from './contexts/AppContext';

import MainContainer from './containers/MainContainer';
import HeaderContainer from './containers/HeaderContainer';
import FooterContainer from './containers/FooterContainer';

import Navigation from './components/Navigation';

import ScheduleContainer from './containers/main/ScheduleContainer';
import PatientContainer from './containers/main/PatientContainer';
import ReportsContainer from './containers/main/ReportsContainer';
import SiteAdministratorContainer from './containers/main/SiteAdministratorContainer';
import ImportExportContainer from './containers/main/ImportExportContainer';
import RegisterPatientContainer from './containers/main/RegisterPatientContainer';
import UserAdministrationContainer from './containers/main/UserAdministrationContainer';

import AuthenticationContainer from './containers/AuthenticationContainer';

// Multiple Language Support
import {addLocaleData, IntlProvider} from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import translations from '../translations/locales';

// English and French (add more languages here)
addLocaleData(enLocaleData);
addLocaleData(frLocaleData);

function App() {

    const [cookies, setCookie] = useCookies(['user']); // login cookie.
    const [navigateIndex, setNavigateIndex] = useState(0); // navigation (main panel) index.
    const [languageKey, setLanguageKey] = useState('en'); // 'fr' for displaying français.

    console.log('Cookie Data:');
    console.log(cookies);

    function onChange(user) {
        setCookie('user', user, { path: '/' });
    }

    const getSession = (obj) => {
        if (obj === undefined || obj === null) return false;
        return Object.entries(obj).length !== 0 && obj.constructor === Object;
    };

    const header = (
        <HeaderContainer
            session={cookies.session ?? null}
            language={languageKey}
            onChange={onChange}
        />
    );

    const main = (
        <MainContainer>
            <Navigation
                list={[
                    'Schedule',
                    'Patient',
                    'Reports',
                    'Site Administrator',
                    'Import/Export',
                    'Register Patient',
                    'User Administration',
                ]}
                index={navigateIndex}
            />
            <ScheduleContainer/>
            <PatientContainer/>
            <ReportsContainer/>
            <SiteAdministratorContainer/>
            <ImportExportContainer/>
            <RegisterPatientContainer/>
            <UserAdministrationContainer/>
        </MainContainer>
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
                defaultLocale='en'
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
                    }
                }
                }>
                    <div>
                        {header}
                        {main}
                        {footer}
                    </div>
                </AppContext.Provider>
            </IntlProvider>
        );
    } {
        return (
            <AuthenticationContainer/>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('create-app-main')
);

export default App;