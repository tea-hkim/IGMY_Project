import styled from 'styled-components';

export const PillBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  > h2 {
    font-size: 2rem;
  }
  > div {
    cursor: pointer;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  place-items: center;
`;
