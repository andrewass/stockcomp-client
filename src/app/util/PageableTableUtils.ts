export function parseParams(
	pageNumber: string,
	searchParams: { [key: string]: string | string[] | undefined },
): { pageNumber: number; pageSize: number } | null {
	const parsedPageNumber = parseInt(pageNumber, 10);
	const parsedPageSize = searchParams.pageSize
		? parseInt(String(searchParams.pageSize), 10)
		: 10;

	if (isNaN(parsedPageNumber) || isNaN(parsedPageSize)) {
		return null;
	}
	return { pageNumber: parsedPageNumber, pageSize: parsedPageSize };
}
