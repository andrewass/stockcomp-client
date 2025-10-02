import { createFileRoute } from "@tanstack/react-router";
import { DefaultLayout } from "../DefaultLayout";
import SymbolsPage from "../pages/symbols/SymbolsPage";

export const Route = createFileRoute("/")({
	component: Contests,
});

function Contests() {
	return (
		<DefaultLayout>
			<SymbolsPage />
		</DefaultLayout>
	);
}
