import { createFileRoute } from "@tanstack/react-router";
import { DefaultLayout } from "../../DefaultLayout";
import ContestPage from "../../pages/contest/ContestPage";

export const Route = createFileRoute("/contests/$contestId")({
	component: Contest,
});

function Contest() {
	const { contestId } = Route.useParams();

	return (
		<DefaultLayout>
			<ContestPage contestId={Number(contestId)} />
		</DefaultLayout>
	);
}
