import { createFileRoute } from "@tanstack/react-router";
import ContestsPage from "../pages/contests/ContestsPage";

export const Route = createFileRoute("/contests")({
    component: Contests,
});

function Contests() {
    return (
        <ContestsPage/>
    );
}
