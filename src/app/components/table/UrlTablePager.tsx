import {
	DEFAULT_PAGE_SIZE,
	MAX_PAGE_SIZE,
} from "@/components/table/paginationParams.ts";
import TablePager from "@/components/table/TablePager.tsx";

interface Props {
	currentPage: number;
	pageSize: number;
	totalEntriesCount: number;
	basePath: string;
}

function buildPageHref(basePath: string, page: number, pageSize: number) {
	const [path, rawQuery] = basePath.split("?");
	const searchParams = new URLSearchParams(rawQuery ?? "");
	searchParams.set("pageSize", `${pageSize}`);
	return `${path.endsWith("/") ? path : `${path}/`}${page}?${searchParams}`;
}

export default function UrlTablePager({
	currentPage,
	pageSize,
	totalEntriesCount,
	basePath,
}: Props) {
	const safePageSize =
		Number.isFinite(pageSize) && pageSize >= 1
			? Math.min(Math.floor(pageSize), MAX_PAGE_SIZE)
			: DEFAULT_PAGE_SIZE;
	const totalPages =
		totalEntriesCount > 0 ? Math.ceil(totalEntriesCount / safePageSize) : 0;

	return (
		<TablePager
			currentPage={currentPage}
			totalPages={totalPages}
			navigation={{
				mode: "links",
				getPageHref: (page) => buildPageHref(basePath, page, safePageSize),
			}}
		/>
	);
}
