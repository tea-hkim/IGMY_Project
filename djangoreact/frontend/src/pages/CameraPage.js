/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WhiteNavbar from '../components/WhiteNavbar';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import {
  CameraPageContainer,
  LogoStyle,
  InfoStyle,
  ContainerWrap,
  WebcamContainer,
  ButtonStyle,
  PreviewImgStyle,
  InputLabel,
} from '../styles/CameraPageStyle';

const CameraPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [imgSrc, setImgSrc] = useState();
  const [isLoading, setLoading] = useState(false);

  const submitImg = async () => {
    const URL = `${REACT_APP_HOST_IP_ADDRESS}api/result-photo/`;
    const formData = new FormData();
    formData.append('files', file[0]);

    // 로딩중..
    setLoading(true);

    try {
      console.log('file', file[0]);
      const response = await axios.post(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

      // 로딩끝!
      setLoading(false);

      alert(response.data);

      navigate('/scansuccess', {
        state: {
          probability: response.data['1.확률'], // 인공지능 확률
          pillName: response.data['1.알약'][0].item_name, // 약 이름
          pillNum: response.data['1.알약'][0].item_num, // 일련번호
          pillImg: response.data['1.알약'][0].image, // 약 사진
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const resetImg = () => {
    setImgSrc();
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
      <WhiteNavbar />
      <CameraPageContainer className="camerapage_container">
        <div className="camerapage_header">
          <h1>사진으로 검색</h1>
        </div>
        <InfoStyle>
          {!isLoading ? (
            <>
              <p>
                옆의 사진과 같이
                <br />
                중앙에 약의 모양이 가득 채워지고
                <br />
                각인이 잘 보일 수 있도록 촬영해주세요!
              </p>
              <img src="image/알약샘플.png" alt="알약샘플" />
            </>
          ) : (
            <p className="scanning">인공지능이 알약을 분석하는 중입니다...</p>
          )}
        </InfoStyle>
        {/* 컴포넌트 구분선 */}
        <ContainerWrap>
          {!isLoading ? (
            <>
              <WebcamContainer>
                {!imgSrc ? (
                  <>
                    <InputLabel htmlFor="files">
                      <PreviewImgStyle src="image/이게모약로고.png" alt="알약사진" />
                    </InputLabel>
                    <input
                      id="files"
                      name="files"
                      type="file"
                      // capture="camera"
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
                <>
                  <InputLabel htmlFor="files">
                    <PreviewImgStyle src="image/이게모약로고.png" alt="알약사진" />
                  </InputLabel>
                  <input
                    id="files"
                    name="files"
                    type="file"
                    capture="camera"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files)}
                  />
                </>
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
            </>
          ) : (
            <LogoStyle src="image/loading.gif" alt="로딩중" />
          )}
        </ContainerWrap>
      </CameraPageContainer>
    </>
  );
};

export default CameraPage;
