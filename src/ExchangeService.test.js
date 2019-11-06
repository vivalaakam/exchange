const resp = { "base": "EUR", "rates": { "USD": 1.1109, "GBP": 0.86113 } }
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(resp) }))
const { ExchangeService } = require('./ExchangeService')
ExchangeService.prototype.emit = jest.fn()

describe('ExchangeService', () => {
    const service = new ExchangeService(['EUR', 'USD', 'GBP'])

    it('fetches data from server when server returns a successful response', done => {
        service.fetchAndUpdateData()
            .then(() => {
                expect(service.resp).toEqual(resp);
                expect(service.emit).toBeCalledWith('updated', resp)
                done()
            })
    });

    it('ratio EUR EUR', () => {
        expect(service.ratio('EUR', 'EUR')).toEqual(1)
    })

    it('ratio EUR USD', () => {
        expect(service.ratio('EUR', 'USD')).toEqual(0.9001710324961743)
    })

    it('ratio USD EUR', () => {
        expect(service.ratio('USD', 'EUR')).toEqual(1.1109)
    })

    it('ratio EUR GBP', () => {
        expect(service.ratio('EUR', 'GBP')).toEqual(1.1612648496742652)
    })

    it('ratio GBP EUR', () => {
        expect(service.ratio('GBP', 'EUR')).toEqual(0.86113)
    })

    it('ratio USD GBP', () => {
        expect(service.ratio('USD', 'GBP')).toEqual(1.2900491215031413)
    })

    it('ratio GBP USD', () => {
        expect(service.ratio('GBP', 'USD')).toEqual(0.7751642812134305)
    })
});