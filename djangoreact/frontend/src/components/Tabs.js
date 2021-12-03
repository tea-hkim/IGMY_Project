import React, { useState } from 'react';
import '../styles/Tabs.css';
import axios from 'axios';

function Tabs() {
  const [toggleState, setToggleState] = useState(1);
  const [data, setData] = useState(null);

  const toggleTab = (index) => {
    setToggleState(index);
    axios.get('http://127.0.0.1:8000/api/user-pill-list/').then((response) => {
      setData(response.data);
    });
  };

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
          <h2>내가 검색한 알약을 보여줘유</h2>
          <hr />
          <p>타이레놀</p>
        </div>

        <div className={toggleState === 2 ? 'content  active-content' : 'content'}>
          <h2>즐겨찾기한 알약을 보여줘유</h2>
          <hr />
          <p>{data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly />}</p>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
