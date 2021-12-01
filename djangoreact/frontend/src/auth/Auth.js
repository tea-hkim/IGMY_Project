import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, initializeInput } from '../redux/authSlice';

// const ACCESS_EXPIRY_TIME = 5 * 60 * 1000;
const REFRESH_URL = 'http://localhost:8000/api/token/refresh/';
const dispatch = useDispatch();

export const Logout = () => {
  localStorage.removeItem('refresh');
  dispatch(initializeInput());
};

export const initializeUser = async () => {
  const formData = new FormData();
  const refreshToken = localStorage.getItem('refresh');

  if (!refreshToken) return;

  formData.append('refresh', refreshToken);

  try {
    const { data } = await axios.post(REFRESH_URL, formData);
    const { access, username } = data;
    dispatch(login({ username, access }));
  } catch (error) {
    localStorage.removeItem('refresh');
  }
};

export const onSilentRefresh = () => {
  const formData = new FormData();
  const refreshToken = sessionStorage.getItem('refresh');

  if (!refreshToken) return;
  try {
    const { data } = axios.post(REFRESH_URL, formData);
    const { access, username } = data;
    dispatch(login({ username, access }));
  } catch (error) {
    sessionStorage.removeItem('refresh');
  }
};
