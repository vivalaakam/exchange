import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import SelectCardValue from './SelectCardValue'

const UL = styled.ul`
    list-style-type: none;
    margin: 0px;
    padding: 0px;
`;

export default function SelectCard({ currencies, children, onChange, getValueFor }) {
    const [active, setActive] = useState(false)

    const onClick = useCallback(() => {
        setActive(!active)
    })

    const onChangeLocal = useCallback((value) => {
        onChange(value)
        setActive(false)
    })

    if (!active) {
        return (
            <div onClick={onClick}>
                {children}
            </div>
        )
    }

    return (
        <div onClick={onClick}>
            {children}
            <UL>
                {currencies.map(currency => (
                    <SelectCardValue
                        key={currency}
                        currency={currency}
                        onClick={onChangeLocal}
                        getValueFor={getValueFor}
                    />))}
            </UL>
        </div>
    )
}