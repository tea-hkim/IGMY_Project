import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { resetpasswordconfirm } from '../redux/authSlice';

const ResetPasswordConfirmPage = () => {
  const dispatch = useDispatch();
  const { uid, token } = useParams();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
  });
  // const [isActive, setIsActive] = useState(false);
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
      await axios.post(`${process.env.REACT_APP_HOST_IP_ADDRESS}auth/users/reset_password_confirm/`, body, config);

      dispatch(resetpasswordconfirm({ uid, token, new_password }));
    } catch (error) {
      alert('요청이 잘못 되었습니다.');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    resetPasswordConfirm(uid, token, new_password);
    setRequestSent(true);
  };

  const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  // if (formData.new_password === formData.re_new_password) {
  //   setIsActive(true);
  // }

  if (requestSent) {
    return <useNavigate to="/login" />;
  }

  return (
    <PasswordConfirmDiv>
      <h1>새 비밀번호를 설정해주세요 🔐</h1>
      <br />
      <form onSubmit={(event) => onSubmit(event)}>
        <FormField>
          <input
            className="form-control1"
            type="password"
            placeholder="새 비밀번호"
            name="new_password"
            // eslint-disable-next-line camelcase
            value={new_password}
            onChange={(event) => onChange(event)}
            pattern="^(?=.*[a-zA-Z])[0-9a-zA-Z]{8,50}$"
            required
          />
          <span />
        </FormField>
        <br />
        <FormField>
          <input
            className="form-control2"
            type="password"
            placeholder="새 비밀번호 확인"
            name="re_new_password"
            // eslint-disable-next-line camelcase
            value={re_new_password}
            onChange={(event) => onChange(event)}
            pattern="^(?=.*[a-zA-Z])[0-9a-zA-Z]{8,50}$"
            required
          />
          <span />
        </FormField>
        <br />
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
  height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #666666;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;

  &:hover {
    background: linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
    background-color: #f6f6f6;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;

const FormField = styled.div`
  position: relative;
  > input {
    border-radius: 0.25em;
    border-style: solid;
    border-width: 2px;
    font-size: 1.5rem;
    padding: 0.5em 4em 0.5em 2em;

    :valid {
      border-color: forestgreen;

      + span::after {
        position: absolute;
        right: 1em;
        top: 50%;
        transform: translateY(-50%);
        content: '✔️';
      }
    }

    :invalid {
      border-color: firebrick;

      + span::after {
        position: absolute;
        right: 1em;
        top: 50%;
        transform: translateY(-50%);
        content: '❌';
      }
    }
  }
  > span {
    margin-left: 10px;
  }
`;
