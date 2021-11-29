import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputWithLabel from '../auth/InputWithLabel';
import { emailCheck, passwordCheck } from '../auth/checkUserInfo';
import { register } from '../redux/authSlice';
import AuthButton from '../auth/AuthButton';
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
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [nickName, setNickName] = useState('');

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

  // 이메일, 패스워드 유효성 검사
  let userValid = '';
  let isActive = false;

  if (email === '' || password === '' || nickName === '') {
    userValid = '빈 칸을 모두 채워주세요';
  } else {
    isActive = true;
  }

  const handleSubmit = async (event) => {
    const registerURL = 'http://localhost:8000/api/create/';
    const username = nickName;
    const userData = { email, password, username };
    event.preventDefault();

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
        <ValidMessage>{emailCheck(email) ? '' : '이메일 형식에 맞지 않습니다'}</ValidMessage>
        <InputWithLabel
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={handleChange}
        />
        <ValidMessage>
          {passwordCheck(password) ? '' : '비밀번호는 영문 숫자를 포함하여 8자리 이상이어야 합니다'}
        </ValidMessage>
        <InputWithLabel
          name="confirmPw"
          type="password"
          placeholder="비밀번호 확인"
          required
          value={confirmPw}
          onChange={handleChange}
        />
        <ValidMessage>{password === confirmPw ? '' : '비밀번호가 일치하지 않습니다.'}</ValidMessage>
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
        <ValidMessage>{userValid}</ValidMessage>
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
