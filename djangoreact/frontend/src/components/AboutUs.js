import React from 'react';

export const AboutUs = ({ name, position, info }) => {
  const frontImg = `images/ar/${name}.png`;
  const backImg = `images/ar/${name}표정.png`;

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={frontImg} alt={`${name} 앞면 이미지`} style={{ width: '300px', height: '300px' }} />
        </div>
        <div className="flip-card-back">
          <img src={backImg} alt={`${name} 뒷면 이미지`} style={{ width: '300px', height: '300px' }} />
          <h2>{name}</h2>
          <p>{position}</p>
          <p>{info}</p>
        </div>
      </div>
    </div>
  );
};
