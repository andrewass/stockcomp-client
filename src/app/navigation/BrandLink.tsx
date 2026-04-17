"use client";

import Link from "next/link";

interface Props {
	href: string;
	label: string;
	subtitle: string;
}

export default function BrandLink({ href, label, subtitle }: Props) {
	return (
		<Link
			href={href}
			className="group inline-flex items-center gap-3 rounded-full border border-base-content/10 bg-base-100/80 px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/25 hover:bg-base-100 hover:shadow-md"
		>
			<span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 shadow-inner">
				<span className="absolute inset-[6px] rounded-full border border-base-content/10" />
				<span className="text-sm font-black tracking-[0.28em] text-base-content">
					SC
				</span>
			</span>
			<span className="flex flex-col leading-none">
				<span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-base-content/45">
					{subtitle}
				</span>
				<span className="text-base font-semibold tracking-[0.08em] text-base-content transition group-hover:text-primary">
					{label}
				</span>
			</span>
		</Link>
	);
}
