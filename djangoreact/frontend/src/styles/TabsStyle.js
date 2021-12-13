/* eslint-disable */

import styled from 'styled-components';

export const Horizon = styled.hr`
  margin: 0.625rem auto;
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 60vw;
  @media screen and (max-width: 48em) {
    width: 100%;
  }
`;

export const BlockTabs = styled.div`
  .bloc-tabs {
    display: flex;
  }
  .tabs {
    height: 3rem;
    text-align: center;
    width: 50%;
    background: rgba(128, 128, 128, 0.075);
    cursor: pointer;
    border: 1px solid rgba(98, 42, 230, 1);
    position: relative;
  }

  .active-tabs {
    background: white;
  }
  @media screen and (max-width: 48em) {
    .tabs, .active-tabs {
      font-size: 1.05rem;
    }
  }
`;

export const ContentTabs = styled.div`
  .content {
    background: white;
    padding: 1.25rem;
    width: 100%;
    height: 100%;
    display: none;
    position: relative;
  }
  .content h2 {
    padding-bottom: 5px;
    font-weight: bold;
  }
  .content hr {
    // width: 30rem;
    height: 0.1rem;
    background: #222;
    margin-bottom: 1rem;
  }
  .content p {
    width: 100%;
    height: 100%;
  }
  .active-content {
    display: block;
  }
  .toggle_header {
    display: flex;
  }

  @media screen and (max-width: 48em) {
    .content h2 {
      font-size: 1.25rem;
    }
    .active-content button {
      display: block;
      width: 88%;
      margin-top: 3.5rem;
      font-size: 1.3rem;
      font-weight: 600;
    }
    .toggle_header {
      display: flex;
      flex-direction: column;
      min-height : 4.5rem;
      // justify-content: center;
      // align-items: center;
    }
  }
`;

export const SavePillButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem 1.5rem 0 0;
  border-radius: 5px;
  background-color: #b2acfa;
  padding: 0.2rem 0.5rem;
  font-size: 1rem;
  font-weight: 800;
  color: black;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #b4a2eb;
    transform: scale(1.02);
  }
`;
