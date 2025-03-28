import {createFileRoute} from "@tanstack/react-router";
import {withDefaultLayout} from "../../DefaultLayout";
import ContestsPage from "../../pages/contests/ContestsPage";

export const Route = createFileRoute("/contests/")({
    component: Contests,
});

function Contests() {
    return withDefaultLayout(<ContestsPage/>);
}
