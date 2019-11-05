import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import App from './App'

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Exo+2&display=swap');

    html,
    body {
        margin: 0;
        padding: 0;
        font-family: 'Exo 2', sans-serif;
    }
`

ReactDOM.render(
    <>
        <GlobalStyle />
        <App />
    </>,
    document.getElementById('app')
)
