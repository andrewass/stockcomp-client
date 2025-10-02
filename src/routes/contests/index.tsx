import { createFileRoute } from "@tanstack/react-router";
import { DefaultLayout } from "../../DefaultLayout";
import ContestsPage from "../../pages/contests/ContestsPage";

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
