import { PlayersListTableItem } from "../types/teams";

export const PLAYERS_LIST_CACHE_KEY = "playersListCache";

export function getCachedPlayersListByTeamMap(): Record<number, PlayersListTableItem[]> | null {
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    const threshold = 18000; //5 hours

    const cachedData = sessionStorage.getItem(PLAYERS_LIST_CACHE_KEY);

    if (cachedData) {
        const data = JSON.parse(cachedData);

        if (data.timestamp) {
            const numSeconds = Math.abs(currentTimeStamp - data.timestamp);

            if (numSeconds < threshold) {
                return data.playersListByTeamMap;
            }
        }
    }

    return null;
}