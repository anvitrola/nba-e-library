import { useEffect, useRef, useState } from "react";
import { PlayersListTableItem } from "../../types/teams";
import { useParams } from "react-router-dom";
import {
  PlayerStatsContainer,
  TeamListContainer,
  TeamRosterContainer,
} from "./TeamRoster.styles";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import PlayerStatsTable from "../../components/PlayerStatsTable/PlayerStatsTable";
import { paginateArray } from "../../helpers/paginateArray";
import { getTeamPlayersList } from "../../services/get-team-players-list";
import BlueRedTriangle from '../../assets/images/blue-red-triangle.svg'
import BornIdentities from '../../assets/images/born-identities.svg'

export default function TeamRoster() {
  const { teamId, teamName } = useParams();

  const scrollToRef = useRef<null | HTMLDivElement>(null);

  const [playersList, setPlayersList] = useState<PlayersListTableItem[][]>([]);
  const [playersListByTeamMap, setPlayersListByTeamMap] = useState<
    Record<number | string, PlayersListTableItem[]>
  >({});

  const [selectedPlayerId, setSelectedPlayerId] = useState(0);
  const [getPlayerDetails, setGetPlayersDetails] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const playersListTableHeaders = ["PLAYERS", "POSITION"];

  useEffect(() => {
    const fetchTeamPlayersList = async () => {
      try {
        const playersList = await getTeamPlayersList();

        if (playersList) setPlayersListByTeamMap(playersList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team players list:", error);
      }
    };

    fetchTeamPlayersList();
  }, []);

  useEffect(() => {
    if (teamId && playersListByTeamMap[teamId]) {
      const playersList = playersListByTeamMap[teamId];

      const paginatedPlayersList = paginateArray(playersList, 10);

      setPlayersList(paginatedPlayersList);
    }
  }, [teamId, playersListByTeamMap]);

  return (
    <TeamRosterContainer>
      <TeamListContainer>
        <h2 className="text-[color:var(--white)] font-bold mb-8">
          # {teamName} Roster __________
        </h2>

        {loading ? (
          <CircularProgress />
        ) : (
          <div className="flex ">
            <div style={{ backgroundColor: "var(--white)", width: "60%" }}>
              <Table sx={{ backgroundColor: "var(--white)" }}>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "var(--blue)",
                      textcolor: "var(--white)"
                    }}
                  >
                    {playersListTableHeaders.map((header, idx) => (
                      <TableCell
                        key={`header-${idx}`}
                        sx={{ color: "var(--white)", fontWeight: "800" }}
                        component="th"
                        scope="row"
                        align={
                          idx === playersListTableHeaders.length - 1
                            ? "right"
                            : "left"
                        }
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {playersList[currentPage]?.map(
                    (player: PlayersListTableItem) => (
                      <TableRow
                        key={player.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                          color: "var(--blue)",
                          fontWeight: "800",
                        }}
                        onClick={() => {
                          setSelectedPlayerId(player.id);
                          setGetPlayersDetails(true);
                          scrollToRef.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {player.last_name.toUpperCase()}, {player.first_name}
                        </TableCell>
                        <TableCell align="right">
                          {player.position ? player.position : "Not Available"}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>

              <TablePagination
                sx={{
                  backgroundColor: "var(--blue)",
                  color: "var(--white)",
                }}
                component="div"
                count={playersList.reduce((acc, curr) => acc + curr.length, 0)}
                rowsPerPage={10}
                page={currentPage}
                rowsPerPageOptions={[10]}
                onPageChange={(_, page) => setCurrentPage(page)}
              />
            </div>

            <div className="flex flex-col">
              <img
                src={BlueRedTriangle}
                loading="lazy"
                width="135"
                alt="Blue and red triangles with a player image in the background"
              />
            </div>

            <div className="ml-8 mt-8 items-center self-end">
              <img
                src={BornIdentities}
                loading="lazy"
                width="200"
                alt="Text with the message Born Identities on a bold font"
              />
            </div>

            <div className="flex flex-col self-end">
              <img
                src={BlueRedTriangle}
                loading="lazy"
                width="135"
                alt="Blue and red triangles with a player image in the background"
              />
            </div>
          </div>
        )}
      </TeamListContainer>


      {getPlayerDetails && (
        <PlayerStatsContainer ref={scrollToRef}>
          <PlayerStatsTable playerId={selectedPlayerId} />
        </PlayerStatsContainer>
      )}
    </TeamRosterContainer>
  );
}
