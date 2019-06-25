import React, { Component } from 'react';
import styled from 'styled-components';

const Main = styled.div`
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

class MainContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Main>
                {this.props.children}
            </Main>
        );
    }
}

export default MainContainer;