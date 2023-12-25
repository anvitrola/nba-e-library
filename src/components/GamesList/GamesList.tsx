import { Box, CircularProgress, Divider, Modal, TablePagination } from "@mui/material";
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

  const [currentPage, setCurrentPage] = useState(0);
  const [totalGamesPages, setTotalGamesPages] = useState(0);

  const [chosenGameId, setChosenGameId] = useState<number | null>(null);
  const [chosenGameDetails, setChoseGameDetails] =
    useState<GamesListItem | null>(null);

  async function getGamesListByTeam(page: number) {
    try {
      const response = await HttpClient.get("/games", {
        params: { team_ids: teamIds, page },
      });

      if (response.data.data) {
        const data = response.data.data;
        const totalPages = response.data.meta.total_pages;

        setGamesList(data);
        setTotalGamesPages(totalPages);
        setIsLoading(false);
      }
    } catch (error) {
      // ToDo:  Handle the error, e.g., show a user-friendly message

      console.error("Error fetching games list:", error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  }

  async function getGameDetails(gameId: number) {
    try {
      const response = await HttpClient.get(`/games/${gameId}`);

      if (response.data) {
        setChoseGameDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching game details:", error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  }

  useEffect(() => {
    getGamesListByTeam(currentPage);
  }, [teamIds, currentPage]);

  useEffect(() => {
    if (chosenGameId) getGameDetails(chosenGameId);
  }, [chosenGameId]);

  return (
    <>
      <GamesListContainer>
        <h1 className="font-bold mb-4 text-[color:var(--white)]">
          ## Matches_______________________{" "}
        </h1>
        <ListContainer>
          {loading ? (
            <CircularProgress data-testid="games-list-loader" />
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

        <TablePagination
          sx={{ backgroundColor: "var(--white)", width: '20%', alignSelf: 'end' }}
          count={totalGamesPages}
          rowsPerPage={25}
          page={currentPage}
          rowsPerPageOptions={[10]}
          onPageChange={(_, page) => setCurrentPage(page)}
        />
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
          {chosenGameDetails && (
            <>
              <h2
                className="text-[color:var(--blue)] font-bold"
                id="parent-modal-title"
              >
                ___{chosenGameDetails?.visitor_team.name} x{" "}
                {chosenGameDetails?.home_team.name}_________________
              </h2>
              <ul className="mt-10">
                <li className="flex items-center justify-start mb-5">
                  <span className="text-[color:var(--red)] font-bold">
                    HOME
                  </span>
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
            </>
          )}
        </Box>
      </Modal>
    </>
  );
});

export default GamesList;
