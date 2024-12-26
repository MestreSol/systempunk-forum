import { createGlobalStyle } from 'styled-components'
import Theme from './Theme'

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    overflow-x: hidden;

    }

    body {
        margin: 0;
        padding: 0;
        font-family: ${Theme.fontFamily.primary};
        background-color: #1e1e1e;
    }
`
