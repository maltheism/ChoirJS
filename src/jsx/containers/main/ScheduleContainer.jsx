import React, { Component } from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';

import {AppContext} from '../../contexts/AppContext';

const Schedule = styled.div`
    z-index: 2;
    flex: 1 0 auto;
    overflow: auto;
    min-height: 500px;
    position: relative;
    width: calc(100vw);
    height: calc(100vh);
    background-color: #fff;
`;

class ScheduleContainer extends Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.context);
    }

    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    return (
                        context.navigateIndex === 0 ? (
                            <Schedule>
                                <FormattedMessage id='app.title' defaultMessage='Schedule panel.' />
                            </Schedule>
                        ) : null
                    )}
                }
            </AppContext.Consumer>
        );
    }
}

export default ScheduleContainer;