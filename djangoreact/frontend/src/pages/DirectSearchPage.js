import axios from 'axios';
import React, { useState } from 'react';
import DirectSearchResult from '../components/DirectSearchResult';
import { PillShapeData, PillColorData } from '../helper/pillData';
import {
  SearchBox,
  NameBox,
  NonNameContainer,
  ButtonBox,
  ShapeColorBox,
  SearchPage,
  SelectBox,
} from '../styles/DirectSearchPageStyle';

function DirectSearchPage() {
  const [pillName, setPillName] = useState('');
  const [shape, setShape] = useState('');
  const [color, setColor] = useState('');
  const [pillData, setPillData] = useState([]);

  async function directSearch() {
    const url = `http://localhost:8000/api/search-direct/?n=${pillName}&s=${shape}&c=${color}&`;
    const response = await axios.get(url);
    setPillData(response.data);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    directSearch();
  };

  const onChange = (event) => {
    setPillName(event.target.value);
  };

  const handleClick = (event, type) => {
    const { id, innerText } = event.currentTarget;
    if (type === 'shape') {
      setShape(id);
    }
    if (type === 'color') {
      setColor(innerText);
    }
  };

  const handleReset = () => {
    setPillName('');
    setShape('');
    setColor('');
    setPillData([]);
  };

  return (
    <SearchPage className="search_direct">
      <h1>알약 직접 검색</h1>
      <SearchBox className="search_direct_box" onSubmit={onSubmit}>
        <NameBox className="search_name_box">
          <h2>약 이름 검색</h2>
          <input name="searchName" type="text" onChange={onChange} value={pillName} />
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
              return (
                <SelectBox
                  role="button"
                  key={item.title}
                  value={item.title}
                  className={shape === item.shape ? 'checked' : 'selectbox_shape'}
                  id={item.shape}
                  onClick={(e) => {
                    handleClick(e, 'shape');
                  }}
                  onKeyDown={(e) => {
                    handleClick(e, 'shape');
                  }}
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
                    className={color === item.title ? 'checked' : 'selectbox_shape'}
                    id={item.color}
                    onClick={(e) => {
                      handleClick(e, 'color');
                    }}
                    onKeyDown={(e) => {
                      handleClick(e, 'color');
                    }}
                    tabIndex="0"
                  >
                    {item.title}
                  </SelectBox>
                );
              }
              return (
                <SelectBox
                  role="button"
                  key={item.color}
                  className={color === item.title ? 'checked' : 'selectbox_shape'}
                  id={item.color}
                  onClick={(e) => {
                    handleClick(e, 'color');
                  }}
                  onKeyDown={(e) => {
                    handleClick(e, 'color');
                  }}
                  tabIndex="0"
                >
                  <div className="selectbox_color"> </div>
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
          <button type="button" className="reset_button" onClick={handleReset}>
            선택 초기화
          </button>
        </ButtonBox>
      </SearchBox>
      <div>{pillData.length !== 0 ? <h4>총 {pillData.length} 건의 검색 결과가 있습니다</h4> : null}</div>
      {DirectSearchResult(pillData)}
    </SearchPage>
  );
}

export default DirectSearchPage;
