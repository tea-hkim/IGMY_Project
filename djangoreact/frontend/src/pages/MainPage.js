import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as mdIcons from 'react-icons/md';
import * as imIcons from 'react-icons/im';
import { MainContainer, Box, Circle, OtherThings } from '../styles/MainPageStyle';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <MainContainer className="main_container">
      <h1 className="main_container_title">이게모약</h1>
      <Box className="main_container_box">
        <Circle className="main_container_box_picture" onClick={() => navigate('/camera')}>
          <img src="image/pill.png" alt="알약" />
          <div>
            <mdIcons.MdOutlineImageSearch />
            사진 검색
          </div>
        </Circle>
        <OtherThings team className="main_container_box_introduce" onClick={() => navigate('/about-us')}>
          <div>
            팀원
            <br />
            소개
          </div>
        </OtherThings>
        <OtherThings className="main_container_box_rectangle" onClick={() => navigate('/about-service')}>
          <div>
            서비스
            <br />
            소개
          </div>
        </OtherThings>
        <Circle className="main_container_box_search" onClick={() => navigate('/direct')}>
          <img src="image/pill.png" alt="알약" />
          <div>
            <imIcons.ImSearch />
            직접 검색
          </div>
        </Circle>
      </Box>
    </MainContainer>
  );
};

export default MainPage;
