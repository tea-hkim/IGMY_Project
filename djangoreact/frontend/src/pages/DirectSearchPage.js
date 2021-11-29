import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import DirectSearchResult from '../components/DirectSearchResult';
import { PillShapeData, PillColorData } from '../components/pillData';
import { palePink, mainPink } from '../styles/color';

function DirectSearchPage() {
  const [name, setName] = useState('');
  const [shape, setShape] = useState('');
  const [color, setColor] = useState('');
  const [pillData, setPillData] = useState([]);

  async function directSearch() {
    const url = `http://localhost:8000/api/search-direct/?n=${name}&s=${shape}&c=${color}&`;
    const response = await axios.get(url);
    setPillData(response.data);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    directSearch();
  };

  const onChange = (event) => {
    setName(event.target.value);
  };

  const onClick = (event) => {
    const {
      target: { className, id },
    } = event;
    if (className === 'selectbox_shape') {
      setShape(id);
    } else if (className === 'selectbox_color') {
      setColor(id);
    }
  };
  const onReset = () => {
    setName('');
    setShape('');
    setColor('');
  };
  return (
    <SearchPage className="search_direct">
      <SeachBox className="search_direct_box" onSubmit={onSubmit}>
        <NameBox className="search_name_box">
          <h2>약 이름 검색</h2>
          <input name="searchName" type="text" onChange={onChange} value={name} />
        </NameBox>
        <NonNameContainer className="search_another_box">
          <h2>약 모양 검색</h2>
          <ShapeColorBox className="search_another_box_shape">
            <span>
              모양
              <br />
              선택
            </span>
            {PillShapeData.map((item) => {
              if (item.title === '선택안함') {
                return (
                  <SelectBox
                    role="button"
                    key={item.title}
                    className="selectbox_color"
                    onClick={onClick}
                    onKeyDown={onClick}
                    tabIndex="0"
                  >
                    선택
                    <br />
                    안함
                  </SelectBox>
                );
              }
              return (
                <SelectBox
                  role="button"
                  key={item.title}
                  className="selectbox_shape"
                  id={item.shape}
                  onClick={onClick}
                  onKeyDown={onClick}
                  tabIndex="0"
                >
                  {item.icon}
                  {item.title}
                </SelectBox>
              );
            })}
          </ShapeColorBox>
          <ShapeColorBox className="search_another_box_color">
            <span>
              색상
              <br />
              선택
            </span>
            {PillColorData.map((item) => {
              if (item.title === '선택안함') {
                return (
                  <SelectBox
                    role="button"
                    key={item.title}
                    className="selectbox_color"
                    onClick={onClick}
                    onKeyDown={onClick}
                    tabIndex="0"
                  >
                    선택
                    <br />
                    안함
                  </SelectBox>
                );
              }
              return (
                <SelectBox
                  role="button"
                  key={item.title}
                  className="selectbox_color"
                  id={item.color}
                  onClick={onClick}
                  onKeyDown={onClick}
                  tabIndex="0"
                >
                  <div className="circle"> </div>
                  {item.title}
                </SelectBox>
              );
            })}
          </ShapeColorBox>
        </NonNameContainer>
        <ButtonBox className="search_button_box">
          <button type="submit" className="search_button">
            검색
          </button>
          <button type="button" className="reset_button" onClick={onReset}>
            초기화
          </button>
        </ButtonBox>
      </SeachBox>
      <div>{pillData.length !== 0 ? <h4>총 {pillData.length} 건의 검색 결과가 있습니다</h4> : null}</div>
      {DirectSearchResult(pillData)}
    </SearchPage>
  );
}

export default DirectSearchPage;

const SeachBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 60vw;
`;

const NameBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 2px solid ${palePink};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 2vh 2vw;
  h2 {
    width: 20%;
    margin: 0;
    text-align: center;
    font-size: 2rem;
    color: ${mainPink};
  }
  input {
    width: 75%;
    height: 4vh;
    border: 2px solid ${palePink};
    border-radius: 5px;
    font-size: 1.25rem;
    font-weight: 700;
    padding-left: 1rem;
    &:focus {
      outline: 0.125rem solid ${mainPink};
      background-color: rgba(225, 193, 241, 0.2);
    }
  }
`;

const NonNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  width: 100%;
  border: 2px solid ${palePink};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 2vh 2vw;
  h2 {
    width: 20%;
    margin: 0;
    text-align: center;
    font-size: 2rem;
    color: ${mainPink};
    margin-bottom: 1vh;
  }
  > div {
    margin: 10px 0;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  button {
    border: 1px solid ${palePink};
    border-radius: 5px;
    background-color: ${mainPink};
    width: 20%;
    height: 2.5rem;
    font-size: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
  }
`;

const ShapeColorBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid ${palePink};
    width: 60px;
    height: 60px;
  }
  span {
    color: ${mainPink};
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

const SearchPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  div {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 1px solid black;
    background-color: ${(props) => props.id};
  }
`;
