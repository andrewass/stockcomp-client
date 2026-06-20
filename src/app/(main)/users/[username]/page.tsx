import { notFound } from "next/navigation";
import UserDetailView from "@/users/detail/UserDetailView.tsx";
import { getSafeLeaderboardReturnTo } from "@/users/userProfileNavigation.ts";

interface Props {
	params: Promise<{ username: string }>;
	searchParams: Promise<{
		[key: string]: string | string[] | undefined;
	}>;
}

export default async function UserDetailPage({ params, searchParams }: Props) {
	const [{ username }, resolvedSearchParams] = await Promise.all([
		params,
		searchParams,
	]);
	const normalizedUsername = username.trim();

	if (!normalizedUsername) {
		notFound();
	}

	return (
		<UserDetailView
			username={normalizedUsername}
			returnTo={getSafeLeaderboardReturnTo(resolvedSearchParams.returnTo)}
		/>
	);
}
