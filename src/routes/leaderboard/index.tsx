import { createFileRoute } from "@tanstack/react-router";
import { DefaultLayout } from "../../DefaultLayout";
import LeaderboardPage from "../../pages/leaderboard/LeaderboardPage";

export const Route = createFileRoute("/leaderboard/")({
  component: Leaderboard,
});

function Leaderboard() {
  return (
    <DefaultLayout>
      <LeaderboardPage />
    </DefaultLayout>
  );
}
