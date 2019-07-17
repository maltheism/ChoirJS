import React, { Component } from 'react';
import styled from 'styled-components';
import {AppContext} from '../../contexts/AppContext';

const SiteAdministrator = styled.div`
    z-index: 2;
    flex: 1 0 auto;
    overflow: auto;
    min-height: 500px;
    position: relative;
    width: calc(100vw);
    height: calc(100vh);
    background-color: #fff;
`;

class SiteAdministratorContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    return (
                        context.navigateIndex === 3 ? (
                            <SiteAdministrator>
                                Site Administrator panel.
                            </SiteAdministrator>
                        ) : null
                    )}
                }
            </AppContext.Consumer>
        );
    }
}

export default SiteAdministratorContainer;