import styled from "styled-components";

export const BannerContainer = styled.section`
  z-index: 0;

  overflow: hidden;

  video {
    background-size: cover;
    background-position: 50% 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.4);

  }
`;

export const ScrollContentContainer = styled.div`
  position: absolute;
  top: 90vh;
  left: 48%;
  color: var(--white);
  font-weight: 600;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  font-size: 12px;
  text-transform: uppercase;
`;

export const ScrollDownLine = styled.div`
  width: 1px;
  height: 60px;
  margin-top: 0.5rem;
  background-color: #fff;
`;
