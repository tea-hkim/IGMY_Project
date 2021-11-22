import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailCheck, passwordCheck } from '../components/checkUserInfo';
import { register } from '../redux/authSlice';

const RegisterPage = () => {
  const [email, setEamil] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [nickName, setNickName] = useState('');
  const userInfo = useSelector((state) => state.login);
  const dispatch = useDispatch();

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

  const onSubmit = (event) => {
    event.preventDefault();
    // 이메일, 패스워드 유효성 검사
    if (email === '' || password === '' || nickName === '') {
      window.alert('아이디, 이메일, 닉네임을 모두 입력해 주세요');
    } else if (!emailCheck(email)) {
      window.alert('이메일 형식에 맞지 않습니다');
    } else if (!passwordCheck(password)) {
      window.alert('비밀번호 형식에 맞지 않습니다');
    } else {
      dispatch(register({ email, password, nickname: nickName }));
    }
  };

  return (
    <div>
      <section className="registerBox">
        <h2>회원가입</h2>
        <form onSubmit={onSubmit}>
          <h3>이메일</h3>
          <input name="email" type="text" placeholder="이메일" required value={email} onChange={onChange} />
          <h3>비밀번호</h3>
          <input name="password" type="password" placeholder="비밀번호" required={password} onChange={onChange} />
          <input
            name="confirmPw"
            type="password"
            placeholder="비밀번호 확인"
            required={confirmPw}
            onChange={onChange}
          />
          <div>
            <h3>닉네임</h3>
            <input
              name="nickName"
              type="text"
              placeholder="별명(2 ~ 15자)"
              maxLength="15"
              required={nickName}
              onChange={onChange}
            />
          </div>
          <input type="submit" value="회원가입" />
        </form>
        <div>
          이게모약 계정이 있으신가요?
          <p>로그인 하기</p>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
