import react, { Dispatch, useEffect, useState } from "react";
import {
  DetailsContainer,
  ListsContainer,
  TeamsListContainer,
} from "./TeamsList.styles";
import { HttpClient } from "../../services/api";
import { TeamsListItem } from "../../types/teams";
import { Button, CircularProgress, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TeamsList({
  setSelectedTeamId,
  selectedTeamId,
}: {
  setSelectedTeamId: Dispatch<react.SetStateAction<number>>;
  selectedTeamId: number;
}) {
  const [teamsList, setTeamsList] = useState<TeamsListItem[]>([]);
  const [teamDetails, setTeamDetails] = useState<TeamsListItem>();

  const [fetchMoreTeams, setFetchMoreTeams] = useState(false);
  const [nextPage, setNextPage] = useState<null | number>(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function getTeamList(page: number) {
    const TEAM_LIST_BY_PAGE_CACHE_KEY = `teamssListCache-page-${page}`;

    const cachedTeamListData = sessionStorage.getItem(
      TEAM_LIST_BY_PAGE_CACHE_KEY
    );

    if (cachedTeamListData) {
      const data = JSON.parse(cachedTeamListData);

      if (page > 0) {
        // if it is not the first page, we need to get the old array (the previous state) and create a new array with the old data and the new data
        setTeamsList([...teamsList, ...data.data]);
      } else {
        // if it's the first page, we just set the state normally
        setTeamsList([...data.data]);
      }

      setNextPage(data.nextPage);
      setLoading(false);

      return;
    }

    const response = await HttpClient.get("/teams", { params: { page } });

    if (response.data.data) {
      const data = response.data.data;
      const nextPage = response.data.meta.next_page;

      if (page > 0) {
        // if it is not the first page, we need to get the old array (the previous state) and create a new array with the old data and the new data
        setTeamsList([...teamsList, ...data]);
      } else {
        // if it's the first page, we just set the state normally
        setTeamsList([...data]);
      }

      sessionStorage.setItem(
        TEAM_LIST_BY_PAGE_CACHE_KEY,
        JSON.stringify({ data, nextPage })
      );

      setNextPage(nextPage);
      setLoading(false);
    }
  }

  async function getTeamDetails(teamId: number) {
    const response = await HttpClient.get(`/teams/${teamId}`);

    if (response.data) {
      const data = response.data;

      setTeamDetails({ ...data });
    }
  }

  useEffect(() => {
    getTeamList(1);
  }, []);

  useEffect(() => {
    getTeamDetails(selectedTeamId);
  }, [selectedTeamId]);

  useEffect(() => {
    if (fetchMoreTeams && nextPage) {
      getTeamList(nextPage);
    }
  }, [fetchMoreTeams, nextPage]);

  return (
    <TeamsListContainer>
      <ListsContainer>
        <h2 className="text-[color:var(--white)] font-bold mb-4 tracking-tighter">
          #TEAMS__________________________________
        </h2>

        <h6 className="text-[color:var(--white)] mb-4 tracking-tighter">
          Check out <u>all teams</u>  in the history of NBA 
        </h6>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <ul>
              {teamsList.length &&
                teamsList.map((item) => (
                  <a
                    key={item.id}
                    onClick={() => {
                      setSelectedTeamId(item.id);
                    }}
                  >
                    <li className="mt-2 font-medium p-2 text-[color:var(--white)] hover:bg-[color:var(--red)]">
                      {item.name}
                    </li>
                  </a>
                ))}
            </ul>

            {nextPage && (
              <Button onClick={() => setFetchMoreTeams(true)}>
                More Teams
              </Button>
            )}
          </>
        )}
      </ListsContainer>

      <div className="flex flex-col">
        <img
          src="https://assets.website-files.com/611151d2308094b62cb7a988/61314d6b959cd4cb3233c8a0_blue-red-triangle.svg"
          loading="lazy"
          width="135"
          alt=""
        />
      </div>

      <DetailsContainer>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div>
              <h1 className="font-bold"> --- {teamDetails?.name}</h1>
              <h3>{teamDetails?.full_name}</h3>
            </div>

            <Divider />

            <ul>
              <li className="flex align-center justify-between">
                <span>ABBREVIATION</span>
                <span className="ml-20">{teamDetails?.abbreviation}</span>
              </li>
              <li className="flex align-center justify-between">
                <span>CITY</span>
                <span className="ml-20">{teamDetails?.city}</span>
              </li>

              <li className="flex align-center justify-between">
                <span>DIVISION</span>
                <span className="ml-20">{teamDetails?.division}</span>
              </li>
            </ul>

            <Divider />

            <Button
              className="w-60"
              variant="contained"
              onClick={() => {
                navigate(
                  `/team/${teamDetails?.name}/${teamDetails?.id}/roster`
                );
              }}
            >
              Roster History
            </Button>
          </>
        )}
      </DetailsContainer>
    </TeamsListContainer>
  );
}
