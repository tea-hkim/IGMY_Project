import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { ButtonStyle } from '../styles/CameraPageStyle';
import WhiteNavbar from '../components/WhiteNavbar';
import {
  SuccessPage,
  modalStyles,
  ContainerWrap,
  ScanContainer,
  ScanBox1,
  ScanBox2,
  ScanImgStyle,
  ScanInfoStyle,
  InfoButton,
} from '../styles/ScanPageStyle';

const ScanSuccessPage = () => {
  Modal.setAppElement('#root');
  const navigate = useNavigate();
  const location = useLocation();
  const [pillName, setPillName] = useState();
  const [pillImg, setPillImg] = useState();
  const [pillNum, setPillNum] = useState();
  const [probability, setProbability] = useState();
  const [hundred, setHundred] = useState(false);
  const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  const [isOpen3, setOpen3] = useState(false);

  useEffect(() => {
    setPillName(location.state.pillName);
    setPillImg(location.state.pillImg);
    setPillNum(location.state.pillNum);
    setProbability(location.state.probability);

    if (location.state.probability === '100.00%') {
      setHundred(true);
    }
  }, [pillName, pillImg, pillNum, probability]);

  return (
    <>
      <WhiteNavbar />
      <SuccessPage>
        <ContainerWrap>
          <h1>검색 결과</h1>
          <ScanContainer>
            <ScanBox1>
              <ScanImgStyle src={pillImg} alt="스캔된 사진" onClick={() => setOpen1(true)} />
              <Modal isOpen={isOpen1} style={modalStyles} onRequestClose={() => setOpen1(false)}>
                <img src={pillImg} alt="스캔된 사진" style={{ width: '100%', height: '100%' }} />
              </Modal>
              <ScanInfoStyle>
                <h1>
                  [{pillName}] 일 확률 {probability}
                </h1>
                <InfoButton type="button" onClick={() => navigate('/pilldetail', { state: { pillNum } })}>
                  해당 약 정보 확인
                </InfoButton>
              </ScanInfoStyle>
            </ScanBox1>
            <ScanBox2 hundred={hundred}>
              <ScanImgStyle src="images/스캔알약샘플.png" alt="스캔된 사진" onClick={() => setOpen2(true)} />
              <Modal isOpen={isOpen2} style={modalStyles} onRequestClose={() => setOpen2(false)}>
                <img src="images/스캔알약샘플.png" alt="스캔된 사진" style={{ width: '100%', height: '100%' }} />
              </Modal>
              <ScanInfoStyle>
                <p>[인데놀 정]일 확률 85%</p>
                <InfoButton type="button" onClick={() => navigate('')}>
                  해당 약 정보 확인
                </InfoButton>
              </ScanInfoStyle>
            </ScanBox2>
            <ScanBox2 hundred={hundred}>
              <ScanImgStyle src="images/스캔알약샘플.png" alt="스캔된 사진" onClick={() => setOpen3(true)} />
              <Modal isOpen={isOpen3} style={modalStyles} onRequestClose={() => setOpen3(false)}>
                <img src="images/스캔알약샘플.png" alt="스캔된 사진" style={{ width: '100%', height: '100%' }} />
              </Modal>
              <ScanInfoStyle>
                <p>[인데놀 정]일 확률 85%</p>
                <InfoButton type="button" onClick={() => navigate('')}>
                  해당 약 정보 확인
                </InfoButton>
              </ScanInfoStyle>
            </ScanBox2>
          </ScanContainer>
        </ContainerWrap>
        <ButtonStyle>
          <button type="button" onClick={() => navigate('/camera')}>
            다시 찍기
          </button>
        </ButtonStyle>
      </SuccessPage>
    </>
  );
};

export default ScanSuccessPage;
