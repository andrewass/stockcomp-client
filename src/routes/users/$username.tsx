import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/users/$username")({
    component: User
});

function User() {
    return (
        <div>
            Placeholder page for user
        </div>
    );
}
