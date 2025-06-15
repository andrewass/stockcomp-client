import { createFileRoute } from "@tanstack/react-router";
import ContestsPage from "../../pages/contests/ContestsPage";
import { DefaultLayout } from "../../DefaultLayout";

export const Route = createFileRoute("/contests/")({
  component: Contests,
});

function Contests() {
  return (
    <DefaultLayout>
      <ContestsPage />
    </DefaultLayout>
  );
}
