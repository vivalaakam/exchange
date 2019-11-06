export function format(num) {
    let [main, cents] = String(num).split('.')

    main = Math.abs(main)

    if (Number.isNaN(main)) {
        return ''
    }

    if (/\./.test(String(num))) {
        cents = cents || ''

        if (cents.length > 2) {
            cents = cents.substr(0, 2)
        }

        return `${main}.${cents}`
    }

    return main
}