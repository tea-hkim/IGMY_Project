import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetpasswordconfirm } from '../redux/authSlice';

const ResetPasswordConfirmPage = () => {
  const { uid, token } = useParams();
  const dispatch = useDispatch();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
  });
  // eslint-disable-next-line camelcase
  const { new_password, re_new_password } = formData;

  const resetPasswordConfirm = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ uid, token, new_password });

    try {
      await axios.post('http://127.0.0.1:8000/auth/users/reset_password_confirm/', body, config);

      dispatch(resetpasswordconfirm({ uid, token, new_password }));
    } catch (error) {
      alert('요청이 잘못 되었따!');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    resetPasswordConfirm(uid, token, new_password);
    setRequestSent(true);
  };

  const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  if (requestSent) {
    return <useNavigate to="/" />;
  }

  return (
    <div className="container mt-5">
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="New Password"
            name="new_password"
            // eslint-disable-next-line camelcase
            value={new_password}
            onChange={(event) => onChange(event)}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm New Password"
            name="re_new_password"
            // eslint-disable-next-line camelcase
            value={re_new_password}
            onChange={(event) => onChange(event)}
            minLength="6"
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

export default ResetPasswordConfirmPage;
