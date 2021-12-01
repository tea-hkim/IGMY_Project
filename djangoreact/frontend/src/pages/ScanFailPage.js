import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonStyle } from '../styles/CameraPageStyle';
import { InfoContainer, FailInfo } from '../styles/ScanPageStyle';

const ScanFailPage = () => {
  const navigate = useNavigate();
  return (
    <InfoContainer>
      <FailInfo>
        <h1>
          사진이 너무 흐릿하거나 <br /> 알수 없는 알약입니다.
        </h1>
        <p>다른사진으로 다시 검색해주세요</p>
        <img src="images/알약실패.png" alt="스캔된 사진" />
      </FailInfo>
      <ButtonStyle>
        <button id="switch" type="button" onClick={() => navigate('/camera')}>
          다시 촬영
        </button>
        <button id="takePhoto" type="button" onClick={() => navigate('/direct')}>
          직접 검색
        </button>
      </ButtonStyle>
    </InfoContainer>
  );
};

export default ScanFailPage;
