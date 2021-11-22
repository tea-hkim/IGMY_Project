import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailCheck, passwordCheck } from '../components/checkUserInfo';
import { login } from '../redux/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login);
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
      window.alert('아이디와 이메일을 모두 입력해 주세요');
    } else if (!emailCheck(email)) {
      window.alert('이메일 형식에 맞지 않습니다');
    } else if (!passwordCheck(password)) {
      window.alert('비밀번호 형식에 맞지 않습니다');
    } else {
      dispatch(login({ email, password }));
    }
  };

  const onChecked = (event) => {
    if (!event.target.checked) {
      setAutoLogin(false);
    } else {
      setAutoLogin(true);
    }
  };

  console.log(userInfo);

  return (
    <>
      <h2>로그인</h2>
      <button type="button">카카오 계정으로 로그인</button>
      <div>또는</div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="이메일" required value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="비밀번호" required={password} onChange={onChange} />
        <input type="submit" value="로그인" />
      </form>
      <div className="confirmAutoLogin">
        <input type="checkbox" chekced={autoLogin} onChange={onChecked} />
        자동로그인
      </div>
      <div>
        <div>아직 이게모약 계정이 없으신가요?</div>
        <p>가입하기</p>
      </div>
      <div>
        <div>혹시 비밀번호를 잊으셨나요?</div>
        <p>비밀번호 재설정</p>
      </div>
    </>
  );
};

export default LoginPage;