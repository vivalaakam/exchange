import React from 'react'

import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 8px;
    background-color: gray;
    border-radius: 5px;
    flex: 1;
    margin: 5px;
    display: flex;
`;

const Input = styled.input`
    display: block;
    background-color: transparent;
    border: none;
    font-size: 30px;
    text-align: right;
    color: #fff;
    z-index: 1;
    width: 100%;
    border-bottom: 1px dashed rgba(255,255,255,.8);
    &:focus {
        outline: none;
    }
`;

const InputBack = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    background-color: transparent;
    border: none;
    font-size: 30px;
    text-align: right;
    color: #fff;
    width: 100%;
    &:focus {
        outline: none;
    }
`;

const Currency = styled.div`
    flex: 1;
    display: block;
    color: #fff;
    font-size: 30px;
    margin: 0;
    padding: 5px 0;
`;

const WrapInput = styled.div`
    flex: 1;
    display: flex;
    position: relative;
`;


const stop = (e) => {
    e.stopPropagation();
}
export default function Card({ currency, value, onChange, sign }) {
    return (
        <Wrapper>
            <Currency>{currency}</Currency>
            <WrapInput onClick={stop}>
                <InputBack value={value !== '' ? `${sign} ${value}` : ''} />
                <Input onChange={onChange} value={value} />
            </WrapInput>
        </Wrapper>
    )
}