import React from 'react';
import { useNavigate } from 'react-router-dom';

const FindPwPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };
  return (
    <div className="findPw">
      <form className="findPw">
        <h2>가입할 때 등록하신 이메일을 입력해주세요</h2>
        <input type="text" className="findPw" name="userEmail" placeholder="이메일 주소 입력" />
        <button type="submit">이메일로 비밀번호 받기</button>
      </form>
      <div tabIndex="0" role="button" onClick={handleClick} onKeyDown={handleClick}>
        로그인 하기
      </div>
    </div>
  );
};

export default FindPwPage;
