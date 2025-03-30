import {createFileRoute} from "@tanstack/react-router";
import ContestPage from "../../pages/contest/ContestPage";
import {DefaultLayout} from "../../DefaultLayout";

export const Route = createFileRoute("/contests/$contestId")({
    component: Contest
});

function Contest() {
    const {contestId} = Route.useParams();

    return (
        <DefaultLayout>
            <ContestPage contestId={Number(contestId)}/>
        </DefaultLayout>
    );
}
