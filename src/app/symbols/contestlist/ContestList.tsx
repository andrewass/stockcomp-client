"use client";

import AvailableContests from "@/symbols/contestlist/AvailableContests.tsx";
import SignedUpContests from "@/symbols/contestlist/SignedUpContests.tsx";
import type { SymbolContestListItemViewModel } from "@/symbols/domain.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
	registeredContests: SymbolContestListItemViewModel[];
	unregisteredContests: SymbolContestListItemViewModel[];
}

type ContestListQueryData = Props;

const contestListQueryKey = ["symbols", "contest-list"];

async function fetchContestLists(): Promise<ContestListQueryData> {
	const response = await fetch("/symbols/api/contests");
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return (await response.json()) as ContestListQueryData;
}

async function signUpForContest(contestId: number): Promise<void> {
	const response = await fetch("/symbols/api/contests", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ contestId }),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
}

export default function ContestList({
	registeredContests,
	unregisteredContests,
}: Props) {
	const queryClient = useQueryClient();
	const initialData = {
		registeredContests,
		unregisteredContests,
	};
	const contestLists = useQuery({
		queryKey: contestListQueryKey,
		queryFn: fetchContestLists,
		initialData,
	});
	const signUpMutation = useMutation({
		mutationFn: signUpForContest,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: contestListQueryKey });
		},
	});

	return (
		<div className="space-y-8 rounded-box border border-base-300 bg-base-200/70 p-4 shadow-sm">
			{signUpMutation.isError && (
				<div className="alert alert-error text-sm">
					Unable to sign up for this contest right now.
				</div>
			)}
			{contestLists.isError && (
				<div className="alert alert-error text-sm">
					Unable to refresh contests right now.
				</div>
			)}
			<SignedUpContests contests={contestLists.data.registeredContests} />
			<AvailableContests
				contests={contestLists.data.unregisteredContests}
				onSignUp={(contestId) => signUpMutation.mutate(contestId)}
				signingUpContestId={
					signUpMutation.isPending ? signUpMutation.variables : undefined
				}
			/>
		</div>
	);
}
