import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface Props {
	username: string;
	returnTo: string;
}

function getInitial(username: string): string {
	return username.charAt(0).toUpperCase();
}

export default function UserDetailView({ username, returnTo }: Props) {
	return (
		<div className="w-full max-w-5xl space-y-6 pb-12 pt-2">
			<Link href={returnTo} className="btn btn-ghost btn-sm w-fit gap-2">
				<ArrowLeftIcon className="size-4" aria-hidden="true" />
				Back to leaderboard
			</Link>

			<section className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
				<div className="border-b border-base-300 bg-base-200/60 p-6 sm:p-8">
					<div className="flex flex-col gap-5 sm:flex-row sm:items-center">
						<div
							className="grid size-16 shrink-0 place-items-center rounded-full bg-primary text-2xl font-semibold text-primary-content"
							aria-hidden="true"
						>
							{getInitial(username)}
						</div>
						<div className="space-y-2">
							<div className="flex flex-wrap items-center gap-2">
								<p className="text-xs font-semibold uppercase tracking-[0.24em] text-base-content/55">
									Competitor profile
								</p>
								<span className="badge badge-outline badge-sm">Preview</span>
							</div>
							<h1 className="text-3xl font-semibold tracking-tight text-base-content sm:text-4xl">
								{username}
							</h1>
							<p className="text-sm text-base-content/60">@{username}</p>
						</div>
					</div>
				</div>

				<div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
					<div className="space-y-3">
						<h2 className="text-xl font-semibold text-base-content">
							User details
						</h2>
						<p className="max-w-2xl leading-7 text-base-content/70">
							This profile page is ready for user statistics, contest history,
							rankings, and medals when the user-detail data source is added.
						</p>
					</div>
					<div className="rounded-box border border-dashed border-base-300 bg-base-200/50 p-5">
						<p className="text-sm font-medium text-base-content">
							More profile data coming soon
						</p>
						<p className="mt-2 text-sm leading-6 text-base-content/60">
							No additional user information is loaded yet.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
