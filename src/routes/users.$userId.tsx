import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/users/$userId")({
    component: User
});

function User() {
    return (
        <div>
            Placeholder page for user
        </div>
    );
}
