"use client";

import Link from "next/link";

interface Props {
	title: string;
	message: string;
	onRetry: () => void;
	eyebrow?: string;
	homeHref?: string;
	homeLabel?: string;
}

export default function RouteErrorState({
	title,
	message,
	onRetry,
	eyebrow = "Service unavailable",
	homeHref = "/",
	homeLabel = "Return home",
}: Props) {
	return (
		<div className="flex min-h-[55vh] w-full max-w-3xl items-center justify-center py-12">
			<section className="w-full rounded-box border border-error/25 bg-base-100 p-6 shadow-sm sm:p-8">
				<div className="space-y-6">
					<div className="space-y-3">
						<p className="text-sm font-medium uppercase tracking-[0.18em] text-error">
							{eyebrow}
						</p>
						<div className="space-y-2">
							<h1 className="text-2xl font-semibold text-base-content">
								{title}
							</h1>
							<p className="max-w-2xl text-sm leading-6 text-base-content/70">
								{message}
							</p>
						</div>
					</div>
					<div className="flex flex-wrap gap-3">
						<button type="button" className="btn btn-primary" onClick={onRetry}>
							Try again
						</button>
						<Link href={homeHref} className="btn btn-ghost">
							{homeLabel}
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
