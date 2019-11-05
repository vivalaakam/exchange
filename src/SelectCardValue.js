
import React, { useCallback } from 'react'
import styled from 'styled-components'

const LI = styled.li`
    padding: 5px;
    margin: 5px;
    background-color: gray;
    border-radius: 5px;
    color: #fff;
    &:hover {
        cursor: pointer;
        color: rgba(255,255,255,.8);
    }
`;

export default function SelectCardValue({ value, onClick }) {
    const onClickLocal = useCallback(() => {
        onClick(value)
    })

    return (
        <LI onClick={onClickLocal}>
            {value}
        </LI>
    )
}