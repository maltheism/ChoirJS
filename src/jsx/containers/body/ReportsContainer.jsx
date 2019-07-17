import React, { Component } from 'react';
import styled from 'styled-components';
import {AppContext} from '../../contexts/AppContext';

const Reports = styled.div`
    z-index: 2;
    flex: 1 0 auto;
    overflow: auto;
    min-height: 500px;
    position: relative;
    width: calc(100vw);
    height: calc(100vh);
    background-color: #fff;
`;

class ReportsContainer extends Component {

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
                        context.navigateIndex === 2 ? (
                            <Reports>
                                Reports panel.
                            </Reports>
                        ) : null
                    )}
                }
            </AppContext.Consumer>
        );
    }
}

export default ReportsContainer;