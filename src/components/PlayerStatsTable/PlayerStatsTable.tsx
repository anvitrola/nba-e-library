import { memo, useEffect, useState } from "react";
import { HttpClient } from "../../services/api";
import { PlayerStats } from "../../types/teams";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import BlueRedTriangle from '../../assets/images/blue-red-triangle.svg'

const PlayersStatsTable = memo(function PlayerStatsTable({
  playerId,
}: {
  playerId: number;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStatsCount, setTotalStatsCount] = useState(0);
  const [selectedPlayerName, setSelectedPlayerName] = useState("");
  const [loading, setLoading] = useState(true);

  const [chosenPlayerStats, setChosenPlayerStats] = useState<PlayerStats[]>([]);

  const [playerStatsTableHeaders, setPlayerStatsTableHeaders] = useState<
    string[]
  >([]);

  async function getPlayerStats(playerId: number, page: number) {
    try {
      const playerDetails = await HttpClient.get(`/stats`, {
        params: {
          player_ids: [playerId],
          page,
          per_page: "10",
        },
      });

      if (playerDetails.data) {
        const data: PlayerStats[] = playerDetails.data.data;
        setChosenPlayerStats(data);
        setTotalStatsCount(playerDetails.data.meta.total_count);
        setSelectedPlayerName(data[0].player.last_name);

        const headers = Object.keys(data[0]).filter((key) => {
          if (!["id", "player"].includes(key)) return key;
        });

        setPlayerStatsTableHeaders(headers);
        setLoading(false);
      }
    } catch (error) {
      // Handle the error, e.g., show a user-friendly message
      console.error("Error fetching player stats:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  }

  useEffect(() => {
    getPlayerStats(playerId, currentPage);
  }, [playerId, currentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [playerId]);

  return (
    <>
      <div className="flex self-start">
        <img
          src={BlueRedTriangle}
          loading="lazy"
          width="100"
          alt=""
        />
        {
          <h1 className="text-[color:var(--white)] font-bold self-center ml-8">
            _____________________{selectedPlayerName.toUpperCase()} stats _____
          </h1>
        }
        <img
          src={BlueRedTriangle}
          loading="lazy"
          className="ml-8"
          width="100"
          alt=""
        />
      </div>

      {loading ? (
        <CircularProgress data-testid="player-stats-table-loader" />
      ) : (
        <>
          <Table
            sx={{ backgroundColor: "var(--white)", mt: "1rem", width: "70%" }}
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "var(--red)",
                  textcolor: "var(--white)",
                }}
              >
                {playerStatsTableHeaders.map((key, idx) => (
                  <TableCell
                    key={`player-stats-header-${idx}`}
                    sx={{ color: "var(--white)", fontWeight: "800" }}
                    component="th"
                    scope="row"
                  >
                    {key}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {chosenPlayerStats.map((stat: PlayerStats, statIdx) => (
                <>
                  <TableRow
                    key={stat.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {playerStatsTableHeaders.map((key, keyIdx) => {
                      let tableData = "";

                      if (key === "team") {
                        tableData = stat[key]["full_name"];
                      }
                      // data formatting if the current table column is game
                      else if (key === "game") {
                        tableData = new Date(stat[key]["date"]).toDateString();
                      }

                      // if we do not have this data available it will fallback to this
                      else if (!stat[key as keyof PlayerStats]) {
                        tableData = "N/A";
                      } else {
                        tableData = stat[key as keyof PlayerStats] as string;
                      }

                      return (
                        <TableCell
                          key={`player-stats-row-cell-${keyIdx}-${statIdx}`}
                          scope="row"
                        >
                          {tableData}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>

          <TablePagination
          data-testid="table-pagination-player-stats-table"
            sx={{
              backgroundColor: "var(--blue)",
              color: "var(--white)",
            }}
            component="div"
            count={totalStatsCount}
            rowsPerPage={10}
            page={currentPage}
            rowsPerPageOptions={[10]}
            onPageChange={(_, page) => setCurrentPage(page)}
          />
        </>
      )}
    </>
  );
});

export default PlayersStatsTable;
