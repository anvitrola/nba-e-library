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
      path: "/team/:teamName/:teamId/roster",
      element: <TeamRoster />,
    },
  ],
};
