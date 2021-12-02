import styled from 'styled-components';
import { mainPink, palePink } from './color';

export const SearchBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 60vw;
  h2 {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 1.2;
    width: 20%;
    margin: 0;
    text-align: start;
    font-size: 2rem;
    color: ${mainPink};
  }
`;

export const NameBox = styled.div`
  display: flex;
  justify-content: space-space-evenly;
  align-items: center;
  width: 100%;
  border: 2px solid ${palePink};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 2vh 5%;
  input {
    width: 80%;
    height: 4vh;
    border: 2px solid ${palePink};
    border-radius: 5px;
    font-size: 1.25rem;
    font-weight: 700;
    margin-left: 10px;
    padding-left: 10px;
    &:focus {
      outline: 0.125rem solid ${mainPink};
      background-color: rgba(225, 193, 241, 0.2);
    }
  }
`;

export const NonNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  width: 100%;
  border: 2px solid ${palePink};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 2vh 5%;
  > div {
    margin: 10px 0;
  }
`;

export const ShapeColorBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid ${palePink};
    width: 70px;
    height: 60px;
  }
  span {
    color: ${mainPink};
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  button {
    border: 1px solid ${palePink};
    border-radius: 5px;
    background-color: ${mainPink};
    width: 20%;
    height: 2.5rem;
    font-size: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
  }
`;

export const SearchPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background-color: ${(props) => {
    if (props.className === 'checked') {
      return `${palePink}`;
    }
    return 'white';
  }};
  div {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 1px solid black;
    background-color: ${(props) => props.id};
  }
`;
