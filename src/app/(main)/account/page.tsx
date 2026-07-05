import type { Metadata } from "next";
import { requireViewerSession } from "@/lib/viewer.ts";

export const metadata: Metadata = {
	title: "Account | Stock Comp",
};

interface ProfileFieldProps {
	defaultValue?: string;
	helpText?: string;
	label: string;
	name: string;
	placeholder?: string;
	type?: string;
}

function ProfileField({
	defaultValue,
	helpText,
	label,
	name,
	placeholder,
	type = "text",
}: ProfileFieldProps) {
	return (
		<label className="form-control w-full">
			<span className="label">
				<span className="label-text">{label}</span>
			</span>
			<input
				className="input input-bordered w-full"
				defaultValue={defaultValue}
				disabled={true}
				name={name}
				placeholder={placeholder}
				type={type}
			/>
			{helpText && (
				<span className="label">
					<span className="label-text-alt text-base-content/60">
						{helpText}
					</span>
				</span>
			)}
		</label>
	);
}

function getInitials(name?: string | null, email?: string | null) {
	const source = name?.trim() || email?.trim() || "?";
	return source
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part.charAt(0).toUpperCase())
		.join("");
}

export default async function AccountPage() {
	const session = await requireViewerSession("/account");
	const { user } = session;
	const initials = getInitials(user.name, user.email);

	return (
		<div className="w-full max-w-5xl space-y-6 pb-12 pt-2">
			<header className="space-y-2">
				<h1 className="text-3xl font-semibold tracking-normal">Account</h1>
				<p className="max-w-2xl text-sm leading-6 text-base-content/70 sm:text-base">
					View your signed-in account details and manage profile information.
				</p>
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
									{user.name || "Signed-in user"}
								</h2>
								<p className="truncate text-sm text-base-content/70">
									{user.email || "No email address available"}
								</p>
							</div>
						</div>
						<span className="badge badge-outline w-fit">
							Profile editing soon
						</span>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<p className="text-sm font-medium text-base-content/60">
								User ID
							</p>
							<p className="break-all text-sm">{user.id}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-base-content/60">Email</p>
							<p className="break-all text-sm">
								{user.email || "Not provided by identity provider"}
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="card border border-base-300 bg-base-100 shadow-sm">
				<form className="card-body gap-5">
					<div>
						<h2 className="card-title">Profile settings</h2>
						<p className="text-sm text-base-content/70">
							These controls are placeholders until account updates are wired to
							the backend.
						</p>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<ProfileField
							defaultValue={user.name ?? ""}
							helpText="Display name from your current sign-in provider."
							label="Display name"
							name="displayName"
							placeholder="Your display name"
						/>
						<ProfileField
							helpText="Choose a public username for leaderboard and contest views."
							label="Username"
							name="username"
							placeholder="username"
						/>
						<ProfileField
							helpText="Used for regional preferences in future account features."
							label="Country"
							name="country"
							placeholder="Country"
						/>
						<ProfileField
							helpText="Used for date and time display preferences."
							label="Time zone"
							name="timeZone"
							placeholder="Europe/Oslo"
						/>
					</div>

					<div className="card-actions justify-end">
						<button className="btn btn-primary" disabled={true} type="button">
							Save changes
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}
