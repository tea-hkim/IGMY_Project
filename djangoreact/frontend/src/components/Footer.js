import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterBox className="footer_box">
      <ExplanateBox className="footer_explanation">
        <nav className="footer_explanation_navigation">
          <ul>
            <li>서비스 기획 의도</li>
            <li>팀원 소개</li>
            <li>사용 방법</li>
          </ul>
        </nav>
        <div id="team_info">
          <span>팀명 : 머슴러닝</span>
          <span>이메일 : igmy1108@gmail.com</span>
          <span>팀장 : 김태호</span>
          <span>팀원 : 강경모, 강석영, 김민지, 김효곤, 민경준</span>
        </div>
        <div id="team_vision">
          이게모약은 입원 과정에서 많은 시간이 들어가지만 꼭 필요한 환자 복용약 시간을 줄여주고 그만큼 의료진들과 환자
          간의 접촉 시간을 늘릴 수 있도록 하여,
          <br />
          한국 의료 서비스의 질을 높이기 위해 이 서비스를 기획하였습니다.
        </div>
        <div id="copyright">Copyright 2021 이게모약 All rights reserved.</div>
      </ExplanateBox>
    </FooterBox>
  );
};

export default Footer;

const FooterBox = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 5vh 0 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25vh;
  margin-top: 10vh;
  background-color: #fafafa;
`;
const ExplanateBox = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.625rem;
  nav {
    ul {
      display: flex;
      justify-content: start;
      align-items: flex-start;
      width: 100%;
      list-style: none;
      padding: 0;
      margin: 10px 0;
      font-size: 0.625rem;
      font-weight: 700;
      li {
        margin-right: 0.625rem;
        cursor: pointer;
      }
    }
  }
  div {
    margin-bottom: 0.625rem;
    span {
      margin-right: 1rem;
    }
  }
  #copyright {
    font-weight: 800;
  }
`;
