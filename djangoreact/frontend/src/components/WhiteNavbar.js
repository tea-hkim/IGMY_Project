import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mainPink } from '../styles/color';

function WhiteNavbar() {
  return (
    <WhiteBox className="white_navbar_box">
      <Link to="/">
        <img src="image/logo.png" alt="머슴러닝 로고" />
        <h2>이게모약</h2>
      </Link>
    </WhiteBox>
  );
}

export default WhiteNavbar;

const WhiteBox = styled.div`
  position: fixed;
  width: 100%;
  height: 8vh;
  z-index: 1;
  background-color: white;
  padding: 0.313rem 15vw;
  a {
    display: inline-block;
    height: 100%;
    width: 30%;
    display: block;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      height: 60%;
      margin-right: 0.625rem;
    }
    h2 {
      font-size: 1.875rem;
      color: ${mainPink};
      padding: 0.313rem 0 0;
    }
  }

  @media screen and (max-width: 48rem) {
    padding: 0 10vw;
    height: 8vh;
    a {
      width: 55%;
      img {
        height: 50%;
        margin-right: 0.625rem;
      }
      h2 {
        font-size: 1.625rem;
      }
    }
  } ;
`;
