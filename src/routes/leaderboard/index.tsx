import { createFileRoute } from "@tanstack/react-router";
import { DefaultLayout } from "../../DefaultLayout";
import LeaderboardPage from "../../pages/leaderboard/LeaderboardPage";
import { CLIENT_BACKEND_BASE_URL } from "../../config/properties";

export const Route = createFileRoute("/leaderboard/")({
  beforeLoad: async ({ context }) => {
    const response = await context.auth.isAuthenticated();
    if (!response.validSession) {
      window.location.href = CLIENT_BACKEND_BASE_URL + "/auth/login";
    }
  },
  component: Leaderboard,
});

function Leaderboard() {
  return (
    <DefaultLayout>
      <LeaderboardPage />
    </DefaultLayout>
  );
}
