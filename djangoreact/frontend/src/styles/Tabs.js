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
    border-top: 2px solid blue;
    border-bottom: none;
    border-left: none;
    border-right: none;
  }
`;

export const ContentTabs = styled.div`
  .content {
    background: white;
    padding: 1.25rem;
    width: 100%;
    height: 100%;
    display: none;
  }
  .content h2 {
    padding-bottom: 5px;
  }
  .content hr {
    width: 100px;
    height: 2px;
    background: #222;
    margin-bottom: 0.313rem;
  }
  .content p {
    width: 100%;
    height: 100%;
  }
  .active-content {
    display: block;
  }
`;
