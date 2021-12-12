/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import * as imIcons from 'react-icons/im';
import Tabs from '../components/Tabs';
import WhiteNavbar from '../components/WhiteNavbar';

const PillBoxPage = () => {
  const { username } = useSelector((state) => state.auth);
  return (
    <>
      <WhiteNavbar />
      <PillBoxContainer>
        <div className="pillbox_header" size="1.4rem">
          <imIcons.ImAidKit size="1.428rem" />
          <h1>내 알약 상자</h1>
          <span>{username}님</span>
        </div>
        <Tabs />
      </PillBoxContainer>
    </>
  );
};

export default PillBoxPage;

const PillBoxContainer = styled.div`
  padding-top: 15vh;
  padding-bottom: 10vh;
  width: 100vw;
  min-height: 115vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  > h2 {
    font-size: 2rem;
  }
  .pillbox_header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60vw;
    margin-bottom: 1rem;
    h1,
    svg {
      color: white;
      margin-right: 0.625rem;
    }
    span {
      font-size: 1.25rem;
      font-weight: 600;
    }
  }
  @media screen and (max-width: 48em) {
    .pillbox_header {
      width:80%;
      h1,
      svg {
        font-size: 1.25rem;
        color: white;
        margin-right: 0.625rem;
      }
      span {
        // display:inline-block;
        // padding-right: 0;
        font-size: 1.25rem;
        font-weight: 600;
      }
    }
  }
`;