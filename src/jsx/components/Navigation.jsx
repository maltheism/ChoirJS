import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

    handleChange(event) {
        if (this.state.index !== this.state.list.indexOf(event.target.innerText)) {
            this.state.setNavigateIndex(
                this.state.list.indexOf(event.target.innerText)
            );
            this.setState({
                index: this.state.list.indexOf(event.target.innerText),
                selected: event.target.innerText
            });
        }
    }

    componentDidMount() {
        this.setState({setNavigateIndex: this.context.setNavigateIndex});
    }

    render() {

        let list = [];
        for (const item in this.state.list) {
            if (this.state.list.hasOwnProperty(item)) {
                const active = this.state.index === parseInt(item) ? ' active btn-danger nounderline cursordefault' : '';
                list.push(
                    <Link key={'navigation_' + item}
                          onClick={this.handleChange}
                          className={'flex-sm-fill text-sm-center nav-link' + active}
                    >
                        {this.state.list[item]}
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