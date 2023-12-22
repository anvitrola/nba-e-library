import { PLAYERS_LIST_CACHE_KEY, getCachedPlayersListByTeamMap } from "../helpers/getCachedPlayersListByTeamMap";
import { PlayersListItem, PlayersListTableItem } from "../types/teams";
import { HttpClient } from "./api";

export async function getTeamPlayersList() {
    const cachedPlayersListByTeam = getCachedPlayersListByTeamMap();

    /**
     * Since this is an expensive data manipulation AND it's not a sensitive data - meaning it doesn't need
     * to be updated all the time - we can cache it and return cached data whenever we need and if it is still valid
     */
    if (cachedPlayersListByTeam) {
        return cachedPlayersListByTeam;
    }

    // Get the first page so we have an idea of how many pages we will have to process 
    const firstPageResponse = await HttpClient.get(`/players`, {
        params: { page: 0, per_page: 100 },
    });

    if (firstPageResponse.data) {
        // Initiate a Map in which we will store the players list under the team ID 
        // It is important to notice we're only saving players full name and position within this Map
        let listByTeamMap: Record<number | string, PlayersListTableItem[]> = {};

        const firstPageData: PlayersListItem[] = firstPageResponse.data.data;

        // Once we have our first page data, we process it and start populating or Map
        firstPageData.forEach(({ last_name, first_name, position, id, team }) => {
            const PlayersListTableItem = {
                id,
                last_name,
                first_name,
                position,
            };

            /**
             * If listByTeamMap still does not have this team i.e this team id, we will add this team id as a new key
             and then we will add this player to this team's players list
             */
            if (!listByTeamMap.hasOwnProperty(team.id)) {
                listByTeamMap[team.id] = [];
            }
            // If listByTeamMap already have this team id as key, we just add this player to its players list
            listByTeamMap[team.id].push(PlayersListTableItem);
        });

        // After fetching the first page, we have access to how many pages there are
        const totalPages = firstPageResponse.data.meta.total_pages;
        const pageNumbers = [];

        // We create an array from 2 to the total pages. We start at 2 because pages 0 and 1 return the same data
        for (let i = 2; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        /**
         * After creating an array with the range of pages we need to fetch, we run Promise.all so we can
         * fetch all this data concurrently (since Js is a single-threaded language)
         */
        const responses = await Promise.all(
            pageNumbers.map(async (page) => {
                const response = await HttpClient.get("/players", {
                    params: { page, per_page: 100 },
                });

                return response.data.data;
            })
        );


        if (responses) {
            /**
             * After running all requests, we get an array of responses and we need to iterate it to actually get the data
             * 
             * Each page will return an array of players, which we need to iterate so we can have access to player's data and process them one by one.
             * It is an expensive opperation that runs O(n^2) time and that's why we are caching it afterwards
             */
            responses.forEach((pageData) => {
                pageData.forEach(
                    ({
                        last_name,
                        first_name,
                        position,
                        id,
                        team,
                    }: PlayersListItem) => {
                        const PlayersListTableItem = {
                            id,
                            last_name,
                            first_name,
                            position,
                        };

                        if (!listByTeamMap.hasOwnProperty(team.id)) {
                            listByTeamMap[team.id] = [];
                        }

                        listByTeamMap[team.id].push(PlayersListTableItem);
                    }
                );
            });

            // Caching data and adding a timestamp so we can keep track when was the last time we refreshed this data
            const cachedData = {
                playersListByTeamMap: listByTeamMap,
                timestamp: Math.floor(Date.now() / 1000), // current timestamp
            };

            // Cache the data for future use
            sessionStorage.setItem(PLAYERS_LIST_CACHE_KEY, JSON.stringify(cachedData));

            return listByTeamMap
        }
    }
}