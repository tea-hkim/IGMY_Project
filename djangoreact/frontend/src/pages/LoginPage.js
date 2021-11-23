import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AuthContainer,
  AuthTitle,
  LineBox,
  Or,
  Line,
  Button,
  LoginForm,
  AuthFooterBox,
  AuthFooterContent,
  ValidMessage,
} from '../styles/AuthStyle';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEamil(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChecked = (event) => {
    if (!event.target.checked) {
      setAutoLogin(false);
    } else {
      setAutoLogin(true);
    }
  };

  const handleClick = () => {
    navigate('/register');
  };

  // 이메일, 패스워드 유효성 검사
  let userValid = '';
  let isActive = false;
  if (email === '' || password === '') {
    userValid = '빈 칸을 모두 채워주세요';
  } else {
    isActive = true;
  }

  return (
    <AuthContainer>
      <AuthTitle>로그인</AuthTitle>
      <div>
        <Button type="button" kakao>
          <img src="images/카카오톡 아이콘.png" alt="카카오톡 이모티콘" />
          카카오 계정으로 로그인
        </Button>
        <LineBox>
          <Or> 또는 </Or>
          <Line />
        </LineBox>
      </div>
      <LoginForm onSubmit={onSubmit}>
        <div className="emailBox">
          <h3 className="registerTitle">이메일</h3>
          <input name="email" type="text" placeholder="이메일" required value={email} onChange={onChange} />
        </div>
        <div className="passwordBox">
          <h3 className="registerTitle">비밀번호</h3>
          <input name="password" type="password" placeholder="비밀번호" required value={password} onChange={onChange} />
        </div>
        <ValidMessage>{userValid}</ValidMessage>
        <Button className={isActive ? 'activeBtn' : 'unactiveBtn'} type="submit" value="로그인" disabled={!isActive}>
          로그인
        </Button>
      </LoginForm>
      <div className="confirmAutoLogin">
        <input type="checkbox" chekced={autoLogin} onChange={onChecked} />
        자동로그인
      </div>
      <AuthFooterBox>
        <AuthFooterContent>
          <div>아직 이게모약 계정이 없으신가요?</div>
          <div tabIndex="0" role="button" onClick={handleClick} onKeyDown={handleClick}>
            가입하기
          </div>
        </AuthFooterContent>
        <Line />
        <AuthFooterContent>
          <div>혹시 비밀번호를 잊으셨나요?</div>
          <div>비밀번호 재설정</div>
        </AuthFooterContent>
      </AuthFooterBox>
    </AuthContainer>
  );
};

export default LoginPage;
