"use client";

import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/solid";
import type { ReactNode } from "react";

interface Props {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

interface PagerControlProps {
	page: number;
	ariaLabel: string;
	icon: ReactNode;
	disabled: boolean;
	onPageChange: (page: number) => void;
}

function PagerControl({
	page,
	ariaLabel,
	icon,
	disabled,
	onPageChange,
}: PagerControlProps) {
	return (
		<button
			type="button"
			aria-label={ariaLabel}
			className="grid size-8 place-items-center text-base-content hover:text-base-content/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content disabled:pointer-events-none disabled:text-base-content/35"
			disabled={disabled}
			onClick={() => onPageChange(page)}
		>
			{icon}
		</button>
	);
}

export default function TablePager({
	currentPage,
	totalPages,
	onPageChange,
}: Props) {
	const safeTotalPages =
		Number.isFinite(totalPages) && totalPages > 0 ? Math.floor(totalPages) : 0;
	const lastPage = Math.max(safeTotalPages - 1, 0);
	const safeCurrentPage =
		safeTotalPages === 0
			? 0
			: Math.min(Math.max(Math.floor(currentPage), 0), lastPage);
	const hasPreviousPage = safeCurrentPage > 0;
	const hasNextPage = safeCurrentPage < lastPage;

	return (
		<nav
			className="flex items-center justify-end border-t border-base-300 bg-base-200/40 px-4 py-3 text-base-content"
			aria-label="Table pagination"
		>
			<div className="flex items-center gap-2">
				<PagerControl
					page={0}
					ariaLabel="Go to first page"
					icon={<ChevronDoubleLeftIcon className="size-4" aria-hidden="true" />}
					disabled={!hasPreviousPage}
					onPageChange={onPageChange}
				/>
				<PagerControl
					page={safeCurrentPage - 1}
					ariaLabel="Go to previous page"
					icon={<ChevronLeftIcon className="size-4" aria-hidden="true" />}
					disabled={!hasPreviousPage}
					onPageChange={onPageChange}
				/>
				<span className="min-w-14 text-center text-sm font-semibold tabular-nums text-base-content">
					{safeTotalPages === 0 ? 0 : safeCurrentPage + 1}/{safeTotalPages}
				</span>
				<PagerControl
					page={safeCurrentPage + 1}
					ariaLabel="Go to next page"
					icon={<ChevronRightIcon className="size-4" aria-hidden="true" />}
					disabled={!hasNextPage}
					onPageChange={onPageChange}
				/>
				<PagerControl
					page={lastPage}
					ariaLabel="Go to last page"
					icon={
						<ChevronDoubleRightIcon className="size-4" aria-hidden="true" />
					}
					disabled={!hasNextPage}
					onPageChange={onPageChange}
				/>
			</div>
		</nav>
	);
}
