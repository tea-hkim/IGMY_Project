import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, register } from '../redux/authSlice';

export async function Login({ email, password }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginURL = 'http://localhost:8000/api/login/';
  const userData = { email, password };

  const response = await axios.post(loginURL, userData);

  if (response.success === 'True') {
    const { token } = response;
    dispatch(login({ email, password, token }));
    localStorage.setItem('userToken', token);
    navigate('/');
  }

  if (response.message) {
    throw new Error('로그인에 실패했습니다.');
  }

  throw new Error('서버 통신이 원할하지 않습니다.');
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
