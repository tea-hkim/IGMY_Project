import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, initializeInput } from '../redux/authSlice';

// const ACCESS_EXPIRY_TIME = 5 * 60 * 1000;
const LOGOUT_URL = 'http://localhost:8000/api/logout/';
const dispatch = useDispatch();

export const Logout = async () => {
  try {
  } catch (err) {
    console.log(err);
  }
  localStorage.removeItem('refresh');
  dispatch(initializeInput());
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
