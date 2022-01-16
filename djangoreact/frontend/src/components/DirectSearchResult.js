/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import ResultBox from './direct-serch-result-box';
import { useNavigate } from 'react-router-dom';

function DirectSearchResult({ pillList }) {
  return (
    <ResultContainer className="search_result_box">
      {pillList && pillList.map((pill) => <ResultBox pill={pill} key={pill.item_num} />)}
    </ResultContainer>
  );
}

export default DirectSearchResult;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 15vw;

  &:hover {
    cursor: pointer;
  }
  > div + div {
    margin-top: 0.625rem;
  }
  @media screen and (max-width: 48rem) {
    padding: 0 10vw;
  } ;
`;
