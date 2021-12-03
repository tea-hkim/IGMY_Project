import React from 'react';
import styled from 'styled-components';

export const AboutUs = ({ engName, name, position, mbti, url, email, blog, comment }) => {
  const frontImg = `images/ar/${name}.png`;
  const backImg = `images/ar/${name}표정.png`;

  const handleClick = (event) => {
    const elem = event.currentTarget;
    if (elem.style.transform === 'rotateY(180deg)') {
      elem.style.transform = 'rotateY(0deg)';
    } else {
      elem.style.transform = 'rotateY(180deg)';
    }
  };

  return (
    <Card className="card-inner" onClick={handleClick}>
      <Content className="front">
        <img src={frontImg} alt={`${name} 앞면 이미지`} style={{ width: '200px', height: '200px' }} />
        <h2>{engName}</h2>
        <h4>{position}</h4>
      </Content>
      <Content className="back">
        <div className="back_header">
          <img src={backImg} alt={`${name} 뒷면 이미지`} style={{ width: '150px', height: '150px' }} />
          <h2>
            {name} ({mbti})
          </h2>
          <h4>{position}</h4>
        </div>
        <div className="back_content">
          <h4>{blog ? '블로그' : '이메일'}</h4>
          <a href={url}>
            {blog}
            {email}
          </a>
          <p>{comment}</p>
        </div>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  margin: 0 auto 1.875rem;
  width: 300px;
  height: 400px;
  perspective: 1000px;
  transition: transform 1.2s;
  transform-style: preserve-3d;
  position: relative;
  .front {
    box-sizing: border-box;
    padding: 0.625rem 1.875rem;
    transform: rotateY(0deg);
    border-radius: 0.313rem;
    background-color: white;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4);
    h4 {
      font-size: 20px;
      color: rgba(0, 0, 0, 0.7);
      margin-top: 5px;
    }
  }
  .back {
    box-sizing: border-box;
    padding: 0.625rem 1.875rem;
    transform: rotateY(180deg);
    background-color: #faf78e;
    border-radius: 0.313rem;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: flex-start;
    .back_header {
      display: flex;
      flex-direction: column;
      align-items: center;
      h4 {
        font-size: 1.2rem;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .back_content {
      width: 90%;
      margin-top: 0.625rem;
      font-family: 'Kyobo_handwriting';
      font-weight: 600;
      font-size: 1.125rem;
      p {
        text-align: start;
        margin-top: 0.625rem;
      }
      a {
        text-decoration: none;
        color: blue;
      }
    }
  }
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  background-color: white;
`;
