"use client";

import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Props {
	currentPage: number;
	totalPages: number;
	pageSize: number;
	basePath: string;
}

export default function TablePager({
	currentPage,
	totalPages,
	pageSize,
	basePath,
}: Props) {
	const normalizedBasePath = basePath.endsWith("/") ? basePath : `${basePath}/`;
	const hasPreviousPage = currentPage > 0;
	const hasNextPage = currentPage < totalPages - 1;
	const currentPageLabel = totalPages === 0 ? 0 : currentPage + 1;

	const buildPageHref = (page: number) =>
		`${normalizedBasePath}${page}?pageSize=${pageSize}`;

	return (
		<div className="flex justify-end bg-base-300">
			<div className="mt-2 mb-2 flex items-center gap-4">
				{hasPreviousPage && (
					<Link
						href={buildPageHref(currentPage - 1)}
						aria-label="Go to previous page"
					>
						<BackwardIcon className="size-5" />
					</Link>
				)}
				<span>
					{currentPageLabel} of {totalPages}
				</span>
				{!hasNextPage && (
					<Link
						href={buildPageHref(currentPage + 1)}
						aria-label="Go to next page"
					>
						<ForwardIcon className="size-5" />
					</Link>
				)}
			</div>
		</div>
	);
}
