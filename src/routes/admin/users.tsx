import { createFileRoute } from "@tanstack/react-router";
import AdminLayout from "../../AdminLayout";
import AdminUsersPage from "../../pages/admin/users/AdminUsersPage";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

export default function AdminUsers() {
  return (
    <AdminLayout>
      <AdminUsersPage />
    </AdminLayout>
  );
}
