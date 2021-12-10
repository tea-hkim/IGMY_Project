import React from 'react';

const KakaoLogin = () => {
  const CLIENT_ID = 'a99d9ab952d8ff978691e6981a20b3f4';
  const REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
  const KAKAO_OAUTH_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <a href={KAKAO_OAUTH_URI}>
      <img src="image/카카오 버튼 PNG.png" alt="카카오버튼" />
    </a>
  );
};

export default KakaoLogin;
