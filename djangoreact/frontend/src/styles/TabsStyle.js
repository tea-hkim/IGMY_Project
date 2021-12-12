import styled from 'styled-components';

export const Horizon = styled.hr`
  margin: 0.625rem auto;
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 60vw;
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
    width: 30rem;
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
