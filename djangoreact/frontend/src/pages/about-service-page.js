/* eslint-disable  no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import WhiteNavbar from '../components/WhiteNavbar';

const Section = ({ num }) => {
  const imgURL = `service/service_${num}.png`;
  return (
    <ImgBox className="section">
      <ContentImg src={imgURL} alt="url" />
    </ImgBox>
  );
};

const serviceList = [1, 2, 3, 4, 5, 6, 7];

const AboutServicePage = () => {
  return (
    <>
      <WhiteNavbar />
      <AboutServiceContainer>
        {serviceList.map((num) => {
          return <Section num={num} />;
        })}
      </AboutServiceContainer>
    </>
  );
};

export default AboutServicePage;

const AboutServiceContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgBox = styled.div`
  height: 90vh;
  margin: 0;
  box-sizing: border-box;
  padding: 0;
`;

const ContentImg = styled.img`
  height: 100%;
`;
