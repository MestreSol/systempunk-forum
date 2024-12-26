import { createGlobalStyle } from "styled-components";
import Theme from "./Theme";

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: ${Theme.fontFamily.primary};
    }
`;
