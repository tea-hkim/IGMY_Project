import React, { axios, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InfoStyle,
  ContainerWrap,
  WebcamContainer,
  ButtonStyle,
  PreviewImgStyle,
  InputLabel,
} from '../styles/CameraPageStyle';

const WebcamInfo = () => {
  return (
    <InfoStyle>
      <p>
        옆의 사진과 같이
        <br />
        중앙에 약의 모양이 가득 채워지고
        <br />
        각인이 잘 보일 수 있도록 촬영해주세요!
      </p>
      <img src="images/알약샘플.png" alt="알약샘플" />
    </InfoStyle>
  );
};

const CameraPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const submitImg = async () => {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('enctype', 'multipart/form-data');

    try {
      const response = axios.post(formData, 'localhost:8000/api/result-photo/', {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate('/scanning');
    } catch (err) {
      console.log(err);
    }
  };

  const resetImg = () => {
    setImgSrc(null);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(file[0]);
    }
  }, [file]);

  return (
    <>
      <WebcamInfo />
      {/* 컴포넌트 구분선 */}
      <ContainerWrap>
        <WebcamContainer>
          {!imgSrc ? (
            <>
              <InputLabel htmlFor="input-file">
                <PreviewImgStyle src="images/이게모약로고.png" alt="알약사진" />
              </InputLabel>
              <input
                id="input-file"
                type="file"
                capture="camera"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files)}
              />
            </>
          ) : (
            <PreviewImgStyle src={imgSrc} alt="알약사진" />
          )}
        </WebcamContainer>
        {!imgSrc ? (
          <div> </div>
        ) : (
          <ButtonStyle>
            <button type="button" onClick={resetImg}>
              다시 찍기
            </button>
            <button type="button" onClick={submitImg}>
              선택 완료
            </button>
          </ButtonStyle>
        )}
      </ContainerWrap>
    </>
  );
};

export default CameraPage;
