import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputWithLabel from '../auth/InputWithLabel';
import AuthButton from '../auth/AuthButton';
import { login } from '../redux/authSlice';
import {
  AuthContainer,
  AuthTitle,
  KakaoBox,
  LineBox,
  Or,
  Line,
  LoginForm,
  AuthFooterBox,
  AuthFooterContent,
} from '../styles/AuthStyle';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEamil] = useState(null);
  const [password, setPassword] = useState(null);
  const [autoLogin, setAutoLogin] = useState(false);

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

  let isActive = false;
  if (email !== null && password !== null) {
    isActive = true;
  } else {
    isActive = false;
  }

  const handelSubmit = async (event) => {
    event.preventDefault();
    const loginURL = 'http://localhost:8000/api/token/';
    const userData = { email, password };

    try {
      const { data } = await axios.post(loginURL, userData);
      const { username, access, refresh } = data;
      dispatch(login({ username, access }));
      if (autoLogin) {
        localStorage.setItem('refresh', refresh);
      }
      navigate('/');
    } catch (error) {
      alert('아이디 또는 패스워드가 잘못되었습니다');
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
      <KakaoBox className="kakaoButton">
        <img src="images/카카오 버튼 PNG.png" alt="카카오버튼" style={{ width: '100%' }} />
      </KakaoBox>
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
