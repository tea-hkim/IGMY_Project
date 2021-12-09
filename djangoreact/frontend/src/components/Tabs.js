/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Tabs.css';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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
        'Authorization': `Bearer ${access}`,
      },
    };

    if (index === 1) {
      const response1 = await axios.get('http://127.0.0.1:8000/api/search-history/', config);
      console.log(response1.data);
      setRecentlyPill((current) => {
        const pillList = response1.data
        const newList = {...current, pillList };
        return newList
      })
    } else if (index === 2) {
      const response2 = await axios.get('http://127.0.0.1:8000/api/user-pill-list/', config);
      console.log(response2.data);
      setUserPill((current) => {
        const pillList = response2.data
        const newList = {...current, pillList };
        return newList
      })
    }
  };

  useEffect(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/search-history/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      console.log(response.data);
      setRecentlyPill((current) => {
        const pillList = response.data
        const newList = {...current, pillList};
        return newList
      })
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
          {!recentlyPill ? (
            <p>최근 검색한 알약이 없습니다</p>
          ) : (
            <button onClick={() => console.log(recentlyPill.pillList)}>성공 </button>
          )}
        </div>
        {/* 컴포넌트 구분선 */}
        <div className={toggleState === 2 ? 'content  active-content' : 'content'}>
          <h2>즐겨 찾기한 알약</h2>
          <Horizon />
          {!userPill ? (
            <p>즐겨 찾기한 알약이 없습니다</p>
          ) : (
            <CardContainer>
              {/* <button onClick={() => console.log(userPill.pillList)}>성공 </button> */}
              <PillCard onClick={() => navigate('/pilldetail', { state: { pillNum } })} >
                <img src={userPill.pillList[0].image} alt="알약 사진" />
                <div>{userPill.pillList[0].item_name}</div>
              </PillCard>
            </CardContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tabs;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`

const PillCard = styled.div`
  border: 1.5px solid black;
  border-radius: 0.5rem;
  background-color: #b2acfa;

  > img {
    border-radius: 0.5rem 0.5rem 0 0; 
    width: 100%;
    height: 80%;
  }

  &:hover {
    cursor: grab;
    opacity: 0.8;
  }
`;

const Horizon = styled.hr`
  margin: 0.5rem auto;
`
