import styled from 'styled-components';

export const CameraPageContainer = styled.div`
  padding-top: 5vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .camerapage_header {
    width: 60vw;
  }
  h1 {
    color: white;
    margin-bottom: 1rem;
  }
`;

export const LogoStyle = styled.img`
  width: 22vw; //모바일 100vw
  margin: 0 auto;
  border: 0.4rem solid #b4a2eb;
  border-radius: 0.4rem;
`;

export const InfoStyle = styled.div`
  display: flex;
  height: 12vh;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.625rem 0;
  margin-bottom: 1rem;
  width: 60vw; //모바일 90vw
  border-radius: 5px;
  background-color: white;

  img {
    float: right;
    height: 100%;
  }

  > p {
    font-size: 1.25rem;
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
  width: 60vw;
  background-color: white;
  border-radius: 5px;
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
