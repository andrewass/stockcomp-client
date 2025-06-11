import {createFileRoute} from "@tanstack/react-router";
import ContestPage from "../../pages/contest/ContestPage";
import {DefaultLayout} from "../../DefaultLayout";
import {CLIENT_BACKEND_BASE_URL} from "../../config/properties";

export const Route = createFileRoute("/contests/$contestId")({
    beforeLoad: async ({context}) => {
        const response = await context.auth.isAuthenticated()
        if(!response.validSession) {
            window.location.href = CLIENT_BACKEND_BASE_URL + "/auth/login";
        }
    },
    component: Contest,
});

function Contest() {
    const {contestId} = Route.useParams();

    return (
        <DefaultLayout>
            <ContestPage contestId={Number(contestId)}/>
        </DefaultLayout>
    );
}
