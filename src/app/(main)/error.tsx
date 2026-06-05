"use client";

import RouteErrorState from "@/components/route-boundaries/RouteErrorState.tsx";

interface Props {
	error: Error & { digest?: string };
	unstable_retry: () => void;
}

export default function MainError({ unstable_retry }: Props) {
	return (
		<RouteErrorState
			title="Unable to load this page"
			message="The requested data is temporarily unavailable. Retry the request or return to the symbols overview."
			onRetry={unstable_retry}
			homeHref="/symbols"
			homeLabel="Go to symbols"
		/>
	);
}
