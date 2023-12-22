import { useState } from "react";
import { HomepageContainer } from "./Homepage.styles";

import Banner from "../../components/Banner/Banner";
import TeamsList from "../../components/Teams/TeamsList";
import GamesList from "../../components/GamesList/GamesList";

export default function Homepage() {
  const [selectedTeamId, setSelectedTeamId] = useState<number>(1);

  return (
    <HomepageContainer>
      <Banner />

      <TeamsList
        setSelectedTeamId={setSelectedTeamId}
        selectedTeamId={selectedTeamId}
      />

      <GamesList teamIds={[selectedTeamId]} />
    </HomepageContainer>
  );
}
