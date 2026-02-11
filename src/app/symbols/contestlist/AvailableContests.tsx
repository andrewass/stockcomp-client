import { useQuery } from "@tanstack/react-query";
import type { Contest } from "@/contest/contestTypes.ts";
import { getUnregisteredContests } from "@/symbols/actions.ts";

const GET_UNREGISTERED_CONTESTS = "getUnregisteredContests";

export default function AvailableContests() {
	const {
		isError,
		isPending,
		error,
		data: contests,
	} = useQuery<Contest[]>({
		queryKey: [GET_UNREGISTERED_CONTESTS],
		queryFn: getUnregisteredContests,
	});
	if (isError) return <p>Error: {error?.message}</p>;
	if (isPending) return <p>Loading...</p>;

	return <p>Available Contests</p>;
}
