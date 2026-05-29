import { notFound, redirect } from "next/navigation";

export default async function ContestIndexPage({
	params,
}: {
	params: Promise<{ contestId: string }>;
}) {
	const { contestId } = await params;
	const parsedContestId = Number.parseInt(contestId, 10);

	if (Number.isNaN(parsedContestId)) {
		notFound();
	}

	redirect(`/contest/${parsedContestId}/0?pageSize=10`);
}
