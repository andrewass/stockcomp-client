"use client";

import RouteErrorState from "@/components/route-boundaries/RouteErrorState.tsx";

interface Props {
	error: Error & { digest?: string };
	unstable_retry: () => void;
}

export default function AdminError({ unstable_retry }: Props) {
	return (
		<RouteErrorState
			eyebrow="Admin"
			title="Unable to load admin data"
			message="The admin data is temporarily unavailable. Retry the request or return to the symbols overview."
			onRetry={unstable_retry}
			homeHref="/symbols"
			homeLabel="Go to symbols"
		/>
	);
}
