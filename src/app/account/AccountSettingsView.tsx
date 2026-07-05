"use client";

import { useRouter } from "next/navigation";
import { type SubmitEvent, useState, useTransition } from "react";
import type {
	AccountSettings,
	UpdateAccountSettingsResult,
} from "@/account/accountTypes.ts";
import CountryCombobox, {
	normalizeCountryCode,
} from "@/account/CountryCombobox.tsx";

interface Props {
	initialAccount: AccountSettings;
}

interface AccountFormState {
	username: string;
	fullName: string;
	country: string;
}

function getInitials(account: AccountSettings) {
	const source =
		account.fullName?.trim() || account.username.trim() || account.email.trim();

	return source
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part.charAt(0).toUpperCase())
		.join("");
}

function getInitialFormState(account: AccountSettings): AccountFormState {
	return {
		username: account.username,
		fullName: account.fullName ?? "",
		country: normalizeCountryCode(account.country ?? ""),
	};
}

function normalizeOptionalValue(value: string): string | null {
	const trimmedValue = value.trim();
	return trimmedValue ? trimmedValue : null;
}

function validateForm(formState: AccountFormState): Record<string, string> {
	const fieldErrors: Record<string, string> = {};
	const username = formState.username.trim();
	const fullName = formState.fullName.trim();
	const country = formState.country.trim();

	if (!username) {
		fieldErrors.username = "Username is required.";
	} else if (username.length > 50) {
		fieldErrors.username = "Username must be 50 characters or fewer.";
	}

	if (fullName.length > 100) {
		fieldErrors.fullName = "Full name must be 100 characters or fewer.";
	}

	if (country.length > 100) {
		fieldErrors.country = "Country must be 100 characters or fewer.";
	}

	return fieldErrors;
}

async function updateAccount(
	formState: AccountFormState,
): Promise<UpdateAccountSettingsResult> {
	const response = await fetch("/account/api", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: formState.username.trim(),
			fullName: normalizeOptionalValue(formState.fullName),
			country: normalizeOptionalValue(normalizeCountryCode(formState.country)),
		}),
	});

	const result = (await response
		.json()
		.catch(() => null)) as UpdateAccountSettingsResult | null;

	if (result) {
		return result;
	}

	if (!response.ok) {
		return {
			ok: false,
			message: "Unable to update account settings right now. Please try again.",
		};
	}

	return { ok: true };
}

export default function AccountSettingsView({ initialAccount }: Props) {
	const router = useRouter();
	const [account, setAccount] = useState(initialAccount);
	const [formState, setFormState] = useState<AccountFormState>(() =>
		getInitialFormState(initialAccount),
	);
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();
	const initials = getInitials(account);

	const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);

		const localFieldErrors = validateForm(formState);
		if (Object.keys(localFieldErrors).length > 0) {
			setFieldErrors(localFieldErrors);
			return;
		}

		setFieldErrors({});
		startTransition(async () => {
			const result = await updateAccount(formState);

			if (!result.ok || !result.account) {
				setFieldErrors(result.fieldErrors ?? {});
				setErrorMessage(
					result.message ??
						"Unable to update account settings right now. Please try again.",
				);
				return;
			}

			setAccount(result.account);
			setFormState(getInitialFormState(result.account));
			setSuccessMessage("Account settings updated.");
			router.refresh();
		});
	};

	return (
		<div className="w-full max-w-5xl space-y-6 pb-12 pt-2">
			<header className="space-y-2">
				<h1 className="text-3xl font-semibold tracking-normal">Account</h1>
			</header>

			<section className="card border border-base-300 bg-base-100 shadow-sm">
				<div className="card-body gap-6">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex items-center gap-4">
							<div className="avatar placeholder">
								<div className="w-16 rounded-full bg-neutral text-neutral-content">
									<span className="text-xl">{initials}</span>
								</div>
							</div>
							<div className="min-w-0">
								<h2 className="truncate text-xl font-semibold">
									{account.fullName || account.username}
								</h2>
								<p className="truncate text-sm text-base-content/70">
									{account.email}
								</p>
							</div>
						</div>
						<span className="badge badge-success w-fit">Account active</span>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<p className="text-sm font-medium text-base-content/60">
								Username
							</p>
							<p className="break-all text-sm">{account.username}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-base-content/60">Email</p>
							<p className="break-all text-sm">{account.email}</p>
						</div>
					</div>
				</div>
			</section>

			<section className="card border border-base-300 bg-base-100 shadow-sm">
				<form className="card-body gap-5" onSubmit={handleSubmit}>
					<div>
						<h2 className="card-title">Profile settings</h2>
					</div>

					{errorMessage ? (
						<div className="alert alert-error">
							<span>{errorMessage}</span>
						</div>
					) : null}

					{successMessage ? (
						<div className="alert alert-success">
							<span>{successMessage}</span>
						</div>
					) : null}

					<div className="grid gap-4 md:grid-cols-2">
						<div className="flex flex-col gap-2">
							<label className="label p-0" htmlFor="accountUsername">
								Username
							</label>
							<input
								id="accountUsername"
								className={`input input-bordered w-full ${fieldErrors.username ? "input-error" : ""}`}
								maxLength={50}
								onChange={(event) =>
									setFormState((current) => ({
										...current,
										username: event.target.value,
									}))
								}
								required
								type="text"
								value={formState.username}
							/>
							{fieldErrors.username ? (
								<p className="text-sm text-error">{fieldErrors.username}</p>
							) : (
								<p className="text-sm text-base-content/60">
									Required. Maximum 50 characters.
								</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<label className="label p-0" htmlFor="accountFullName">
								Full name
							</label>
							<input
								id="accountFullName"
								className={`input input-bordered w-full ${fieldErrors.fullName ? "input-error" : ""}`}
								maxLength={100}
								onChange={(event) =>
									setFormState((current) => ({
										...current,
										fullName: event.target.value,
									}))
								}
								placeholder="Full name"
								type="text"
								value={formState.fullName}
							/>
							{fieldErrors.fullName ? (
								<p className="text-sm text-error">{fieldErrors.fullName}</p>
							) : (
								<p className="text-sm text-base-content/60">
									Optional. Maximum 100 characters.
								</p>
							)}
						</div>

						<CountryCombobox
							error={fieldErrors.country}
							id="accountCountry"
							label="Country"
							onChange={(country) =>
								setFormState((current) => ({
									...current,
									country,
								}))
							}
							value={formState.country}
						/>
					</div>

					<div className="card-actions justify-end">
						<button
							className="btn btn-primary"
							disabled={isPending}
							type="submit"
						>
							{isPending ? "Saving..." : "Save changes"}
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}
