/* eslint-disable */
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { mainPink } from '../styles/color';

const PillCardContainer = ({ pillList }) => {
  const navigate = useNavigate();

  return (
    <CardContainer>
      {pillList.map((pill) => {
        // 내부에서는 pill.item_num을 인식하지 못해서 변수로 선언하여 넣어줬습니다.
        const pillNum = pill.item_num;
        return (
          <PillCard key={pill.item_num} onClick={() => navigate('/pilldetail', { state: { pillNum } })}>
            <img src={`m_images/${pill.item_num}.jpg`} alt="알약 사진" />
            <p>{pill.item_name}</p>
          </PillCard>
        );
      })}
    </CardContainer>
  );
};

export default PillCardContainer;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /*그리드에 9개 이상의 자식들이 추가될 경우 아래로 자동으로 배치되게 하는 태그입니다*/
  /* 알약 이미지는 사이즈를 정해둬서 그리드의 높이는 따로 지정을 안해줘도 될 것 같습니다. */
  grid-auto-flow: row;
  grid-gap: 0.625rem;

  @media screen and (max-width: 48em) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const PillCard = styled.div`
  border: 1px solid ${mainPink};
  border-radius: 0.5rem;
  background-color: #b2acfa;

  > img {
    border-radius: 0.313rem;
    width: 100%;
    height: 80%;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.7;
    transform: scale(1.02);
  }

  @media screen and (max-width: 48em){
    width: 100%;
    font-size: 1.75rem;

    h2 {
      font-size: 1.4em;
    }
    p {
      font-size: 0.6em;
    }
  }
`;
