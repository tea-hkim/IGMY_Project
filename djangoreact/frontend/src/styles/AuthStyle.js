import styled from 'styled-components';
import { mainPink, palePink, warningSign } from './color';

const loginWidth = '80%';
const loginheight = '2rem';
const marginBottom = '0.625rem';

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 25%;
  margin: 0 auto;
  padding: 1.563rem 0;
  border: 0.125rem solid ${mainPink};
  border-radius: 1.25rem;
  text-align: center;
`;

export const AuthTitle = styled.h1`
  text-align: start;
  font-size: 2.2rem;
  width: ${loginWidth};
  margin: ${marginBottom} auto;
`;

export const LineBox = styled.div`
  position: relative;
  width: ${loginWidth};
  margin: 0 auto ${marginBottom};
  display: flex;
  justify-content: center;
`;
export const Or = styled.div`
  background-color: white;
  width: 30%;
  font-size: 1rem;
  font-weight: 500;
`;
export const Line = styled.div`
  position: absolute;
  border-top: 2px dotted black;
  width: 100%;
  top: 50%;
  z-index: -1;
`;

export const Button = styled.button`
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  width: ${loginWidth};
  margin: 0 auto 1.25rem;
  padding: 0.313rem;
  border: none;
  border-radius: 10px;
  position: relative;
  color: black;
  font-size: 20px;
  cursor: pointer;
  background-color: ${(props) => {
    if (props.className === 'unactiveBtn') {
      return 'lightgrey';
    }
    return mainPink;
  }};
  > img {
    position: absolute;
    left: 0.25em;
    height: ${loginheight};
    padding: 0;
    margin: 0;
  }
`;

export const KakaoBox = styled.div`
  width: ${loginWidth};
  margin: 0 auto;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  > div {
    margin: ${marginBottom} auto;
    width: ${loginWidth};
    > input {
      box-sizing: border-box;
      padding: 0.625rem;
      width: 100%;
      border: 0.125rem solid ${palePink};
      border-radius: 10px;
      &:focus {
        outline: 0.125rem solid ${mainPink};
        background-color: rgba(225, 193, 241, 0.2);
      }
    }
    > h3 {
      width: ${loginWidth};
      text-align: start;
      margin-bottom: ${marginBottom};
    }
  }
`;

export const AuthFooterBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${loginWidth};
  margin: 0 auto ${marginBottom};
`;

export const AuthFooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${marginBottom} 0;
`;

export const ValidMessage = styled.p`
  width: ${loginWidth};
  margin: 0 auto ${marginBottom};
  color: ${warningSign};
  font-size: 0.9rem;
  font-weight: 700;
`;
