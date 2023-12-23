import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GamesList from "./GamesList";
import { server, rest, api } from "../../scaffold/server";
import { GamesListItem } from "../../types/games";
import { TeamsListItem } from "../../types/teams";
import { act } from "react-dom/test-utils";

const mockedTeams: TeamsListItem[] = [
  {
    id: 1,
    abbreviation: "HTA",
    city: "City A",
    conference: "West",
    division: "Pacific",
    full_name: "Home Team A FC",
    name: "Home Team A",
  },
  {
    id: 2,
    abbreviation: "VTB",
    city: "City B",
    conference: "East",
    division: "Atlantic",
    full_name: "Visitor Team B FC",
    name: "Visitor Team B",
  },
];

const mockedGames: GamesListItem[] = [
  {
    id: 1,
    date: "2023-01-01",
    home_team: mockedTeams[0],
    home_team_score: 3,
    period: 1,
    postseason: false,
    season: 2023,
    status: "In Progress",
    time: "12:00 PM",
    visitor_team: mockedTeams[1],
    visitor_team_score: 2,
  },
];

describe("<GamesList/>", () => {
  beforeEach(() => {
    server.use(
      rest.get(`${api}/games/1`, (_, res, ctx) => {
        return res(ctx.json({ ...mockedGames[0] }));
      }),
      rest.get(`${api}/games`, (_, res, ctx) => {
        return res(ctx.json({ data: [...mockedGames] }));
      })
    );
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("renders loading spinner initially and then games list data", async () => {
    act(() => {
      render(<GamesList teamIds={[1]} />);
    });

    expect(screen.getByTestId("games-list-loader")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId("games-list-loader")).not.toBeInTheDocument()
    );

    await waitFor(() => {
      expect(screen.getByText(mockedTeams[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockedTeams[1].name)).toBeInTheDocument();
    });
  });

  test("renders game details modal on game card click", async () => {
    render(<GamesList teamIds={[1]} />);
    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );

    await waitFor(() => {
      expect(screen.getByText(mockedTeams[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockedTeams[1].name)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText(mockedTeams[0].name));
    });

    await waitFor(() => {
      expect(screen.getByText(`(${mockedTeams[0].city})`)).toBeInTheDocument();
      expect(screen.getByText(`(${mockedTeams[1].city})`)).toBeInTheDocument();
    });
  });
});
