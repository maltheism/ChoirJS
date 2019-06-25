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
wrapper ? ReactDOM.render(<App />, wrapper) : false;

export default App;