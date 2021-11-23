import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailCheck, passwordCheck } from '../components/checkUserInfo';
import {
  AuthContainer,
  AuthTitle,
  LineBox,
  Line,
  Button,
  LoginForm,
  AuthFooterBox,
  AuthFooterContent,
  ValidMessage,
} from '../styles/AuthStyle';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [nickName, setNickName] = useState('');

  const onChange = (event) => {
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
  let emailValid = '';
  let passwordValid = '';
  let confirmPwValie = '';
  let userValid = '';
  let isActive = false;

  if (email === '' || password === '' || nickName === '') {
    userValid = '빈 칸을 모두 채워주세요';
  } else if (!emailCheck(email)) {
    emailValid = '이메일 형식에 맞지 않습니다';
  } else if (!passwordCheck(password)) {
    passwordValid = '비밀번호는 영문 숫자를 포함하여 8자리 이상이어야 합니다';
  } else if (password !== confirmPw) {
    confirmPwValie = '비밀번호가 일치하지 않습니다.';
  } else {
    isActive = true;
  }

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <AuthContainer>
      <AuthTitle>회원가입</AuthTitle>
      <LoginForm onSubmit={onSubmit}>
        <div>
          <h3 className="registerTitle">이메일</h3>
          <ValidMessage>{emailValid}</ValidMessage>
          <input name="email" type="text" placeholder="이메일" required value={email} onChange={onChange} />
        </div>
        <div>
          <h3 className="registerTitle">비밀번호</h3>
          <ValidMessage>{passwordValid}</ValidMessage>
          <input name="password" type="password" placeholder="비밀번호" required value={password} onChange={onChange} />
          <ValidMessage>{confirmPwValie}</ValidMessage>
          <input
            name="confirmPw"
            type="password"
            placeholder="비밀번호 확인"
            required
            value={confirmPw}
            onChange={onChange}
          />
        </div>
        <div>
          <h3 className="registerTitle">닉네임</h3>
          <input
            name="nickName"
            type="text"
            placeholder="별명(2 ~ 15자)"
            maxLength="15"
            required
            value={nickName}
            onChange={onChange}
          />
        </div>
        <ValidMessage>{userValid}</ValidMessage>
        <Button className={isActive ? 'activeBtn' : 'unactiveBtn'} type="submit" value="회원가입" disabled={!isActive}>
          회원가입
        </Button>
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
