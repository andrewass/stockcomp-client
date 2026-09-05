"use client";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
	CONTEST_STATUS,
	type Contest,
} from "@/domain/contests/contestTypes.ts";
import UpdateContestModal from "./UpdateContestModal.tsx";

interface Props {
	contest: Contest;
}

export default function UpdateContestButton({ contest }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const isCompleted = contest.contestStatus === CONTEST_STATUS.COMPLETED;

	return (
		<>
			<button
				type="button"
				className="btn btn-ghost btn-sm btn-circle"
				onClick={() => setIsOpen(true)}
				aria-label={`Edit ${contest.contestName}`}
				title={
					isCompleted ? "Completed contests cannot be edited" : "Edit contest"
				}
				disabled={isCompleted}
			>
				<PencilSquareIcon className="size-4" aria-hidden="true" />
			</button>
			{isOpen ? (
				<UpdateContestModal
					contest={contest}
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
				/>
			) : null}
		</>
	);
}
