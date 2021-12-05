import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { FaTablets } from 'react-icons/fa';
import { PillBoxContainer, Box } from '../styles/PillBoxPageStyle';
import Tabs from '../components/Tabs';

const PillBoxPage = () => {
  return (
    <PillBoxContainer>
      <Box>
        <FaTablets size="60px" color="pink" />
        <h2>&nbsp;&nbsp;내 알약 상자</h2>
      </Box>
      <Tabs />
    </PillBoxContainer>
  );
};

export default PillBoxPage;
