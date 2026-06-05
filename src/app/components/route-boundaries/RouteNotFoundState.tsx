import Link from "next/link";

interface Props {
	title: string;
	message: string;
	eyebrow?: string;
	href?: string;
	linkLabel?: string;
}

export default function RouteNotFoundState({
	title,
	message,
	eyebrow = "404",
	href = "/",
	linkLabel = "Return home",
}: Props) {
	return (
		<div className="flex min-h-[55vh] w-full max-w-3xl items-center justify-center py-12">
			<section className="w-full rounded-box border border-base-300 bg-base-100 p-6 text-center shadow-sm sm:p-8">
				<div className="mx-auto max-w-2xl space-y-6">
					<div className="space-y-3">
						<p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
							{eyebrow}
						</p>
						<div className="space-y-2">
							<h1 className="text-2xl font-semibold text-base-content">
								{title}
							</h1>
							<p className="text-sm leading-6 text-base-content/70">
								{message}
							</p>
						</div>
					</div>
					<Link href={href} className="btn btn-primary">
						{linkLabel}
					</Link>
				</div>
			</section>
		</div>
	);
}
