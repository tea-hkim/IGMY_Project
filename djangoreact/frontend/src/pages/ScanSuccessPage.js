/* eslint-disable */
import React, { useEffect } from 'react';

import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { ButtonStyle } from '../styles/CameraPageStyle';
import WhiteNavbar from '../components/WhiteNavbar';
import ScanResult from '../components/ScanResult';
import { SuccessPage, ContainerWrap } from '../styles/ScanPageStyle';

const ScanSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <WhiteNavbar />
      <SuccessPage>
        <ContainerWrap>
          <h1>검색 결과</h1>
          <ScanResult pillList={location.state.pillList} />
        </ContainerWrap>
        <ButtonStyle>
          <button type="button" onClick={() => navigate('/camera')}>
            다시 찍기
          </button>
        </ButtonStyle>
      </SuccessPage>
    </>
  );
};

export default ScanSuccessPage;
