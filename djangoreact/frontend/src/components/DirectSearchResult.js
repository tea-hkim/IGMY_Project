import React from 'react';
import styled from 'styled-components';
import { palePink } from '../styles/color';

function DirectSearchResult(pillList) {
  const List = pillList;
  return (
    <ResultBox className="search_result_box">
      {List.map((pill) => {
        return (
          <PillInfoBox className="pillInfo_Box">
            <PillImage src={pill.image} alt={pill.item_name} />
            <DecriptionBox className="description_box">
              <h3 className="pillInfo_name">{pill.item_name}</h3>
              <span className="pillInfo_bit">{pill.bit}</span>
              <div className="pillInfo_effect">
                <h4>효능 효과</h4>
                {pill.efcy_qesitm}
              </div>
            </DecriptionBox>
          </PillInfoBox>
        );
      })}
    </ResultBox>
  );
}

export default DirectSearchResult;

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  margin-top: 10vh;
`;

const PillInfoBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid ${palePink};
  border-radius: 5px;
  width: 100%;
  height: 25vh;
  margin-top: 10px;
`;

const PillImage = styled.img`
  width: 27%;
  height: 80%;
  overflow: hidden;
`;

const DecriptionBox = styled.div`
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  h3 {
    margin: 0;
  }
  div {
    display: flex;
    align-items: flex-start;
  }
  h4 {
    margin: 0px;
    width: 10%;
  }
`;
