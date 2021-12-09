import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mainPink } from '../styles/color';

function WhiteNavbar() {
  return (
    <WhiteBox className="white_navbar_box">
      <Link to="/">
        <img src="images/logo.png" alt="머슴러닝 로고" />
        <h2>이게모약</h2>
      </Link>
    </WhiteBox>
  );
}

export default WhiteNavbar;

const WhiteBox = styled.div`
  position: fixed;
  width: 100vw;
  height: 10vh;
  z-index: 1;
  background-color: white;
  padding: 0.625rem 15vw;
  a {
    height: 100%;
    width: 30%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      height: 60%;
      margin: 0 1rem;
    }
    h2 {
      font-size: 2rem;
      color: ${mainPink};
    }
  }
`;
