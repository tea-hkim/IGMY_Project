import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, register } from '../redux/authSlice';

export async function Login({ email, password }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginURL = 'http://localhost:8000/api/login/';
  const userData = { email, password };

  const { data } = await axios.post(loginURL, userData);

  if (data.message === 'login success') {
    const { token } = data;
    dispatch(login({ email, password, token }));
    localStorage.setItem('userToken', token);
    navigate('/');
  } else if (data.message === 'no user') {
    alert('아이디가 잘못되었습니다');
  } else if (data.message === 'wrong password') {
    alert('패스워드가 틀렸습니다');
  }
}

export async function Register({ email, password, nickname }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerURL = 'http://localhost:8000/api/create/';
  const userData = { email, password, nickname };

  const response = await axios.post(registerURL, userData);

  if (response.message === 'ok') {
    dispatch(register({ email, password, nickname }));
    navigate('/login');
  }
  if (response.message === 'duplicate email') {
    throw new Error('가입되어 있는 이메일 입니다.');
  }
  throw new Error('서버 통신이 원할하지 않습니다.');
}

export const Logout = () => {
  localStorage.clear();
  dispatch(initializeInput());
};
