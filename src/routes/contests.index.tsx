import {createFileRoute} from "@tanstack/react-router";
import ContestsPage from "../pages/contests/ContestsPage";
import {withDefaultLayout} from "../DefaultLayout";

export const Route = createFileRoute("/contests/")({
    component: Contests,
});

function Contests() {
    return withDefaultLayout(<ContestsPage/>);
}
