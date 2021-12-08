import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as faIcons from 'react-icons/fa';
import * as grIcons from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { SearchBoxData, AuthBoxData, PillBoxData } from '../helper/sidebarData';
import { NavBox, MenuBox, MenuBoxContent, ContentBox } from '../styles/NavbarStyle';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const { username, logged } = useSelector((state) => state.auth);

  return (
    <>
      <NavBox className="navbar">
        <faIcons.FaBars onClick={showSidebar} size="2.5rem" />
      </NavBox>
      <MenuBox active={sidebar} className={sidebar ? 'sidebar_active' : 'sidebar_unactive'}>
        <MenuBoxContent className="nav_menu_list">
          <div className="nav_menu_list_header" style={{ display: 'flex' }}>
            <li className="navTogle">
              <grIcons.GrFormClose onClick={showSidebar} size="3.125rem" />
            </li>
            {logged && (
              <div>
                <h2>{username}님</h2>
                <span>건강한 하루를 응원합니다</span>
              </div>
            )}
          </div>
          <h3>알약 검색</h3>
          <ContentBox className="nav_menu_list_search">
            {SearchBoxData.map((item) => {
              return (
                <li key={item.title} className={item.className}>
                  <Link to={item.path} onClick={showSidebar}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ContentBox>
          {logged && <h2>내 알약상자</h2>}
          <ContentBox className="nav_menu_list_Auth">
            {logged
              ? PillBoxData.map((item) => {
                  return (
                    <li key={item.title} className={item.className}>
                      <Link to={item.path} onClick={showSidebar}>
                        {item.title}
                      </Link>
                    </li>
                  );
                })
              : AuthBoxData.map((item) => {
                  return (
                    <li key={item.title} className={item.className}>
                      <Link to={item.path} onClick={showSidebar}>
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
            {logged ? (
              <button type="button" onClick={showSidebar}>
                로그아웃
              </button>
            ) : null}
          </ContentBox>
        </MenuBoxContent>
      </MenuBox>
    </>
  );
};

export default Navbar;
