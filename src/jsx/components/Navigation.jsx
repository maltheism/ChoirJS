import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {defineMessages, FormattedMessage} from 'react-intl';

import {AppContext} from '../contexts/AppContext';

const Link = styled.div`
    color: #fff;
    
    &:hover {
        color: #fff;
        cursor: pointer;
        text-decoration: underline;
    }
`;

class Navigation extends Component {

    static contextType = AppContext;

    static propTypes = {
        list: PropTypes.array,
        index: PropTypes.number,
        setNavigateIndex: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            index: this.props.index,
            selected: this.props.list.length > 0 ? this.props.list[this.props.index] : 0
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(text) {
        if (this.state.index !== this.state.list.indexOf(text)) {
            this.state.setNavigateIndex(
                this.state.list.indexOf(text)
            );
            this.setState({
                index: this.state.list.indexOf(text),
                selected: text
            });
        }
    }

    componentDidMount() {
        this.setState({setNavigateIndex: this.context.setNavigateIndex});
    }

    render() {
        const messages = defineMessages({
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
        });

        let list = [];
        for (const item in this.state.list) {
            if (this.state.list.hasOwnProperty(item)) {
                const active = this.state.index === parseInt(item) ?
                    ' active btn-danger nounderline cursordefault' : '';
                list.push(
                    <Link key={'navigation_' + item}
                          onClick={() => this.handleChange(this.state.list[item])}
                          className={'flex-sm-fill text-sm-center nav-link' + active}
                    >
                        <FormattedMessage
                            key={(this.state.list[item]).replace(/\s+/g, '-').toLowerCase()}
                            {...messages[(this.state.list[item]).replace(/\s+/g, '-').toLowerCase()]}
                        />
                    </Link>
                )
            }
        }

        return (
            <nav className='nav nav-pills flex-column flex-sm-row'
                 style={{background: '#822422'}}
            >
                {list}
            </nav>
        );
    }
}

export default Navigation;