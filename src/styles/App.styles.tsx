import styled from "styled-components";

export const AppBody = styled.div`
  height: auto;
  display: grid;
  grid-template-rows: auto 263px;

  background-color: var(--dark-gray);
  grid-template-areas:
    "main main main"
    "footer footer footer";
`;

export const AppBg = styled.div`
  position: fixed;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.66),
      rgba(0, 0, 0, 0.66)
    ),
    url("https://assets.website-files.com/611151d2308094b62cb7a988/61115c158d2377c8d66c32fc_nba-90%20(1).jpeg");

  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-position: 0px 0px, 50% 50%;
  background-size: auto, cover;
`;
