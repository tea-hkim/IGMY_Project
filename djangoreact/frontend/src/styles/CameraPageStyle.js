import styled from 'styled-components';

export const LogoStyle = styled.img`
  width: 22vw; //모바일 100vw
  margin: 0 auto;
  border: 0.4rem solid #b4a2eb;
  border-radius: 0.4rem;
`;

export const InfoStyle = styled.div`
  display: flex;
  margin: 2rem auto;
  width: 40vw; //모바일 90vw
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

  .scanning {
    font-size: 1.5rem;
    font-weight: bold;
    margin: auto;
    padding: 2.5rem;
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
  width: 22vw; //모바일 60vw
  height: 22vw; //모바일 70vw
`;

export const ButtonStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem auto;

  > button + button {
    margin-left: 1rem;
  }

  button {
    padding: 0.5rem 0.5rem;
    border: 2px solid #b2acfa;
    border-radius: 7px;
    background-color: white;
    font-size: 1.2rem;
    color: #b4a2eb;
    &:hover {
      color: white;
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
