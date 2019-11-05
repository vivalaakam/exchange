module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        require('@babel/plugin-proposal-class-properties'),
        require('@babel/plugin-proposal-object-rest-spread'),
        require('@babel/plugin-syntax-dynamic-import'),
        [
            '@babel/plugin-transform-runtime',
            {
                regenerator: true
            }
        ]
    ]
}
