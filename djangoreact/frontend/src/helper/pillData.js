import React from 'react';
import * as biIcons from 'react-icons/bi';
import * as bsIcons from 'react-icons/bs';

export const PillShapeData = [
  {
    title: '선택안함',
    shape: '선택안함',
  },
  {
    title: '원형',
    shape: '원형',
    icon: <bsIcons.BsCircle size="1.25rem" />,
  },
  {
    title: '타원형',
    shape: '타원형',
    icon: <img src="image/oval.png" alt="타원형" style={{ height: '1.25rem' }} />,
  },
  {
    title: '반원형',
    shape: '반원형',
    icon: <img src="image/semicircle.png" alt="타원형" style={{ height: '1.25rem' }} />,
  },
  {
    title: '삼각형',
    shape: '삼각형',
    icon: <bsIcons.BsTriangle size="1.25rem" />,
  },
  {
    title: '사각형',
    shape: '사각형',
    icon: <biIcons.BiRectangle size="1.25rem" />,
  },
  {
    title: '마름모형',
    shape: '마름모형',
    icon: <bsIcons.BsDiamond size="1.25rem" />,
  },
  {
    title: '장방형',
    shape: '장방형',
    icon: <bsIcons.BsFile size="1.25rem" />,
  },
  {
    title: '오각형',
    shape: '오각형',
    icon: <bsIcons.BsPentagon size="1.25rem" />,
  },
  {
    title: '육각형',
    shape: '육각형',
    icon: <bsIcons.BsHexagon size="1.25rem" />,
  },
];

export const PillColorData = [
  {
    title: '선택안함',
  },
  {
    title: '하양',
    color: 'white',
  },
  {
    title: '노랑',
    color: 'yellow',
  },
  {
    title: '주황',
    color: 'orange',
  },
  {
    title: '분홍',
    color: 'pink',
  },
  {
    title: '빨강',
    color: 'red',
  },
  {
    title: '갈색',
    color: 'brown',
  },
  {
    title: '연두',
    color: '#90e706',
  },
  {
    title: '초록',
    color: 'green',
  },
  {
    title: '청록',
    color: '#007379',
  },
];
