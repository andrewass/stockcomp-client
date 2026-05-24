export interface PaginationParams {
	pageNumber: number;
	pageSize: number;
}

export function parseParams(
	pageNumber: string,
	searchParams: { [key: string]: string | string[] | undefined },
): PaginationParams | null {
	const parsedPageNumber = Number.parseInt(pageNumber, 10);
	const parsedPageSize = searchParams.pageSize
		? Number.parseInt(String(searchParams.pageSize), 10)
		: 10;

	if (Number.isNaN(parsedPageNumber) || Number.isNaN(parsedPageSize)) {
		return null;
	}

	return { pageNumber: parsedPageNumber, pageSize: parsedPageSize };
}
