import styled from 'styled-components';
import { mainPink } from './color';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  > h2 {
    font-size: 2rem;
    margin: 0 0 4vh;
  }
  > div {
    cursor: pointer;
  }
`;
export const Box = styled.div`
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  place-items: center;
  width: 50vh;
  height: 50vh;
  border: 20px solid ${mainPink};
  border-radius: 10px;
`;

export const Circle = styled.div`
  display: grid;
  place-items: center;
  background-color: ${mainPink};
  border-radius: 50%;
  width: 70%;
  height: 70%;
  box-shadow: 3px 2px 10px 3px gray;
`;

export const Giyeog = styled.div`
  display: grid;
  place-items: center;
  border-top: 20px solid blue;
  border-right: 20px solid blue;
  opacity: 0.5;
  width: 50%;
  height: 50%;
`;

export const Square = styled.div`
  display: grid;
  place-items: center;
  border: 20px solid red;
  opacity: 0.5;
  border-radius: 20px;
  width: 50%;
  height: 50%;
`;
