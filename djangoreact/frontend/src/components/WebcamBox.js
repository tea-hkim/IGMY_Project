import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { MdCameraswitch } from 'react-icons/md';
import { ContainerWrap, WebcamContainer, SwitchButton, ButtonStyle } from '../styles/WebcamBoxStyle';

const Webcamera = () => {
  const navigate = useNavigate();
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
    console.log(imageSrc);
  };

  const switchCamera = () => {
    setFacingMode((prevState) => (prevState === FACING_MODE_FRONT ? FACING_MODE_BACK : FACING_MODE_FRONT));
  };

  const resetCamera = () => {
    setImgSrc(null);
  };

  const submitCamera = () => {
    navigate('/scanning');
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
        <ButtonStyle>
          <button type="button" onClick={resetCamera}>
            다시 찍기
          </button>

          <button type="button" onClick={submitCamera}>
            선택 완료
          </button>
        </ButtonStyle>
      ) : (
        <>
          <SwitchButton>
            <MdCameraswitch size="2rem" onClick={switchCamera} />
          </SwitchButton>
          <ButtonStyle>
            <button id="takePhoto" type="button" onClick={captureCamera}>
              사진 촬영
            </button>
          </ButtonStyle>
        </>
      )}
    </ContainerWrap>
  );
};

export default Webcamera;
