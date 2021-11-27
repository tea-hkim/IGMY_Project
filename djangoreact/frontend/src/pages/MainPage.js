import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContainer, Box, Circle, Giyeog, Square } from '../styles/MainPageStyle';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <MainContainer className="main_container">
      <h2 className="main_container_title">
        간편하고 손 쉬운
        <br />내 손안의 작은 알약 사전
      </h2>
      <Box className="main_container_box">
        <Circle className="main_container_box_picture" onClick={() => navigate('/camera')}>
          사진 검색
        </Circle>
        <Giyeog className="main_container_box_introduce" onClick={() => navigate('/')}>
          {' '}
        </Giyeog>
        <Square className="main_container_box_rectangle" onClick={() => navigate('/')}>
          {' '}
        </Square>
        <Circle className="main_container_box_search" onClick={() => navigate('/direct')}>
          직접 검색
        </Circle>
      </Box>
    </MainContainer>
  );
};

export default MainPage;
