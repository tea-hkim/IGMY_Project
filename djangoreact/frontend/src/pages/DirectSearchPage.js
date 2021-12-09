import axios from 'axios';
import React, { useState } from 'react';
import DirectSearchResult from '../components/DirectSearchResult';
import { PillShapeData, PillColorData } from '../helper/pillData';
import Loader from '../components/Loader';
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

  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [count, setCount] = useState(null);
  const [pillList, setPillList] = useState(null);

  let page = 0;
  let totalPage = 0;

  const directSearch = async () => {
    setIsLoaded(true);
    const url = `http://localhost:8000/api/search-direct/?name=${pillName}&shape=${
      shape !== '선택안함' ? shape : ''
    }&color_front=${color !== '선택안함' ? color : ''}&page=1`;
    const response = await axios.get(url);
    if (response.data.length === 0) {
      setIsLoaded(false);
      return;
    }
    if (response.data) {
      totalPage = response.data[0].total_page;
      setCount(response.data[1].count);
      page = response.data[2].page + 1;
      setPillList(response.data[3]);
    }
    setIsLoaded(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    directSearch();
  };

  const handleChange = (event) => {
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
    setCount(null);
    setPillList(null);
    totalPage = 0;
    page = 0;
    setIsLoaded(false);
  };

  const printMoreItem = async () => {
    if (page > totalPage) return;
    setIsLoaded(true);
    const url = `http://localhost:8000/api/search-direct/?name=${pillName}&shape=${
      shape !== '선택안함' ? shape : ''
    }&color_front=${color !== '선택안함' ? color : ''}&page=${page}`;
    const response = await axios.get(url);
    page += 1;
    const newPillList = response.data[3];
    // if (pillList === null) {
    //   setIsLoaded(false);
    //   return;
    // }
    setPillList((pillist) => pillist.concat(newPillList));
    await setIsLoaded(false);
  };

  const onIntersect = ([{ isIntersecting }]) => {
    if (page === 0) return;
    if (isIntersecting) printMoreItem();
  };

  if (target) {
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 1,
    });
    observer.observe(target);
  }

  return (
    <SearchPage className="search_direct">
      <h1>알약 직접 검색</h1>
      <SearchBox className="search_direct_box" onSubmit={handleSubmit}>
        <NameBox className="search_name_box">
          <h2>약 이름 검색</h2>
          <input name="searchName" type="text" onChange={handleChange} value={pillName} />
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
            초기화
          </button>
        </ButtonBox>
      </SearchBox>
      <div>
        {count && (
          <h4>
            [{pillName}-{shape}-{color}]으로 {count} 건의 검색 결과가 있습니다
          </h4>
        )}
      </div>
      {pillList && <DirectSearchResult pillList={pillList} />}
      <div ref={setTarget} className="target_element">
        {isLoaded && <Loader />}
      </div>
    </SearchPage>
  );
}

export default DirectSearchPage;
