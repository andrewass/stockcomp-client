import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
	currentPage: number;
	totalPages: number;
	pageSize: number;
	basePath: string;
}

interface PagerControlProps {
	href: string;
	ariaLabel: string;
	icon: ReactNode;
	disabled: boolean;
}

function buildPageHref(
	basePath: string,
	page: number,
	pageSize: number,
): string {
	const [path, rawQuery] = basePath.split("?");
	const normalizedPath = path.endsWith("/") ? path : `${path}/`;
	const searchParams = new URLSearchParams(rawQuery ?? "");
	searchParams.set("pageSize", `${pageSize}`);
	return `${normalizedPath}${page}?${searchParams.toString()}`;
}

function PagerControl({ href, ariaLabel, icon, disabled }: PagerControlProps) {
	if (disabled) {
		return (
			<span
				className="grid size-8 place-items-center text-base-content/35 pointer-events-none"
				role="button"
				aria-disabled="true"
				tabIndex={-1}
			>
				{icon}
			</span>
		);
	}

	return (
		<Link
			href={href}
			aria-label={ariaLabel}
			className="grid size-8 place-items-center text-base-content hover:text-base-content/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content"
		>
			{icon}
		</Link>
	);
}

export default function TablePager({
	currentPage,
	totalPages,
	pageSize,
	basePath,
}: Props) {
	const safePageSize =
		Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 10;
	const safeTotalPages =
		Number.isFinite(totalPages) && totalPages > 0 ? Math.floor(totalPages) : 0;
	const lastPage = Math.max(safeTotalPages - 1, 0);
	const safeCurrentPage =
		safeTotalPages === 0
			? 0
			: Math.min(Math.max(Math.floor(currentPage), 0), lastPage);
	const hasPreviousPage = safeCurrentPage > 0;
	const hasNextPage = safeCurrentPage < lastPage;
	const currentPageLabel = safeTotalPages === 0 ? 0 : safeCurrentPage + 1;

	return (
		<nav
			className="flex items-center justify-end border-t border-base-300 bg-base-200/40 px-4 py-3 text-base-content"
			aria-label="Table pagination"
		>
			<div className="flex items-center gap-2">
				<PagerControl
					href={buildPageHref(basePath, 0, safePageSize)}
					ariaLabel="Go to first page"
					icon={<ChevronDoubleLeftIcon className="size-4" />}
					disabled={!hasPreviousPage}
				/>
				<PagerControl
					href={buildPageHref(basePath, safeCurrentPage - 1, safePageSize)}
					ariaLabel="Go to previous page"
					icon={<ChevronLeftIcon className="size-4" />}
					disabled={!hasPreviousPage}
				/>
				<span className="min-w-14 text-center text-sm font-semibold tabular-nums text-base-content">
					{currentPageLabel}/{safeTotalPages}
				</span>
				<PagerControl
					href={buildPageHref(basePath, safeCurrentPage + 1, safePageSize)}
					ariaLabel="Go to next page"
					icon={<ChevronRightIcon className="size-4" />}
					disabled={!hasNextPage}
				/>
				<PagerControl
					href={buildPageHref(basePath, lastPage, safePageSize)}
					ariaLabel="Go to last page"
					icon={<ChevronDoubleRightIcon className="size-4" />}
					disabled={!hasNextPage}
				/>
			</div>
		</nav>
	);
}
