import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputWithLabel from '../auth/InputWithLabel';
import { register } from '../redux/authSlice';
import AuthButton from '../auth/AuthButton';
import { emailCheck, passwordCheck } from '../auth/checkUserInfo';
import {
  AuthContainer,
  AuthTitle,
  LineBox,
  Line,
  LoginForm,
  AuthFooterBox,
  AuthFooterContent,
  ValidMessage,
} from '../styles/AuthStyle';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEamil] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPw, setConfirmPw] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEamil(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPw') {
      setConfirmPw(value);
    } else if (name === 'nickName') {
      setNickName(value);
    }
  };
  //  이메일, 패스워드 유효성 검사
  let isActive = false;
  if (email !== null && password !== null && confirmPw !== null && nickName !== null) {
    isActive = true;
  } else {
    isActive = false;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const registerURL = 'http://localhost:8000/api/sign-up/';
    const username = nickName;
    const userData = { email, password, username };

    if (email === null || password === null || confirmPw === null || nickName === null) {
      setErrorMessage('빈 칸을 모두 채워주세요');
      return;
    }
    if (!emailCheck(email)) {
      setErrorMessage('잘못된 이메일 형식입니다');
      return;
    }
    if (!passwordCheck(password)) {
      setErrorMessage('비밀번호는 영문 숫자를 포함하여 8자리 이상이어야 합니다');
      return;
    }
    if (password !== confirmPw) {
      setErrorMessage('비밀번호가 일치하지 않습니다');
      return;
    }
    setErrorMessage('');

    const { data } = await axios.post(registerURL, userData);
    console.log(data);
    if (data.message === 'ok') {
      dispatch(register({ email, password, username }));
      alert('회원가입이 완료되었습니다. 로그인해주세요!');
      navigate('/login');
    } else if (data.message === 'duplicate email') {
      alert('가입된 이메일입니다');
    }
  };

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <AuthContainer>
      <AuthTitle>회원가입</AuthTitle>
      <LoginForm onSubmit={handleSubmit}>
        <InputWithLabel
          label="이메일"
          name="email"
          type="text"
          placeholder="이메일"
          required
          value={email}
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={handleChange}
        />
        <InputWithLabel
          name="confirmPw"
          type="password"
          placeholder="비밀번호 확인"
          required
          value={confirmPw}
          onChange={handleChange}
        />
        <InputWithLabel
          label="닉네임"
          name="nickName"
          type="text"
          placeholder="별명(2 ~ 15자)"
          maxLength="15"
          required
          value={nickName}
          onChange={handleChange}
        />
        <ValidMessage>{errorMessage}</ValidMessage>
        <AuthButton className={isActive ? 'activeBtn' : 'unactiveBtn'} type="submit" disabled={!isActive}>
          회원가입
        </AuthButton>
      </LoginForm>
      <LineBox>
        <Line />
      </LineBox>
      <AuthFooterBox>
        <AuthFooterContent>
          이게모약 계정이 있으신가요?
          <div tabIndex="0" role="button" onClick={handleClick} onKeyDown={handleClick}>
            로그인 하기
          </div>
        </AuthFooterContent>
      </AuthFooterBox>
    </AuthContainer>
  );
};

export default RegisterPage;
