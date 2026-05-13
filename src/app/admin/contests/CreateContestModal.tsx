"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useMemo, useState, useTransition } from "react";
import { createContestAction } from "@/admin/contests/actions.ts";
import { ModalWindow } from "@/components/modal/ModalWindow.tsx";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

type ContestFormState = {
	contestName: string;
	startTime: string;
	durationDays: string;
};

const INITIAL_FORM_STATE: ContestFormState = {
	contestName: "",
	startTime: "",
	durationDays: "30",
};

function validateForm(formState: ContestFormState): Record<string, string> {
	const fieldErrors: Record<string, string> = {};
	const contestName = formState.contestName.trim();
	if (!contestName) {
		fieldErrors.contestName = "Contest name is required.";
	}

	const durationDays = Number(formState.durationDays);
	if (!Number.isInteger(durationDays) || durationDays < 1) {
		fieldErrors.durationDays = "Duration must be at least 1 day.";
	}

	const startDate = new Date(formState.startTime);
	if (Number.isNaN(startDate.getTime())) {
		fieldErrors.startTime = "Start time is invalid.";
	}

	return fieldErrors;
}

export default function CreateContestModal({ isOpen, onClose }: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [formState, setFormState] =
		useState<ContestFormState>(INITIAL_FORM_STATE);
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const durationDaysAsNumber = useMemo(
		() => Number(formState.durationDays),
		[formState.durationDays],
	);

	const resetForm = () => {
		setFormState(INITIAL_FORM_STATE);
		setFieldErrors({});
		setErrorMessage(null);
	};

	const closeModal = () => {
		onClose();
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage(null);

		const localFieldErrors = validateForm(formState);
		if (Object.keys(localFieldErrors).length > 0) {
			setFieldErrors(localFieldErrors);
			return;
		}

		setFieldErrors({});
		startTransition(async () => {
			const response = await createContestAction({
				contestName: formState.contestName.trim(),
				startTime: formState.startTime,
				durationDays: durationDaysAsNumber,
			});

			if (!response.ok) {
				setFieldErrors(response.fieldErrors ?? {});
				setErrorMessage(
					response.message ??
						"Unable to create contest right now. Please try again.",
				);
				return;
			}

			resetForm();
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
				form="create-contest-form"
				className="btn btn-primary"
				disabled={isPending}
			>
				{isPending ? "Creating..." : "Create contest"}
			</button>
		</>
	);

	return (
		<ModalWindow
			isOpen={isOpen}
			onClose={closeModal}
			title="Create new contest"
			footer={footer}
		>
			<form
				id="create-contest-form"
				className="space-y-4"
				onSubmit={handleSubmit}
			>
				{errorMessage ? (
					<div className="alert alert-error">
						<span>{errorMessage}</span>
					</div>
				) : null}
				<div className="flex flex-col gap-2">
					<label className="label p-0" htmlFor="contestName">
						Contest name
					</label>
					<input
						id="contestName"
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
					<label className="label p-0" htmlFor="startTime">
						Start time
					</label>
					<input
						id="startTime"
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
					<label className="label p-0" htmlFor="durationDays">
						Duration (days)
					</label>
					<input
						id="durationDays"
						type="number"
						min={1}
						step={1}
						className={`input input-bordered w-full ${fieldErrors.durationDays ? "input-error" : ""}`}
						value={formState.durationDays}
						onChange={(event) =>
							setFormState((current) => ({
								...current,
								durationDays: event.target.value,
							}))
						}
						required
					/>
					{fieldErrors.durationDays ? (
						<p className="text-sm text-error">{fieldErrors.durationDays}</p>
					) : null}
				</div>
			</form>
		</ModalWindow>
	);
}
