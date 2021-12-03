import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { resetpassword } from '../redux/authSlice';

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });
  const { email } = formData;

  const resetPassword = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email });

    try {
      await axios.post('http://127.0.0.1:8000/auth/users/reset_password/', body, config);

      dispatch(resetpassword({ email }));
    } catch (error) {
      alert('요청이 잘못 되었따.');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    resetPassword(email);
    setRequestSent(true);
  };

  const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  if (requestSent) {
    return <useNavigate to="/" />;
  }

  return (
    <div className="container mt-5">
      <h1>비밀번호를 변경하고 싶은 이메일을 작성해 주세요:</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(event) => onChange(event)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          비밀번호 재설정
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
