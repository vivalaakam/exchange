const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('public'))
} else {
    const proxy = require('express-http-proxy')
    app.use(
        '/',
        proxy('http://localhost:3001/', {
            proxyReqPathResolver: req =>
                'http://localhost:3001/' + req.url,
        })
    )

    app.use('/sockjs-node', proxy('ws://localhost:3001/sockjs-node'))
}


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(3000, function () {
    console.log('Listening on port 3000!')
})