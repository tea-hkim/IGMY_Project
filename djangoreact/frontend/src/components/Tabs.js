import React, { useState } from 'react';
import '../styles/Tabs.css';

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
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
          <p>타이레놀</p>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
