import React, { useState } from 'react';

const Auth = () => {
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
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
  return (
    <>
      <h2>로그인</h2>
      <button type="button">카카오 계정으로 로그인</button>
      <div>또는</div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="이메일 주소" required value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="페스워드" required={password} onChange={onChange} />
        <div>자동로그인</div>
        <input type="submit" value="Log In" />
      </form>
      <div>
        <span>아직 이게모약 계정이 없으신가요?</span>
        <span>가입하기</span>
      </div>
      <div>혹시 비밀번호를 잊으셨나요?</div>
    </>
  );
};

export default Auth;
