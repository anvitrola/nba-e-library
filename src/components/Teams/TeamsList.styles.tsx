import styled from "styled-components";

export const TeamsListContainer = styled.section`
  display: flex;

  height: auto;
  padding: 1rem;

  align-items: center;
  justify-content: space-evenly;
`;

export const ListsContainer = styled.div`
  width: 50%;
  overflow: auto;

  padding: 1rem;
  height: 70vh;

  background: var(--blue);
  border-radius: 4px;

  display: flex;
  flex-direction: column;
`;

export const DetailsContainer = styled.div`
  width: 40%;

  padding: 1rem;
  height: 50vh;

  background: var(--red);
  border-radius: 4px;

  display: flex;
  flex-direction: column;

  justify-content: space-evenly;
  

  h1, h3, span {
    color: var(--white);
  }

  span { 
    font-weight: 600;
  }
`;
