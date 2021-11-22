import React, { useState } from 'react';
import { emailCheck, passwordCheck } from '../components/checkUserInfo';

const Auth = () => {
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
    // 이메일, 패스워드 유효성 검사
    if (email === '' || password === '') {
      window.alert('아dl디와 이메일을 모두 입력해 주세요');
    } else if (!emailCheck(email)) {
      window.alert('이메일 형식에 맞지 않습니다');
    } else if (!passwordCheck(password)) {
      window.alert('비밀번호 형식에 맞지 않습니다');
    }
  };

  const onChecked = (event) => {
    if (!event.target.checked) {
      setAutoLogin(false);
    } else {
      setAutoLogin(true);
    }
  };

  console.log(autoLogin);

  return (
    <>
      <h2>로그인</h2>
      <button type="button">카카오 계정으로 로그인</button>
      <div>또는</div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="이메일" required value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="비밀번호" required={password} onChange={onChange} />
        <div>
          <input type="checkbox" chekced={autoLogin} onChange={onChecked} />
          자동로그인
        </div>
        <input type="submit" value="로그인" />
      </form>
      <div>
        <div>아직 이게모약 계정이 없으신가요?</div>
        <div>가입하기</div>
      </div>
      <div>
        <div>혹시 비밀번호를 잊으셨나요?</div>
        <div>비밀번호 재설정</div>
      </div>
    </>
  );
};

export default Auth;
