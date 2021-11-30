import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as siIcons from 'react-icons/si';
import InputWithLabel from '../auth/InputWithLabel';
import AuthButton from '../auth/AuthButton';
import { login } from '../redux/authSlice';
import { emailCheck } from '../auth/checkUserInfo';
import {
  AuthContainer,
  AuthTitle,
  LineBox,
  Or,
  Line,
  LoginForm,
  AuthFooterBox,
  AuthFooterContent,
  ValidMessage,
} from '../styles/AuthStyle';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEamil] = useState(null);
  const [password, setPassword] = useState(null);
  const [autoLogin, setAutoLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEamil(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  //  이메일, 패스워드 유효성 검사
  let isActive = false;
  if (email !== null && password !== null) {
    isActive = true;
  } else {
    isActive = false;
  }

  const handelSubmit = async (event) => {
    event.preventDefault();
    const loginURL = 'http://localhost:8000/api/login/';
    const userData = { email, password };

    if (!emailCheck(email)) {
      setErrorMessage('잘못된 이메일 형식입니다');
      return;
    }

    const { data } = await axios.post(loginURL, userData);
    if (data.message === 'login success') {
      const { token } = data;
      dispatch(login({ email, password, token }));
      // 자동 로그인 시 유저의 토큰을 로컬 스토리지에 저장
      if (autoLogin) {
        localStorage.setItem('userToken', token);
      }
      sessionStorage.setItem('userToken', token);
      navigate('/');
    } else if (data.message === 'no user') {
      alert('아이디가 잘못되었습니다');
    } else if (data.message === 'wrong password') {
      alert('패스워드가 틀렸습니다');
    }
  };

  const handleChecked = ({ target }) => {
    if (!target.checked) {
      setAutoLogin(false);
    } else {
      setAutoLogin(true);
    }
  };

  const handleClickToLogin = () => {
    navigate('/register');
  };

  const handleClickToFindPw = () => {
    navigate('/findPw');
  };

  return (
    <AuthContainer>
      <AuthTitle>로그인</AuthTitle>
      <AuthButton type="button" kakao>
        <siIcons.SiKakaotalk size="30px" />
        <span>카카오 계정으로 로그인</span>
      </AuthButton>
      <LineBox>
        <Or> 또는 </Or>
        <Line />
      </LineBox>
      <LoginForm onSubmit={handelSubmit}>
        <InputWithLabel
          label="이메일"
          name="email"
          type="text"
          placeholder="이메일"
          value={email}
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handleChange}
        />
        <ValidMessage>{errorMessage}</ValidMessage>
        <AuthButton className={isActive ? 'activeBtn' : 'unactiveBtn'} type="submit" disabled={!isActive}>
          로그인
        </AuthButton>
      </LoginForm>
      <div className="autoLoginBox">
        <input type="checkbox" checked={autoLogin} onChange={handleChecked} />
        자동로그인
      </div>
      <AuthFooterBox>
        <AuthFooterContent>
          <div>아직 이게모약 계정이 없으신가요?</div>
          <div tabIndex="0" role="button" onClick={handleClickToLogin} onKeyDown={handleClickToLogin}>
            가입하기
          </div>
        </AuthFooterContent>
        <Line />
        <AuthFooterContent>
          <div>혹시 비밀번호를 잊으셨나요?</div>
          <div tabIndex="-1" role="button" onClick={handleClickToFindPw} onKeyDown={handleClickToFindPw}>
            비밀번호 재설정
          </div>
        </AuthFooterContent>
      </AuthFooterBox>
    </AuthContainer>
  );
};

export default LoginPage;
