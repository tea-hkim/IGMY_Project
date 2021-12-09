import styled from 'styled-components';
import { mainPink, palePink } from './color';

export const NavBox = styled.div`
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  right: 0;
  position: fixed;
  z-index: 2;
  padding: 0.625rem 15vw 0.625rem 0;
  svg {
    cursor: pointer;
  }
`;

export const MenuBox = styled.nav`
  background-color: white;
  border-left: 1px solid ${palePink};
  width: 20vw;
  height: 100vh;
  display: flex;
  position: fixed;
  z-index: 3;
  top: 0;
  right: ${(props) => (props.active ? '0' : '-100%')};
  transition: 800ms;
`;

export const MenuBoxContent = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0;
  padding: 0.938rem;
  width: 100%;
  list-style: none;
  div {
    width: 100%;
  }
  a {
    text-decoration: none;
    width: 100%;
  }
  .navTogle {
    cursor: pointer;
    display: flex;
    justify-content: start;
  }
  h3 {
    width: 100%;
    padding-bottom: 10px;
    font-size: 1.563rem;
    border-bottom: 3px solid ${mainPink};
    margin: 1rem 0;
  }
`;
export const ContentBox = styled.div`
  display: flex;
  height: 40%;
  flex-direction: column;
  font-size: 1.125rem;
  font-weight: 600;
  li {
    width: 100%;
    height: 18%;
    border-radius: 5px;
    background-color: ${palePink};
    margin-bottom: 0.938rem;
    &:hover {
      background-color: ${mainPink};
      transform: scale(1.02);
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
  button {
    cursor: pointer;
    height: 15%;
    width: 100%;
    font-size: 1.125rem;
    font-weight: 600;
    outline: none;
    border-radius: 5px;
    border: none;
    background-color: blue;
    color: white;

    &:hover {
      transform: scale(1.02);
    }
  }
`;
