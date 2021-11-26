import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ScanningPage = () => {
  const navigate = useNavigate();
  return (
    <ContainerWrap>
      <ScanContainer>
        <p>검색하신 알약이 [인데놀 정]일 확률은 85% 입니다.</p>
        <img src="images/스캔알약샘플.png" alt="스캔된 사진" />
      </ScanContainer>
      <ButtonContainer>
        <button id="switch" type="button" onClick={() => navigate('/camera')}>
          다시 촬영
        </button>
        <button id="takePhoto" type="button" onClick={() => navigate('/')}>
          알약 확인
        </button>
      </ButtonContainer>
    </ContainerWrap>
  );
};

export default ScanningPage;

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
    height: 10rem;
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
