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

const mockedPayload = {
  data: [...mockedGames],
  meta: {
    total_pages: 2822,
    current_page: 1,
    next_page: 2,
    per_page: 25,
    total_count: 70539,
  },
};

describe("<GamesList/>", () => {
  beforeEach(() => {
    server.use(
      rest.get(`${api}/games/1`, (_, res, ctx) => {
        return res(ctx.json({ ...mockedGames[0] }));
      }),
      rest.get(`${api}/games`, (_, res, ctx) => {
        return res(ctx.json({ ...mockedPayload }));
      })
    );

    render(<GamesList teamIds={[1]} />);
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render loading spinner initially and then games list data", async () => {
    expect(screen.getByTestId("games-list-loader")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId("games-list-loader")).not.toBeInTheDocument()
    );

    await waitFor(() => {
      expect(screen.getByText(mockedTeams[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockedTeams[1].name)).toBeInTheDocument();
    });
  });

  test("should render game details modal on game card click", async () => {
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

  it("should render pagination footer", async () => {
    await waitFor(() =>
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
    );

    await waitFor(() => {
      const nextPageButton = screen.getByTestId("games-list-table-pagination");
      expect(nextPageButton).toBeInTheDocument();
    });
  });
});
