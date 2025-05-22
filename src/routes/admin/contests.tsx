import {createFileRoute} from "@tanstack/react-router";
import { CLIENT_BACKEND_BASE_URL } from "../../config/properties";
import AdminContestsPage from "../../pages/admin/contests/AdminContestsPage";
import {AdminLayout} from "../../layout/AdminLayout";


export const Route = createFileRoute("/admin/contests")({
    beforeLoad: async ({context}) => {
        const response = await context.auth.isAuthenticated()
        if(!response.validSession) {
            window.location.href = CLIENT_BACKEND_BASE_URL + "/auth/login";
        }
    },
    component: AdminContests,
});

export default function AdminContests() {
    return (
        <AdminLayout>
            <AdminContestsPage/>
        </AdminLayout>
    );
}
