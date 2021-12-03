import React from 'react';
import styled from 'styled-components';
import { memberList } from '../helper/memberList';
import { AboutUs } from '../components/AboutUs';

const AboutUsPage = () => {
  return (
    <PageContainer className="about_us_box">
      <h1 className="about_us_box_header">팀 머슴러닝</h1>
      <h2>카드를 클릭해보세요!</h2>
      <BoxContainer className="about_us_box_main">
        {memberList.map((item) => (
          <AboutUs
            key={item.id}
            engName={item.engName}
            name={item.name}
            position={item.position}
            mbti={item.mbti}
            url={item.url}
            email={item.email}
            blog={item.blog}
            comment={item.comment}
          />
        ))}
      </BoxContainer>
    </PageContainer>
  );
};

export default AboutUsPage;

const PageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5vh;
  h1 {
    color: white;
    font-size: 3rem;
    margin-bottom: 1.25rem;
  }
  h2 {
    margin-bottom: 0.625rem;
  }
`;
const BoxContainer = styled.div`
  width: 70%;
  max-width: 1100px;
  display: flex;
  flex-wrap: wrap;
`;
