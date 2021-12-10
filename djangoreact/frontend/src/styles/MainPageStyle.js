import styled from 'styled-components';
import { mainPink, lightYellow, lightGreen } from './color';

export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  > h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: white;
  }
  div {
    transition: 500ms;
  }
`;
export const Box = styled.div`
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  place-items: center;
  width: 55vh;
  height: 55vh;
  border: 30px solid white;
  border-radius: 15%;
  div {
    cursor: pointer;
  }
`;

export const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 75%;
  height: 75%;

  img {
    width: 100%;
  }
  div {
    display: none;
  }

  :hover {
    background-color: white;
    box-shadow: 3px 2px 10px 3px gray;
    img {
      display: none;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 1.25rem;
      font-weight: 600;
      color: ${mainPink};
      svg {
        margin-bottom: 5px;
      }
    }
  }
`;

export const OtherThings = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => {
    if (props.team) {
      return `
        border-top: 25px solid ${lightYellow};
        border-right: 25px solid ${lightYellow};

        width: 55%;
        height: 55%;
      `;
    }
    return `
      border: 25px solid ${lightGreen};
      border-radius: 15%;

      width: 60%;
      height: 60%;
    `;
  }}

  div {
    display: none;
  }

  :hover {
    width: 75%;
    height: 75%;

    border: none;
    border-radius: 50%;
    background-color: ${(props) => (props.team ? lightYellow : lightGreen)};
    div {
      display: flex;
      font-size: 1.563rem;
      font-weight: 600;
    }
  }
`;
