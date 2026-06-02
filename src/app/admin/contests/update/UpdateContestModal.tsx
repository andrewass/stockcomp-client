"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState, useTransition } from "react";
import { ModalWindow } from "@/components/modal/ModalWindow.tsx";
import {
	type Contest,
	type ContestStatus,
	contestStatusRecord,
	isContestStatus,
	type UpdateContestRequest,
} from "@/domain/contests/contestTypes.ts";
import type { UpdateContestResult } from "./updateContestTypes.ts";

interface Props {
	contest: Contest | null;
	isOpen: boolean;
	onClose: () => void;
}

interface ContestFormState {
	contestName: string;
	startTime: string;
	endTime: string;
	contestStatus: ContestStatus | "";
}

function toDateTimeLocalInputValue(dateTime: string): string {
	const parsedDate = new Date(dateTime);
	if (Number.isNaN(parsedDate.getTime())) {
		return "";
	}

	const localDate = new Date(
		parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60_000,
	);
	return localDate.toISOString().slice(0, 16);
}

function getInitialFormState(contest: Contest | null): ContestFormState {
	return {
		contestName: contest?.contestName ?? "",
		startTime: contest ? toDateTimeLocalInputValue(contest.startTime) : "",
		endTime: contest ? toDateTimeLocalInputValue(contest.endTime) : "",
		contestStatus: contest?.contestStatus ?? "",
	};
}

function toContestStatusFormValue(
	value: string,
): ContestFormState["contestStatus"] {
	return isContestStatus(value) ? value : "";
}

function validateForm(formState: ContestFormState): Record<string, string> {
	const fieldErrors: Record<string, string> = {};
	const contestName = formState.contestName.trim();
	if (!contestName) {
		fieldErrors.contestName = "Contest name is required.";
	}

	const startDate = new Date(formState.startTime);
	if (Number.isNaN(startDate.getTime())) {
		fieldErrors.startTime = "Start time is invalid.";
	}

	if (!isContestStatus(formState.contestStatus)) {
		fieldErrors.contestStatus = "Contest status is invalid.";
	}

	return fieldErrors;
}

function buildUpdateContestRequest(
	contest: Contest,
	formState: ContestFormState,
): UpdateContestRequest {
	const initialFormState = getInitialFormState(contest);
	const request: UpdateContestRequest = {
		contestId: contest.contestId,
	};
	const contestName = formState.contestName.trim();

	if (contestName !== initialFormState.contestName) {
		request.contestName = contestName;
	}

	if (
		isContestStatus(formState.contestStatus) &&
		formState.contestStatus !== initialFormState.contestStatus
	) {
		request.contestStatus = formState.contestStatus;
	}

	if (formState.startTime !== initialFormState.startTime) {
		request.startTime = formState.startTime;
	}

	return request;
}

function hasContestChanges(request: UpdateContestRequest): boolean {
	return (
		request.contestName !== undefined ||
		request.contestStatus !== undefined ||
		request.startTime !== undefined
	);
}

async function updateContest(
	request: UpdateContestRequest,
): Promise<UpdateContestResult> {
	const response = await fetch("/admin/contests/api", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(request),
	});

	const result = (await response
		.json()
		.catch(() => null)) as UpdateContestResult | null;

	if (result) {
		return result;
	}

	if (!response.ok) {
		return {
			ok: false,
			message: "Unable to update contest right now. Please try again.",
		};
	}

	return { ok: true };
}

export default function UpdateContestModal({
	contest,
	isOpen,
	onClose,
}: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [formState, setFormState] = useState<ContestFormState>(() =>
		getInitialFormState(contest),
	);
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		setFormState(getInitialFormState(contest));
		setFieldErrors({});
		setErrorMessage(null);
	}, [contest, isOpen]);

	const closeModal = () => {
		onClose();
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage(null);

		if (!contest) {
			setErrorMessage("No contest selected.");
			return;
		}

		const localFieldErrors = validateForm(formState);
		if (Object.keys(localFieldErrors).length > 0) {
			setFieldErrors(localFieldErrors);
			return;
		}

		setFieldErrors({});
		const updateRequest = buildUpdateContestRequest(contest, formState);
		if (!hasContestChanges(updateRequest)) {
			closeModal();
			return;
		}

		startTransition(async () => {
			const response = await updateContest(updateRequest);

			if (!response.ok) {
				setFieldErrors(response.fieldErrors ?? {});
				setErrorMessage(
					response.message ??
						"Unable to update contest right now. Please try again.",
				);
				return;
			}

			closeModal();
			router.refresh();
		});
	};

	const footer = (
		<>
			<button
				type="button"
				className="btn"
				onClick={closeModal}
				disabled={isPending}
			>
				Cancel
			</button>
			<button
				type="submit"
				form="update-contest-form"
				className="btn btn-primary"
				disabled={isPending}
			>
				{isPending ? "Saving..." : "Save changes"}
			</button>
		</>
	);

	return (
		<ModalWindow
			isOpen={isOpen}
			onClose={closeModal}
			title="Edit contest"
			footer={footer}
		>
			<form
				id="update-contest-form"
				className="space-y-4"
				onSubmit={handleSubmit}
			>
				{errorMessage ? (
					<div className="alert alert-error">
						<span>{errorMessage}</span>
					</div>
				) : null}

				<div className="flex flex-col gap-2">
					<label className="label p-0" htmlFor="updateContestName">
						Contest name
					</label>
					<input
						id="updateContestName"
						type="text"
						className={`input input-bordered w-full ${fieldErrors.contestName ? "input-error" : ""}`}
						value={formState.contestName}
						onChange={(event) =>
							setFormState((current) => ({
								...current,
								contestName: event.target.value,
							}))
						}
						required
					/>
					{fieldErrors.contestName ? (
						<p className="text-sm text-error">{fieldErrors.contestName}</p>
					) : null}
				</div>

				<div className="flex flex-col gap-2">
					<label className="label p-0" htmlFor="updateContestStatus">
						Status
					</label>
					<select
						id="updateContestStatus"
						className={`select select-bordered w-full ${fieldErrors.contestStatus ? "select-error" : ""}`}
						value={formState.contestStatus}
						onChange={(event) =>
							setFormState((current) => ({
								...current,
								contestStatus: toContestStatusFormValue(event.target.value),
							}))
						}
						required
					>
						<option value="" disabled>
							Select status
						</option>
						{Object.entries(contestStatusRecord).map(([value, label]) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
					{fieldErrors.contestStatus ? (
						<p className="text-sm text-error">{fieldErrors.contestStatus}</p>
					) : null}
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					<div className="flex flex-col gap-2">
						<label className="label p-0" htmlFor="updateStartTime">
							Start time
						</label>
						<input
							id="updateStartTime"
							type="datetime-local"
							className={`input input-bordered w-full ${fieldErrors.startTime ? "input-error" : ""}`}
							value={formState.startTime}
							onChange={(event) =>
								setFormState((current) => ({
									...current,
									startTime: event.target.value,
								}))
							}
							required
						/>
						{fieldErrors.startTime ? (
							<p className="text-sm text-error">{fieldErrors.startTime}</p>
						) : null}
					</div>

					<div className="flex flex-col gap-2">
						<label className="label p-0" htmlFor="updateEndTime">
							End time
						</label>
						<input
							id="updateEndTime"
							type="datetime-local"
							className="input input-bordered w-full"
							value={formState.endTime}
							disabled
							readOnly
						/>
					</div>
				</div>
			</form>
		</ModalWindow>
	);
}
