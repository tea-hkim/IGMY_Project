import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as faIcons from 'react-icons/fa';
import * as grIcons from 'react-icons/gr';
import { SearchBoxData, AuthBoxData } from './sidebarData';
import { NavBox, MenuBox, MenuBoxContent, ContentBox, MainLogo } from '../styles/NavbarStyle';

const Navbar = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <NavBox className="navbar">
        <MainLogo className="navbar_main_logo">
          <Link to="/">
            <faIcons.FaPills
              size="3.75rem"
              color="white"
              onClick={() => {
                navigate('/');
              }}
            />
            <h2>이게모약</h2>
          </Link>
        </MainLogo>
        <faIcons.FaBars onClick={showSidebar} size="2.5rem" />
      </NavBox>
      <MenuBox active={sidebar} className={sidebar ? 'sidebar_active' : 'sidebar_unactive'}>
        <MenuBoxContent className="navMenuList">
          <li className="navTogle">
            <grIcons.GrFormClose onClick={showSidebar} size="3.125rem" />
          </li>
          <h3>알약 검색</h3>
          <ContentBox className="navMenuList_search">
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
          <ContentBox className="navMenuList_Auth">
            {AuthBoxData.map((item) => {
              return (
                <li key={item.title} className={item.className}>
                  <Link to={item.path} onClick={showSidebar}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ContentBox>
        </MenuBoxContent>
      </MenuBox>
    </>
  );
};

export default Navbar;
