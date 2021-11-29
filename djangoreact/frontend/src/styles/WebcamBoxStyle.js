import styled from 'styled-components';

export const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 30vw;
`;

export const WebcamContainer = styled.div`
  video {
    width: 100%;
  }
  border: 0.4rem solid #b4a2eb;
  border-radius: 0.4rem;
`;

export const SwitchButton = styled.div`
  position: absolute;
  margin: 1rem 1rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ButtonStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem auto;

  > svg + button {
    margin-left: 1rem;
  }

  > button + button {
    margin-left: 1rem;
  }

  button {
    border-radius: 5px;
    background-color: '#E1C1F5';
    font-size: 1.125rem;
    &:hover {
      background-color: '#B4A2EB';
      font-weight: 800;
    }
  }
`;
