import styled, { css } from 'styled-components';

export const NonSigninNavigationContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 15;
`;

export const InputField = styled.input`
  border: none;
  width: 17rem;
  height: 3rem;
  margin: 1.125rem;
  padding: 0 0.825rem;
  border-radius: 3px;

  :focus {
    border: none;
    outline: none;
  }
`;

export const Button = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: #0d6efd;
  color: #ffffff;
  margin: 1.2rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 4px;

  display: inline-block;
  width: auto;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;

  transition: 0.5s;
  :active,
  :hover,
  :focus {
    background: #7b9bfd;
    outline: 0;
  }
  ${(props) =>
    props.large &&
    css`
      background: #7b9bfd;
      :active,
      :hover,
      :focus {
        background: #0d6efd;
        outline: 0;
      }
    `}
`;
