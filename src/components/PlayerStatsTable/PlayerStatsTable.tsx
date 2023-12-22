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
    const playerDetails = await HttpClient.get(`/stats`, {
      params: {
        player_ids: [playerId],
        page,
        per_page: "10",
      },
    });

    if (playerDetails.data) {
      const data: PlayerStats[] = playerDetails.data.data;

      if (!data.length) {
        setLoading(false);
        return alert(
          "Ooops, you got us! It seems like we do not have data for this player stats..."
        );
      }

      setChosenPlayerStats(data);
      setTotalStatsCount(playerDetails.data.meta.total_count);
      setSelectedPlayerName(data[0].player.last_name);

      const headers = Object.keys(data[0]).filter((key) => {
        if (!["id", "player"].includes(key)) return key;
      });

      setPlayerStatsTableHeaders(headers);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPlayerStats(playerId, currentPage);
  }, [playerId, currentPage]);

  return (
    <>
      <div className="flex self-start">
        <img
          src="https://assets.website-files.com/611151d2308094b62cb7a988/61314d6b959cd4cb3233c8a0_blue-red-triangle.svg"
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
          src="https://assets.website-files.com/611151d2308094b62cb7a988/6131b10d057cdd46a0bf73d6_the-shot.svg"
          loading="lazy"
          className="ml-8"
          width="100"
          alt=""
        />
      </div>

      {loading ? (
        <CircularProgress />
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