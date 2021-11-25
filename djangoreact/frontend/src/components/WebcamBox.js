import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';

const Webcamera = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const FACING_MODE_FRONT = 'user';
  const FACING_MODE_BACK = 'environment';
  const [facingMode, setFacingMode] = useState(FACING_MODE_FRONT);
  const videoConstraints = {
    facingMode: FACING_MODE_BACK,
  };

  const captureCamera = () => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: webcamRef.current.video.clientWidth,
      height: webcamRef.current.video.clientHeight,
    });
    setImgSrc(imageSrc);
  };

  const switchCamera = () => {
    setFacingMode((prevState) => (prevState === FACING_MODE_FRONT ? FACING_MODE_BACK : FACING_MODE_FRONT));
  };

  const resetCamera = () => {
    setImgSrc(null);
  };

  const submitCamera = () => {
    return null;
  };

  return (
    <ContainerWrap>
      <WebcamContainer>
        {imgSrc ? (
          <img src={imgSrc} alt="알약사진" />
        ) : (
          <Webcam
            mirrored
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            forceScreenshotSourceSize="true"
            videoConstraints={{
              ...videoConstraints,
              facingMode,
            }}
          />
        )}
      </WebcamContainer>
      {imgSrc ? (
        <ButtonContainer>
          <button type="button" onClick={resetCamera}>
            다시 찍기
          </button>
          <button type="button" onClick={submitCamera}>
            선택 완료
          </button>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <button id="switch" type="button" onClick={switchCamera}>
            앞뒤 전환
          </button>
          <button id="takePhoto" type="button" onClick={captureCamera}>
            사진 촬영
          </button>
        </ButtonContainer>
      )}
    </ContainerWrap>
  );
};

export default Webcamera;

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 30vw;
`;

const WebcamContainer = styled.div`
  video {
    width: 100%;
  }
  border: 0.4rem solid #b4a2eb;
  border-radius: 0.4rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem auto;

  > button + button {
    margin-left: 1rem;
  }
`;
