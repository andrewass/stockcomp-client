import {Box} from "@mui/material";
import {DataGrid, GridColDef, GridDataSource, GridGetRowsError, GridUpdateRowError} from "@mui/x-data-grid";


interface Props {
    columns: GridColDef[]
    dataSource: GridDataSource
}

export default function CustomDataGrid({columns, dataSource}: Props) {
    return (
        <Box sx={{height: 400, width: "100%"}}>
            <DataGrid
                columns={columns}
                pagination
                dataSource={dataSource}
                checkboxSelection
                initialState={{
                    pagination: {paginationModel: {page: 0, pageSize: 10}, rowCount: 0}
                }}
                pageSizeOptions={[5, 10, 20]}
                onDataSourceError={(error) => {
                    if (error instanceof GridGetRowsError) {
                        console.error("GridGetRowsError", error);
                    }
                    if (error instanceof GridUpdateRowError) {
                        console.error("GridUpdateRowError", error);
                    }
                }}
            />
        </Box>
    );
}
