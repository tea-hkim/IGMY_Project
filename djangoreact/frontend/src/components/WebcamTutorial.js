import React from 'react';
import styled from 'styled-components';

const WebcamTutorial = () => {
  return (
    <TutorialStyle>
      <p>
        옆의 사진과 같이
        <br />
        사진 중앙에 약의 모양이 가득 채워지고
        <br />
        각인이 잘 보일 수 있도록 촬영해주세요
      </p>
      <img src="images/알약샘플.png" alt="알약샘플" />
    </TutorialStyle>
  );
};

export default WebcamTutorial;

const TutorialStyle = styled.div`
  display: flex;
  margin: 2rem auto;
  width: 40vw;
  border: 0.5rem solid #b4a2eb;
  border-radius: 0.5rem;

  > img {
    float: right;
    width: 5rem;
    height: 5rem;
    margin: 1rem auto;
  }

  > p {
    font-size: 1rem;
    margin: auto;
  }
`;
