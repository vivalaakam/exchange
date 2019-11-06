import React, { useEffect, useReducer, useCallback } from 'react'
import styled from 'styled-components'
import Card from './Card'
import getSingleton from './ExchangeService'
import SelectCard from './SelectCard'
import { format } from './utils'

const service = getSingleton()

export function reducer(state, action) {
    switch (action.type) {
        case 'RATIO':
            if (state.fromValue !== '') {
                const fromValue = parseFloat(String(state.fromValue).replace(/ /, ''))
                return {
                    ...state,
                    ratio: action.payload,
                    toValue: format(fromValue / action.payload)
                };
            }
            return { ...state, ratio: action.payload };
        case 'FROM': {
            const toValue = parseFloat(String(state.toValue).replace(/ /, ''))
            const ratio = service.ratio(action.payload, state.to);
            return {
                ...state,
                ratio,
                from: action.payload,
                fromValue: format(toValue * ratio)
            };
        }
        case 'TO': {
            const fromValue = parseFloat(String(state.fromValue).replace(/ /, ''))
            const ratio = service.ratio(state.from, action.payload);
            return {
                ...state,
                ratio,
                to: action.payload,
                toValue: format(fromValue / ratio)
            };
        }
        case 'FROM_VALUE': {
            const payload = parseFloat(String(action.payload).replace(/ /, ''))

            return {
                ...state,
                fromValue: format(action.payload),
                toValue: format(payload / state.ratio)
            }
        }
        case 'TO_VALUE': {
            const payload = parseFloat(String(action.payload).replace(/ /, ''))

            return {
                ...state,
                toValue: format(action.payload),
                fromValue: format(payload * state.ratio)
            }
        }
        default:
            throw new Error();
    }
}

const Wrapper = styled.div`
    display:flex

    @media screen and (max-width: 800px) {
        flex-direction: column;
    }
`;

const Separator = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 800px) {
        height: 10px;
        align-items: flex-start;
    }
`;

const Triangle = styled.div`
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid gray;
    border-bottom: 10px solid transparent;

    @media screen and (max-width: 800px) {
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid gray;
    }
`;

const Ratio = styled.div`
    padding: 5px;
`;

export default function Exchange() {
    const [state, dispatch] = useReducer(reducer, {
        from: 'EUR',
        to: 'USD',
        ratio: service.ratio('EUR', 'USD'),
        value: 0,
        fromValue: '',
        toValue: ''
    });

    useEffect(() => {
        const subscription = service.addListener('updated', () => {
            const ratio = service.ratio(state.from, state.to)
            if (ratio !== state.ratio) {
                dispatch({
                    type: 'RATIO',
                    payload: ratio
                })
            }
        })

        return () => {
            service.removeListener(subscription)
        }
    }, [])

    const from = useCallback((e) => {
        dispatch({ type: 'FROM_VALUE', payload: e.target.value })
    })

    const to = useCallback((e) => {
        dispatch({ type: 'TO_VALUE', payload: e.target.value })
    })

    const onChangeFrom = useCallback((currency) => {
        dispatch({ type: 'FROM', payload: currency })
    })

    const onChangeTo = useCallback((currency) => {
        dispatch({ type: 'TO', payload: currency })
    })

    const getValueFrom = (currency) => {
        if (state.toValue === '') {
            return ''
        }
        const ratio = service.ratio(currency, state.to)

        return `-${format(state.toValue * ratio)}`
    }

    const getValueTo = (currency) => {
        if (state.fromValue === '') {
            return ''
        }
        const ratio = service.ratio(state.from, currency)

        return `+${format(state.fromValue / ratio)}`
    }

    return (
        <>
            <Ratio>Current ratio {state.from} -> {state.to}: {state.ratio.toFixed(5)}</Ratio>
            <Wrapper>
                <SelectCard
                    currencies={['EUR', 'USD', 'GBP']}
                    onChange={onChangeFrom}
                    getValueFor={getValueFrom}
                >
                    <Card
                        currency={state.from}
                        onChange={from}
                        value={state.fromValue}
                        sign="-"
                    />
                </SelectCard>
                <Separator>
                    <Triangle />
                </Separator>
                <SelectCard
                    currencies={['EUR', 'USD', 'GBP']}
                    onChange={onChangeTo}
                    getValueFor={getValueTo}
                >
                    <Card
                        currency={state.to}
                        onChange={to}
                        value={state.toValue}
                        sign="+"
                    />
                </SelectCard>
            </Wrapper>
        </>
    )
}