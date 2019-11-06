jest.mock(
    './ExchangeService',
    () => () => ({
        ratio(from, to) {
            return {
                'GBP_USD': 0.7751642812134305,
                'USD_GBP': 1.2900491215031413,
                'EUR_GBP': 1.1612648496742652,
                'GBP_EUR': 0.86113,
                'EUR_USD': 0.9001710324961743,
                'USD_EUR': 1.1109
            }[`${from}_${to}`]
        }
    }),
    { virtual: true },
);
import { reducer } from './Exchange'

const defaultState = {
    from: 'EUR',
    to: 'USD',
    ratio: 0.9001710324961743,
    fromValue: '10',
    toValue: '11.11'
}

test('reducer RATIO = 2', () => {
    expect(reducer(defaultState, {
        type: 'RATIO',
        payload: 0.91
    })).toEqual({ ...defaultState, ratio: 0.91, toValue: '10.98' });
});

test('reducer FROM = GBP', () => {
    expect(reducer(defaultState, {
        type: 'FROM',
        payload: 'GBP'
    })).toEqual({
        ...defaultState,
        ratio: 0.7751642812134305,
        from: 'GBP',
        fromValue: '8.61'
    });
})

test('reducer TO = GBP', () => {
    expect(reducer(defaultState, {
        type: 'TO',
        payload: 'GBP'
    })).toEqual({
        ...defaultState,
        ratio: 1.1612648496742652,
        to: 'GBP',
        toValue: '8.61'
    });
})

test('reducer FROM_VALUE = 15', () => {
    expect(reducer(defaultState, {
        type: 'FROM_VALUE',
        payload: 15
    })).toEqual({
        ...defaultState,
        fromValue: '15',
        toValue: '16.66'
    });
})

test('reducer TO_VALUE = 15', () => {
    expect(reducer(defaultState, {
        type: 'TO_VALUE',
        payload: 15
    })).toEqual({
        ...defaultState,
        fromValue: '13.50',
        toValue: '15'
    });
})

test('reducer ERROR', () => {
    try {
        reducer(defaultState, {
            type: 'ERROR'
        })
    } catch (e) {
        expect(e.message).toBe("");
    }
})