import { createFileRoute } from "@tanstack/react-router";
import AdminContestsPage from "../../pages/admin/contests/AdminContestsPage";
import AdminLayout from "../../AdminLayout";

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
