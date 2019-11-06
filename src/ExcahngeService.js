import { EventEmitter } from 'fbemitter'

class ExchangeService extends EventEmitter {
    static defaults = new ExchangeService(['EUR', 'USD', 'GBP'])

    constructor(currencies) {
        super()
        this._base = 'EUR'
        this._symbols = currencies.filter(c => c !== this._base)

        this.resp = { "base": "EUR", "rates": { "GBP": 1, "USD": 1 } }

        this.subscribe()
        this.fetchAndUpdateData()
    }

    subscribe() {
        // this.interval = setInterval(this.fetchAndUpdateData, 10000)
    }

    unsubscribe() {
        // clearInterval(this.interval)
    }

    fetchAndUpdateData = () => {
        return fetch(`https://api.ratesapi.io/api/latest?base=${this._base}&symbols=${this._symbols.join(',')}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.resp = data
                this.emit('updated', this.resp)
            })
    }

    ratio(from, to) {
        if (from === to) {
            return 1
        }

        if (from === this._base) {
            return 1 / this.resp.rates[to]
        }

        if (to === this._base) {
            return this.resp.rates[from]
        }

        return this.resp.rates[from] * (1 / this.resp.rates[to])
    }
}

export default ExchangeService.defaults