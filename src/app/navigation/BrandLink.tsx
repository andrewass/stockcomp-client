"use client";

import Link from "next/link";

interface Props {
	href: string;
	label: string;
	subtitle?: string;
}

export default function BrandLink({ href, label, subtitle }: Props) {
	return (
		<Link
			href={href}
			className="inline-flex min-w-0 items-center gap-2 rounded-lg bg-transparent px-2.5 py-2 shadow-none sm:gap-3 sm:px-3"
		>
			<span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 shadow-inner sm:size-11">
				<span className="absolute inset-[6px] rounded-full bg-base-100/40" />
				<span className="pl-1 text-[0.7rem] font-black tracking-[0.24em] text-base-content sm:text-sm sm:tracking-[0.28em]">
					SC
				</span>
			</span>
			<span className="flex min-w-0 flex-col leading-none">
				{subtitle ? (
					<span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-base-content/45 sm:block">
						{subtitle}
					</span>
				) : null}
				<span className="truncate text-sm font-semibold tracking-[0.05em] text-base-content sm:text-base sm:tracking-[0.08em]">
					{label}
				</span>
			</span>
		</Link>
	);
}
