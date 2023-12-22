
type Conference = "West" | "East"
type Division = "Atlantic" | "Central" | "Southwest" | "Northwest" | "Southeast" | "Pacific" | "Northeast"

export interface TeamsListItem {
    "id": number
    "abbreviation": string
    "city": string
    "conference": Conference
    "division": Division
    "full_name": string
    "name": string
}

export interface PlayersListItem {
    "id": number
    "first_name": string
    "height_feet": null | number | number
    "height_inches": null | number | number
    "last_name": string
    "position": string
    "team": TeamsListItem
    "weight_pounds": null | number | number
}

export interface PlayerStats {
    "id": number
    "ast": null | number
    "blk": null | number
    "dreb": null | number
    "fg3_pct": null | number
    "fg3a": null | number
    "fg3m": null | number
    "fg_pct": null | number
    "fga": null | number
    "fgm": null | number
    "ft_pct": null | number
    "fta": null | number
    "ftm": null | number
    "game": {
        "id": number
        "date": string
        "home_team_id": number
        "home_team_score": number
        "period": number
        "postseason": boolean
        "season": number
        "status": string
        "time": string
        "visitor_team_id": number
        "visitor_team_score": number
    }
    "min": string
    "oreb": null | number
    "pf": null | number
    "player": PlayersListItem
    "reb": null | number
    "stl": null | number
    "team": TeamsListItem
    "turnover": null | number
}

export type PlayersListTableItem = Pick<
    PlayersListItem,
    "first_name" | "last_name" | "id" | "position"
>;