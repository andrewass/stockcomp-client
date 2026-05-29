export interface PaginationParams {
	pageNumber: number;
	pageSize: number;
}

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

type SearchParamValue = string | string[] | undefined;

function getSingleParamValue(value: SearchParamValue): string | null {
	if (value === undefined) {
		return null;
	}

	if (Array.isArray(value)) {
		return null;
	}

	return value;
}

function parseNonNegativeInteger(value: string): number | null {
	if (!/^\d+$/.test(value)) {
		return null;
	}

	const parsedValue = Number(value);
	if (!Number.isSafeInteger(parsedValue)) {
		return null;
	}

	return parsedValue;
}

export function parseParams(
	pageNumber: string,
	searchParams: { [key: string]: string | string[] | undefined },
): PaginationParams | null {
	const parsedPageNumber = parseNonNegativeInteger(pageNumber);
	const pageSizeParam = getSingleParamValue(searchParams.pageSize);
	const parsedPageSize =
		pageSizeParam === null
			? DEFAULT_PAGE_SIZE
			: parseNonNegativeInteger(pageSizeParam);

	if (parsedPageNumber === null || parsedPageSize === null) {
		return null;
	}

	if (parsedPageSize < 1 || parsedPageSize > MAX_PAGE_SIZE) {
		return null;
	}

	return { pageNumber: parsedPageNumber, pageSize: parsedPageSize };
}
