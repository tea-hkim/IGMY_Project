import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ScanFailPage = () => {
  const navigate = useNavigate();
  return (
    <ContainerWrap>
      <ScanContainer>
        <p>사진이 너무 흐릿하거나 알수 없는 알약입니다.</p>
        <p>다른사진으로 다시 검색해주세요</p>
        <img src="images/알약실패.png" alt="스캔된 사진" />
      </ScanContainer>
      <ButtonContainer>
        <button id="switch" type="button" onClick={() => navigate('/camera')}>
          다시 촬영
        </button>
        <button id="takePhoto" type="button" onClick={() => navigate('/')}>
          직접 검색
        </button>
      </ButtonContainer>
    </ContainerWrap>
  );
};

export default ScanFailPage;

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 30vw;
`;

const ScanContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  width: 100%;
  border: 0.5rem solid #b4a2eb;
  border-radius: 0.5rem;

  > p {
    margin: 1rem auto;
  }

  > img {
    width: 20rem;
    height: 20rem;
    margin: 1rem auto;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.1rem auto;

  > button + button {
    margin-left: 1rem;
  }
`;
