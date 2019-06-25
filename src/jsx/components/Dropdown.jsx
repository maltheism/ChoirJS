import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
    static propTypes = {
        list: PropTypes.array,
        index: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            index: this.props.index,
            selected: this.props.list.length > 0 ? this.props.list[0] : ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            index: this.state.list.indexOf(event.target.innerText),
            selected: event.target.innerText
        });
    }

    render() {

        let list = [];
        for (const item in this.state.list) {
            if (this.state.list.hasOwnProperty(item)) {
                list.push(
                    <a key={'dropdown_' + item}
                       className={'dropdown-item'}
                       style={{cursor: 'pointer'}}
                       onClick={this.handleChange}>
                        {this.state.list[item]}
                    </a>
                )
            }
        }

        return (
            <div className={'dropdown'}>
                <button type={'button'}
                        className={'btn btn-danger dropdown-toggle'}
                        style={{minWidth: '290px'}}
                        data-toggle={'dropdown'}
                >
                    {this.state.selected}
                </button>
                <div className={'dropdown-menu'}>
                    {list}
                </div>
            </div>
        );
    }
}

export default Dropdown;