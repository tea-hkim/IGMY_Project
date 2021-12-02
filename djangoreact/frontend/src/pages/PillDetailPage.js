/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { ScanImgStyle, modalStyles } from '../styles/ScanPageStyle';

const PillDetailPage = () => {
  Modal.setAppElement('#root');
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const [pillName, setPillName] = useState();
  const [pillImg, setPillImg] = useState();
  const [pillBit, setPillBit] = useState();
  const [pillSungbun, setPillSungbun] = useState();
  const [pillEfcy, setPillEfcy] = useState();
  const [pillUse, setPillUse] = useState();
  const [pillSideEffect, setPillSideEffect] = useState();
  const [pillAttention, setPillAttention] = useState();
  const [pillInteraction, setPillInteraction] = useState();
  const [pillDeposit, setPillDeposit] = useState();

  useEffect(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/pill-detail/?pill_id=${location.state.pillNum}`);
      console.log(response.data);
      setPillName(response.data[0].item_name); // 약 이름
      setPillImg(response.data[0].image); // 약 사진
      setPillBit(response.data[0].bit); // 약효 분류
      setPillSungbun(response.data[0].sungbun); // 성분,함량
      setPillEfcy(response.data[0].efcy_qesitm); // 효능,효과
      setPillUse(response.data[0].use_method_qesitm); // 용법,용량
      setPillSideEffect(response.data[0].se_qesitm); // 이상반응
      setPillAttention(response.data[0].atpn_qesitm); // 주의사항
      setPillInteraction(response.data[0].intrc_qesitm); // 상호작용
      setPillDeposit(response.data[0].deposit_method_qesitm); // 보관방법
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <PillContainer>
      <PillView1>
        <PillName>{pillName}</PillName>
        <ScanImgStyle src={pillImg} alt="알약사진" onClick={() => setOpen(true)} />
        <Modal isOpen={isOpen} style={modalStyles} onRequestClose={() => setOpen(false)}>
          <img src={pillImg} alt="스캔된 사진" style={{ width: '100%', height: '100%' }} />
        </Modal>
      </PillView1>
      <PillView2>
        <PillBit>{pillBit}</PillBit>
        <PillInfo>
          <PillCategory>성분/함량</PillCategory>
          <PillDetailInfo className="pillBit">{pillSungbun}</PillDetailInfo>
        </PillInfo>
        <PillInfo>
          <PillCategory>효능/효과</PillCategory>
          <PillDetailInfo>{pillEfcy}</PillDetailInfo>
        </PillInfo>
        <PillInfo>
          <PillCategory>용법/용량</PillCategory>
          <PillDetailInfo>{pillUse}</PillDetailInfo>
        </PillInfo>
        <PillInfo>
          <PillCategory>이상반응</PillCategory>
          <PillDetailInfo>{pillSideEffect}</PillDetailInfo>
        </PillInfo>
        <DetailButton>+더보기</DetailButton>
      </PillView2>
    </PillContainer>
  );
};

export default PillDetailPage;

const PillContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 90vw;
`;

const PillView1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;

  > img {
    width: 90%;
    margin: 1rem auto;
    border: 3px solid #dee2e6;
  }
`;

const PillName = styled.p`
  font-size: 1.5rem;
  margin: 3rem auto;
  padding: 0.5rem 1rem;
  border: 5px solid #dee2e6;
  border-radius: 1rem;
`;

const PillView2 = styled.div`
  width: 60%;
  border: 4px solid #dee2e6;
  border-radius: 0.5rem;
`;

const PillBit = styled.p`
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  margin: 1rem;
  padding: 0.5rem 1rem;
  background-color: #b2acfa;
  color: white;
  border-radius: 1rem;
`;

const PillInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 99%;

  & + div {
    margin-top: 1.5rem;
  }

  .pillBit {
    margin-top: 0.3rem;
  }
`;

const PillCategory = styled.p`
  font-size: 1.2rem;
  color: #8b00ff;
  font-weight: bold;
  width: 15%;
  margin: 0.2rem 0 1rem 1.5rem;
`;

const PillDetailInfo = styled.p`
  width: 85%;
  margin: auto 0.5rem;
`;

const DetailButton = styled.button`
  margin: 1.2rem;
  padding: 0.2rem 0.2rem;
  border: 2px solid #b2acfa;
  border-radius: 7px;
  color: #b4a2eb;
  background-color: white;
  font-size: 1.2rem;
  float: right;

  &:hover {
    background-color: #b4a2eb;
    color: white;
    font-weight: 800;
  }
`;