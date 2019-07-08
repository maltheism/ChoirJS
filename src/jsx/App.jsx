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
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import translations from '../translations/locales';

// English and French (add more languages here)
addLocaleData(enLocaleData);
addLocaleData(frLocaleData);
const localeProp = 'en'; // change to 'fr' for displaying français.

function App() {

    const [cookies, setCookie] = useCookies(['user']);
    const [navigateIndex, setNavigateIndex] = useState(0);

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
        <FooterContainer/>
    );

    if (getSession(cookies.session)) {
        return (
            <AppContext.Provider value={{
                numbers: ['4', '2', '0'],
                letters: ['a', 'l', 'i', 'z', 'e', 'e'],
                navigateIndex: navigateIndex,
                setNavigateIndex: (index) => {
                    setNavigateIndex(index);
                }
            }
            }>
                <div>
                    {header}
                    {main}
                    {footer}
                </div>
            </AppContext.Provider>
        );
    } {
        return (
            <AuthenticationContainer/>
        )
    }
}

const wrapper = document.getElementById('create-app-main');
ReactDOM.render(
    <IntlProvider
        locale={localeProp}
        defaultLocale="en"
        key={localeProp}
        messages={translations[localeProp]}
    >
        <App />
    </IntlProvider>,
    wrapper
);

export default App;