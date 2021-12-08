import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  background-color: white;
  height: 10vh;
  padding: 0.625rem 0;
  padding-left: 15vw;
  a {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      height: 70%;
      margin: 0 1rem;
    }
    h2 {
      font-size: 2rem;
    }
  }
`;
