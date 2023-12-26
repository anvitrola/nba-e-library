import styled from "styled-components";

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
  url("https://wallpaper.dog/large/896692.jpg");


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
  margin-top: 10rem;

  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.66),
    rgba(0, 0, 0, 0.66)
  ),
  url("https://3.bp.blogspot.com/-O3p7F4N8ZLU/T3oNcqX2Y1I/AAAAAAAAE4k/hYZ8vkIC4WM/s1600/nbawregu.jpg");
`;
