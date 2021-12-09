import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        background-color: #b2acfa;
        font-family: 'Gmarket_Medium';
    }
    
    a {
        text-decoration: none;
    }
`;

export default GlobalStyle;
