import CustomDataGrid from "../../../components/table/CustomDataGrid";
import {GridColDef, GridDataSource, GridGetRowsParams, GridGetRowsResponse} from "@mui/x-data-grid";
import {CLIENT_BACKEND_BASE_PATH} from "../../../config/properties";
import {Contest} from "../../../domain/contests/contestTypes";

const headerColumns: GridColDef[] = [
    {headerName: "ID", field: "contestId", width: 70},
    {headerName: "Contest Name", field: "contestName", width: 150},
    {headerName: "Start Time", field: "startTime", width: 130},
    {headerName: "Contest Status", field: "contestStatus", width: 160},
    {headerName: "Leaderboard Update Status", field: "leaderboardUpdateStatus", width: 180},
    {headerName: "Edit", field: "edit", width: 70},
    {headerName: "Delete", field: "delete", width: 100},
]

const customDataSource: GridDataSource = {
    getRows: async (params: GridGetRowsParams): Promise<GridGetRowsResponse> => {
        const url = new URL(CLIENT_BACKEND_BASE_PATH + "/contests/all", "http://stockcomp.io");
        url.searchParams.set("pageNumber", String(params.paginationModel?.page));
        url.searchParams.set("pageSize", String(params.paginationModel?.pageSize))
        const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            }
        )
        const data = await response.json();
        const contests = data.contests.map((contest: Contest, index: number) => ({
                ...contest, id: index
            }));
        return {rows: contests, rowCount: 10}
    }
}


export const AdminContestsTable = () => {
    return (
        <CustomDataGrid
            columns={headerColumns}
            dataSource={customDataSource}
        />
    );
}
