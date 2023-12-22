import { Box, CircularProgress, Divider, Modal } from "@mui/material";
import {
  GamesListContainer,
  GamesCard,
  ListContainer,
} from "./GamesList.styles";
import { memo, useEffect, useState } from "react";
import { HttpClient } from "../../services/api";
import { GamesListItem } from "../../types/games";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GamesList = memo(function GamesList({
  teamIds = [1],
}: {
  teamIds: number[];
}) {
  const [gamesList, setGamesList] = useState<GamesListItem[]>([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [loading, setIsLoading] = useState(true);

  const [chosenGameId, setChosenGameId] = useState(1);
  const [chosenGameDetails, setChoseGameDetails] =
    useState<GamesListItem | null>(null);

  async function getGamesListByTeam() {
    const response = await HttpClient.get("/games", {
      params: { team_ids: teamIds },
    });

    if (response.data.data) {
      const data = response.data.data;
      setGamesList(data);
    }
  }

  async function getGameDetails(gameId: number) {
    const response = await HttpClient.get(`/games/${gameId}`);

    if (response.data) {
      setIsLoading(false);
      setChoseGameDetails(response.data);
    }
  }

  useEffect(() => {
    getGamesListByTeam();
  }, [teamIds]);

  useEffect(() => {
    getGameDetails(chosenGameId);
  }, [chosenGameId]);

  return (
    <>
      <GamesListContainer>
        <h1 className="font-bold mb-4 text-[color:var(--white)]">
          ## Matches_______________________{" "}
        </h1>
        <ListContainer>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {gamesList.length &&
                gamesList.map((game) => (
                  <GamesCard
                    key={game.id}
                    onClick={() => {
                      setIsDetailsModalOpen(true);
                      setChosenGameId(game.id);
                    }}
                  >
                    <h6 className="font-semi text-[color:var(--red)]">
                      Season {game.season}
                    </h6>
                    <span>{new Date(game.date).toDateString()}</span>

                    <h5 className="text-[color:var(--blue)] font-bold">
                      {game.home_team.name}
                    </h5>
                    <span>{game.home_team_score}</span>

                    <h4 className="font-bold text-[color:var(--red)]">X</h4>

                    <h5 className="text-[color:var(--blue)] font-bold">
                      {game.visitor_team.name}
                    </h5>
                    <span>{game.visitor_team_score}</span>
                  </GamesCard>
                ))}
            </>
          )}
        </ListContainer>
      </GamesListContainer>

      <Modal
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...modalStyle,
            width: 600,
            height: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "space-evenly",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <h2
            className="text-[color:var(--blue)] font-bold"
            id="parent-modal-title"
          >
            ___{chosenGameDetails?.visitor_team.name} x{" "}
            {chosenGameDetails?.home_team.name}_________________
          </h2>
          <ul className="mt-10">
            <li className="flex items-center justify-start mb-5">
              <span className="text-[color:var(--red)] font-bold">HOME</span>
              <span className="ml-20">
                {chosenGameDetails?.home_team.full_name}
              </span>
              <span className="ml-20">
                ({chosenGameDetails?.home_team.city})
              </span>
              <span className="ml-20">
                {chosenGameDetails?.home_team_score}
              </span>
            </li>
            <Divider />
            <li className="flex items-center justify-start mt-5">
              <span className="text-[color:var(--red)] font-bold">
                VISITOR{" "}
              </span>
              <span className="ml-20">
                {chosenGameDetails?.visitor_team.full_name}
              </span>
              <span className="ml-20">
                ({chosenGameDetails?.visitor_team.city})
              </span>
              <span className="ml-20">
                {chosenGameDetails?.visitor_team_score}
              </span>
            </li>
          </ul>
        </Box>
      </Modal>
    </>
  );
});

export default GamesList;