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
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
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
