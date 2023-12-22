import { TeamsListItem } from "./teams"

export interface GamesListItem {
    "id": number
    "date": string
    "home_team": TeamsListItem
    "home_team_score": number
    "period": number
    "postseason": boolean
    "season": number
    "status": string
    "time": string
    "visitor_team": TeamsListItem
    "visitor_team_score": number
}