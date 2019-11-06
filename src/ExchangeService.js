import { EventEmitter } from 'fbemitter'

export class ExchangeService extends EventEmitter {
    constructor(currencies) {
        super()
        this._base = 'EUR'
        this._symbols = currencies.filter(c => c !== this._base)

        this.resp = { "base": "EUR", "rates": { "GBP": 1, "USD": 1 } }
    }

    subscribe() {
        this.interval = setInterval(this.fetchAndUpdateData, 10000)
    }

    unsubscribe() {
        clearInterval(this.interval)
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

export default function getSingleton() {
    if (!ExchangeService._singleton) {
        ExchangeService._singleton = new ExchangeService(['EUR', 'USD', 'GBP'])

        ExchangeService._singleton.fetchAndUpdateData().then(() => {
            ExchangeService._singleton.subscribe()
        })

        //     ExchangeService._singleton.resp = { "base": "EUR", "rates": { "GBP": 3, "USD": 2 } }

        //     ExchangeService._singleton.emit('updated', ExchangeService._singleton.resp)
    }

    return ExchangeService._singleton
}