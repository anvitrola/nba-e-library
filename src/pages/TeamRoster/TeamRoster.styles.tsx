import styled from "styled-components";
import BlueBackGround from '../../assets/images/blue-bg.jpeg'
import GrayBackGround from '../../assets/images/gray-bg.jpeg'


export const TeamRosterContainer = styled.main`
  grid-area: main;
  z-index: 100;

  display: flex;
  flex-direction: column;

  justify-content: center;

  height: auto;
  margin-top: 8rem;
`;


export const TeamListContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem;

  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.66),
    rgba(0, 0, 0, 0.66)
  ),
  url(${GrayBackGround});

  height: auto;
  min-height: 120vh;

  margin-top: 2rem;
`;

export const PlayerStatsContainer = styled.section`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: end;
  padding: 1rem 2rem;

  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.66),
    rgba(0, 0, 0, 0.66)
  ),
  url(${BlueBackGround});

  opacity: 85%;
`;
