export const emailCheck = (email) => {
  const reg = /[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*\.[a-zA-Z]{3,}/;
  return reg.test(email);
};

export const passwordCheck = (password) => {
  const reg = /^(?=.*[a-zA-Z])[0-9a-zA-Z]{8,50}$/;
  return reg.test(password);
};

export const nicknameCheck = (nickname) => {
  const reg = /[가-힣a-zA-z]{2,8}/;
  return reg.test(nickname);
};
