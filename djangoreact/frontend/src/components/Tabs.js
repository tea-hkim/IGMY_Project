/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Tabs.css';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PillCardContainer from './PillCardContainer';

function Tabs() {
  const [toggleState, setToggleState] = useState(1);
  const [recentlyPill, setRecentlyPill] = useState();
  const [userPill, setUserPill] = useState();
  const [pillNum, setPillNum] = useState();
  const navigate = useNavigate();
  const { access } = useSelector((state) => state.auth);
  const toggleTab = async (index) => {
    setToggleState(index);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`,
      },
    };

    if (index === 1) {
      const response1 = await axios.get('http://127.0.0.1:8000/api/search-history/', config);
      console.log('최근 검색 알약 칸이 마운트 되었습니다', response1.data);
      setRecentlyPill((current) => {
        const pillList = response1.data;
        const newList = { ...current, pillList };
        return newList;
      });
    } else if (index === 2) {
      const response2 = await axios.get('http://127.0.0.1:8000/api/user-pill-list/', config);
      console.log('즐겨찾기 알약 칸이 마운트 되었습니다', response2.data);
      setUserPill((current) => {
        const pillList = response2.data;
        const newList = { ...current, pillList };
        return newList;
      });
    }
  };

  useEffect(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/search-history/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      console.log('마운트 시 반환 값 :', response.data);
      setRecentlyPill((current) => {
        const pillList = response.data;
        const newList = { ...current, pillList };
        return newList;
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button type="button" className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(1)}>
          최근 검색한 알약
        </button>
        <button type="button" className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(2)}>
          즐겨찾기한 알약
        </button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? 'content  active-content' : 'content'}>
          <h2>내가 검색한 알약</h2>
          <Horizon />
          {!recentlyPill ? <p>최근 검색한 알약이 없습니다</p> : <PillCardContainer pillList={recentlyPill.pillList} />}
        </div>
        {/* 컴포넌트 구분선 */}
        <div className={toggleState === 2 ? 'content  active-content' : 'content'}>
          <h2>즐겨 찾기한 알약</h2>
          <Horizon />
          {!userPill ? <p>즐겨 찾기한 알약이 없습니다</p> : <PillCardContainer pillList={userPill.pillList} />}
        </div>
      </div>
    </div>
  );
}

export default Tabs;

const Horizon = styled.hr`
  margin: 0.625rem auto;
`;
