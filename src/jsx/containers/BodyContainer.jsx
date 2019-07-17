import React, { Component } from 'react';
import styled from 'styled-components';

import Navigation from '../components/Navigation';

import ScheduleContainer from '../containers/body/ScheduleContainer';
import PatientContainer from '../containers/body/PatientContainer';
import ReportsContainer from '../containers/body/ReportsContainer';
import SiteAdministratorContainer from '../containers/body/SiteAdministratorContainer';
import ImportExportContainer from '../containers/body/ImportExportContainer';
import RegisterPatientContainer from '../containers/body/RegisterPatientContainer';
import UserAdministrationContainer from '../containers/body/UserAdministrationContainer';

import {defineMessages} from 'react-intl';
import PropTypes from 'prop-types';

const Body = styled.div`
    z-index: 2;
    flex: 1 0 auto;
    overflow: auto;
    min-height: 500px;
    position: relative;
    width: calc(100vw);
    height: calc(100vh);
    background-color: #fff;
    
    @media (min-width: 0px) {
        padding-top: 192px;      
    } 
    
    @media (min-width: 713px) {
        padding-top: 128px;      
    } 
    
    @media (min-width: 1032px) {
        padding-top: 70px;
    }
`;

class BodyContainer extends Component {

    static propTypes = {
        navigateIndex: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            navigateIndex: this.props.navigateIndex
        };
    }

    render() {
        return (
            <Body>
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
                    index={this.state.navigateIndex}
                    messageDescriptors={defineMessages({
                        'schedule': {
                            id: 'app.navigation.schedule',
                            defaultMessage: 'Schedule'
                        },
                        'patient': {
                            id: 'app.navigation.patient',
                            defaultMessage: 'Patient'
                        },
                        'reports': {
                            id: 'app.navigation.reports',
                            defaultMessage: 'Reports'
                        },
                        'site-administrator': {
                            id: 'app.navigation.site-administrator',
                            defaultMessage: 'Site Administrator'
                        },
                        'import/export': {
                            id: 'app.navigation.import/export',
                            defaultMessage: 'Import/Export'
                        },
                        'register-patient': {
                            id: 'app.navigation.register-patient',
                            defaultMessage: 'Register Patient'
                        },
                        'user-administration': {
                            id: 'app.navigation.user-administration',
                            defaultMessage: 'User Administration'
                        },
                    })}
                />
                <ScheduleContainer/>
                <PatientContainer/>
                <ReportsContainer/>
                <SiteAdministratorContainer/>
                <ImportExportContainer/>
                <RegisterPatientContainer/>
                <UserAdministrationContainer/>
            </Body>
        );
    }
}

export default BodyContainer;