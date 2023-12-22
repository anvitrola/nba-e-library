import { Card } from "@mui/material";
import styled from "styled-components";

export const GamesListContainer = styled.section`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.66),
      rgba(0, 0, 0, 0.66)
    ),
    url("https://i.redd.it/m6up7z4yphh31.jpg");

  padding: 5rem 1rem;
`;

export const ListContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  

  justify-content: center;
  align-items: center;


`;

export const GamesCard = styled(Card)`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  width: 20%;
  justify-content: center;
  align-items: center;

  text-align: center;
  margin: 3px;
  padding: 1rem;

  span {
    display: none;
  }

  &:hover {
    background-color: var(--red);

    transform: rotateY(180deg);
    transition: transform 1s;

    h5,
    h6 {
      display: none;
    }

    h4 {
      color: var(--white);
    }

    span {
      color: var(--white);
      display: flex;
      font-weight: 800;
      text-align: center;
      transform: rotateY(180deg);
    }
  }
`;
