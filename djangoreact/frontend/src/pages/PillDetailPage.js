/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

const PillDetailPage = () => {
  const location = useLocation();
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

  useEffect( async () => {
    try {
        const response =  await axios.get(`http://127.0.0.1:8000/api/pill-detail/?pill_id=${location.state.pillNum}`);
        console.log(response.data);
        setPillName(response.data[0].item_name); // 약 이름
        setPillImg(response.data[0].image); // 약 사진
        setPillBit(response.data[0].bit); // 약효 분류
        setPillSungbun(response.data[0].sungbun); // 성분,함량
        setPillEfcy(response.data[0].efcy_qesitm); // 효능,효과
        setPillUse(response.data[0].use_method_qesitm); // 용법,용량
        setPillSideEffect(response.data[0].se_qesitm); // 이상반응
        setPillAttention(response.data[0].atpn_qesitm); // 주의사항
        // setPillInteraction(response.data[0].intrc_qesitm); // 상호작용
        setPillDeposit(response.data[0].deposit_method_qesitm); // 보관방법

    } catch(err) {
        console.log(err);
    };
  }, []);

  return (
    <div>
        <button type="button">
            {pillName}, {pillBit}
        </button>
    </div>
  );
};

export default PillDetailPage;
