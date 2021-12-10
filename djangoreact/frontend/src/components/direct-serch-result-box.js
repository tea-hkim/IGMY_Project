import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { palePink } from '../styles/color';

const ResultBox = ({ pill }) => {
  const navigate = useNavigate();
  const pillNum = pill.item_num;

  return (
    <PillInfoBox
      className="pillInfo_Box"
      id={pill.item_num}
      onClick={() => navigate('/pilldetail', { state: { pillNum } })}
    >
      <PillImage src={pill.image} alt={pill.item_name} />
      <DecriptionBox className="description_box">
        <div className="description_box_header">
          <h3 className="pill_info_name">{pill.item_name}</h3>
          <p className="pill_info_bit">{pill.bit}</p>
        </div>
        <div className="pill_info_sungbun">
          <h4>성분 함량</h4>
          {pill.sungbun}
        </div>
        <div className="pill_info_effect">
          <h4>효능 효과</h4>
          {pill.efcy_qesitm}
        </div>
      </DecriptionBox>
    </PillInfoBox>
  );
};

export default ResultBox;

const PillInfoBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  height: 25vh;
  background-color: white;
  margin-top: 10px;
  &:hover {
    transition: 300ms;
    transform: scale(1.02);
  }
`;

const PillImage = styled.img`
  width: 27%;
  height: 85%;
  overflow: hidden;
`;

const DecriptionBox = styled.div`
  width: 70%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  border: 2px solid ${palePink};
  padding: 5px 10px;
  div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    h3 {
      border: 2px solid ${palePink};
      padding: 5px 20px;
      border-radius: 20px;
    }
    p {
      height: 100%;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 20px;
      border-radius: 20px;
      background-color: ${palePink};
    }
    h4 {
      margin-left: 20px;
      width: 6%;
      color: #8b00ff;
    }
  }
`;
