import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoContainer, FailInfo, ButtonBox } from '../styles/ScanPageStyle';
import WhiteNavbar from '../components/WhiteNavbar';

const ScanFailPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <WhiteNavbar />
      <InfoContainer>
        <FailInfo>
          <h2>
            사진이 너무 흐릿하거나
            <br />알 수 없는 알약입니다.
          </h2>
          <p>다른사진으로 다시 검색해주세요</p>
          <img src="image/알약실패.png" alt="스캔된 사진" />
          <ButtonBox>
            <button id="switch" type="button" onClick={() => navigate('/camera')}>
              다시 촬영하기
            </button>
            <button id="takePhoto" type="button" onClick={() => navigate('/direct')}>
              직접 검색하기
            </button>
          </ButtonBox>
        </FailInfo>
      </InfoContainer>
    </>
  );
};

export default ScanFailPage;
