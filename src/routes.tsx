import Layout from "./layout";
import Homepage from "./pages/Homepage/Homepage";
import TeamRoster from "./pages/TeamRoster/TeamRoster";

export const routes = {
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/nba-e-library", // due gh pages deploy under repository name
      element: <Homepage />,
    },
    {
      path: "/team/:teamName/:teamId/roster",
      element: <TeamRoster />,
    },
  ],
};
