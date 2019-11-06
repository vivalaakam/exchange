
import React, { useCallback } from 'react'
import styled from 'styled-components'

const LI = styled.li`
    padding: 5px;
    margin: 5px;
    background-color: gray;
    border-radius: 5px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    &:hover {
        cursor: pointer;
        color: rgba(255,255,255,.8);
    }
`;

export default function SelectCardValue({ currency, onClick, getValueFor }) {
    const onClickLocal = useCallback(() => {
        onClick(currency)
    }, [])

    return (
        <LI onClick={onClickLocal}>
            <span>{currency}</span> <span>{getValueFor(currency)}</span>
        </LI>
    )
}