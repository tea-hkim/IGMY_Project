import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after{
        box-sizing: border-box;
    }

    body {
        background-color: #b2acfa;
        font-family: 'Gmarket_Medium';
    }
`;

export default GlobalStyle;
