import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    body {
        background: rgb(255,228,186);
        background: -moz-linear-gradient(0deg, rgba(255,228,186,1) 0%, rgba(174,222,211,1) 4%, rgba(178,172,250,1) 29%);
        background: -webkit-linear-gradient(0deg, rgba(255,228,186,1) 0%, rgba(174,222,211,1) 4%, rgba(178,172,250,1) 29%);
        background: linear-gradient(0deg, rgba(255,228,186,1) 0%, rgba(174,222,211,1) 4%, rgba(178,172,250,1) 29%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffe4ba",endColorstr="#b2acfa",GradientType=1);
        font-family: 'Gmarket_Medium';
    }
    
    a {
        text-decoration: none;
    }
`;

export default GlobalStyle;
