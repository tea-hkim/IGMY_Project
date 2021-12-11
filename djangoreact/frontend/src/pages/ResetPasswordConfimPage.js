import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import { resetpasswordconfirm } from '../redux/authSlice';

const ResetPasswordConfirmPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid, token } = useParams();
  const [isSame, setIsSame] = useState('');
  const [formData, setFormData] = useState({
    newPassword: '',
    reNewPassword: '',
  });
  const { newPassword, reNewPassword } = formData;

  const resetPasswordConfirm = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ uid, token, newPassword });
    try {
      await axios.post(`${REACT_APP_HOST_IP_ADDRESS}auth/users/reset_password_confirm/`, body, config);
      dispatch(resetpasswordconfirm({ uid, token, newPassword }));
    } catch (error) {
      alert('요청이 잘못 되었습니다.');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== reNewPassword) {
      setIsSame('비밀번호가 일치하지 않습니다');
      return;
    }
    resetPasswordConfirm(uid, token, newPassword);
    navigate('/login');
  };

  const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  return (
    <PasswordConfirmDiv>
      <h1>새 비밀번호를 설정해주세요 🔐</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <FormField>
          <input
            className="form-control1"
            type="password"
            placeholder="새 비밀번호"
            name="newPassword"
            value={newPassword}
            pattern="^(?=.*[a-zA-Z])[0-9a-zA-Z]{8,50}$"
            onChange={(event) => onChange(event)}
            required
          />
        </FormField>
        <FormField>
          <input
            className="form-control2"
            type="password"
            placeholder="새 비밀번호 확인"
            name="reNewPassword"
            value={reNewPassword}
            onChange={(event) => onChange(event)}
            pattern="^(?=.*[a-zA-Z])[0-9a-zA-Z]{8,50}$"
            required
          />
        </FormField>
        <h2>{isSame}</h2>
        <Button className="btn btn-primary" type="submit">
          비밀번호 재설정
        </Button>
      </form>
    </PasswordConfirmDiv>
  );
};

export default ResetPasswordConfirmPage;

const PasswordConfirmDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  h2 {
    color: red;
    margin: 0 auto 1rem;
  }
`;

const Button = styled.button`
  background-color: lightgray;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  cursor: pointer;
  color: #666666;
  font-size: 1rem;
  margin: 0 auto;
  font-weight: bold;
  padding: 0.625rem 1.5rem;

  &:active {
    background: linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
    top: 1px;
  }
`;

const FormField = styled.div`
  position: relative;
  input {
    border-radius: 0.25em;
    border-style: solid;
    border-width: 2px;
    font-size: 1.5rem;
    padding: 0.5em 4em 0.5em 2em;
  }
`;
