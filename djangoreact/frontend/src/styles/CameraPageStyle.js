import styled from 'styled-components';

export const InfoStyle = styled.div`
  display: flex;
  margin: 2rem auto;
  width: 90vw;
  padding-left: 1rem;
  border: 0.5rem solid #b4a2eb;
  border-radius: 0.5rem;

  > img {
    float: right;
    width: 5rem;
    height: 5rem;
    margin: 1rem auto;
  }

  > p {
    font-size: 1rem;
    margin: auto;
  }
`;

export const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 90vw;
`;

export const WebcamContainer = styled.div`
  border: 0.4rem solid #b4a2eb;
  border-radius: 0.4rem;
  margin: 0 auto;
  width: 60vw;
  height: 70vw;
`;

export const ButtonStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem auto;

  > button + button {
    margin-left: 0.5rem;
  }

  button {
    border-radius: 7px;
    background-color: #b2acfa;
    font-size: 1.2rem;
    color: white;
    &:hover {
      background-color: #b4a2eb;
      font-weight: 800;
    }
  }
`;

export const PreviewImgStyle = styled.img`
  width: 100%;
  height: 100%;
`;

export const InputLabel = styled.label`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
