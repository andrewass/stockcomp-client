import { createFileRoute } from "@tanstack/react-router";
import AdminLayout from "../../AdminLayout";
import AdminContestsPage from "../../pages/admin/contests/AdminContestsPage";

export const Route = createFileRoute("/admin/contests")({
	component: AdminContests,
});

export default function AdminContests() {
	return (
		<AdminLayout>
			<AdminContestsPage />
		</AdminLayout>
	);
}
