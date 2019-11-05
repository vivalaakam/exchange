import React from 'react'
import styled from 'styled-components'
import Exchange from './Echange';

const Wrapper = styled.div`
    max-width: 800px;
    padding: 0px 15px;
    margin: 0 auto;
`;

export default function App() {
    return (
        <Wrapper>
            <Exchange />
        </Wrapper>
    )
}