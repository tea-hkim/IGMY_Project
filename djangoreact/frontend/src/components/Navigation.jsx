import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaPills } from 'react-icons/fa';

const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <ContainerBox>
      <div style={{ display: 'inline-block' }} className="ContainerPosition">
        <BackgroundSquare />
        <Container>
          <StyledLink to="/" isActive={pathname === '/'} className="main">
            <FaPills size="60px" color="white" />
          </StyledLink>
        </Container>
      </div>
    </ContainerBox>
  );
};

export default Navigation;

const BackgroundSquare = () => {
  const style = {
    position: 'absolute',
    zIndex: '100',
    width: '1300px',
    height: '80px',
    backgroundColor: '#B4A2EB',
    borderRadius: '',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
  };
  return <div style={style} />;
};

const ContainerBox = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const Container = styled.div`
  width: 1300px;
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  font-family: 'NotoSansKR';
  font-weight: 'bold';
  font-style: normal;
  text-decoration: none;
  z-index: 200;
`;

const StyledLink = styled(Link)`
  border-bottom: ${(props) => (props.isActive ? '2px solid black' : '')};
  font-size: ${(props) => (props.isActive ? '22px' : '20px')};

  &.main {
    position: absolute;
    left: 60px;
  }

  &.movie {
    position: absolute;
    transform: translateY(-60%);
    left: 250px;
  }

  &.tv {
    position: absolute;
    transform: translateY(-60%);
    left: 370px;
  }

  &.potatoBasket {
    position: absolute;
    transform: translateY(-60%);
    left: 470px;
  }

  &.mypage {
    position: absolute;
    right: 180px;
  }
`;
