"use client";

import { useState } from "react";
import type { Contest } from "@/contest/contestTypes.ts";
import AdminContestsTable from "./AdminContestsTable.tsx";
import CreateContestModal from "./CreateContestModal.tsx";

interface Props {
	contests: Contest[];
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
}

export default function AdminContestsView({
	contests,
	pageSize,
	currentPage,
	totalEntriesCount,
}: Props) {
	const [isCreateContestModalOpen, setIsCreateContestModalOpen] =
		useState(false);

	return (
		<div className="space-y-4">
			<div className="flex min-h-12 items-center justify-end">
				<button
					type="button"
					className="btn btn-outline border-base-300 text-base-content/80 hover:border-base-content/40 hover:text-base-content"
					onClick={() => setIsCreateContestModalOpen(true)}
				>
					Create contest
				</button>
			</div>
			<AdminContestsTable
				contests={contests}
				pageSize={pageSize}
				currentPage={currentPage}
				totalEntriesCount={totalEntriesCount}
			/>
			<CreateContestModal
				isOpen={isCreateContestModalOpen}
				onClose={() => setIsCreateContestModalOpen(false)}
			/>
		</div>
	);
}
