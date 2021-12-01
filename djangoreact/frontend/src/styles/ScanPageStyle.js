import styled from 'styled-components';

export const modalStyles = {
  overlay: {
    backgroundColor: '#dee2e6',
  },
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '50%',
    borderRadius: '10px',
  },
};

export const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  > h1 {
    margin: 0 auto;
  }
`;

export const ScanContainer = styled.div`
  position: relative;
  width: 90vw;
  height: 60vh;
  margin: 1rem auto;
`;

export const ScanBox1 = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 80vw;
  height: 36%;
  border: 0.3rem solid #b4a2eb;
  background-color: #b2acfa;
  border-radius: 0.5rem;

  & + div {
    margin-top: 0.5rem;
  }
`;

export const ScanBox2 = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 76vw;
  height: 32%;
  border: 0.3rem solid #b4a2eb;
  background-color: #dee2e6;
  border-radius: 0.5rem;
  visibility: ${(props) => (props.hundred ? 'hidden' : 'visible')};

  & + div {
    margin-top: 0.5rem;
  }
`;

export const ScanImgStyle = styled.img`
  width: 40%;
  margin: 0.5rem;
  padding: 0.2rem;
  border-radius: 0.5rem;
  background-color: white;
`;

export const ScanInfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  margin: auto 0.5rem;

  > h1 {
    margin: 0 auto;
    font-size: 1rem;
  }

  > p {
    margin: 0 auto;
    font-size: 0.9rem;
  }
`;

export const InfoButton = styled.button`
  margin: 1rem auto 0 auto;
  padding: 0.2rem;
  width: 7rem;
  background-color: #b4a2eb;
  border-radius: 0.2rem;
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 70vw;
`;

export const FailInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  width: 100%;
  border: 0.5rem solid #b4a2eb;
  border-radius: 0.5rem;

  > h1 {
    font-size: 1rem;
    margin: 0.5rem auto;
    text-align: center;
  }

  > p {
    font-size: 0.6rem;
    margin: 0.2rem auto;
    text-align: center;
  }

  > img {
    width: 60%;
    height: 60%;
    margin: 1rem auto;
  }
`;
