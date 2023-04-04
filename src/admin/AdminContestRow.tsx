import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from "@mui/material";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";
import {getDeleteContestConfig} from "./api/adminApi";
import {useApiWrapper} from "../config/apiWrapper";
import {queryClient} from "../config/queryConfig";
import {Contest, contestStatusMap, leaderboardUpdateStatusMap} from "../contests/contestTypes";


const AdminContestRow = ({contest}: { contest: Contest }) => {

    const {apiDelete} = useApiWrapper()

    const mutation = useMutation({
        mutationFn: () => {
            return apiDelete(getDeleteContestConfig(contest.contestNumber))
        },
        onSuccess: () => queryClient.invalidateQueries("getAllContestsAdmin")
    })

    const navigate = useNavigate()

    return (
        <TableRow key={contest.contestNumber}>
            <TableCell>{contest.contestNumber}</TableCell>
            <TableCell>{contest.startTime}</TableCell>
            <TableCell>
                {contestStatusMap.get(contest.contestStatus)}
            </TableCell>
            <TableCell>
                {leaderboardUpdateStatusMap.get(contest.leaderboardUpdateStatus)}
            </TableCell>
            <TableCell>
                <IconButton onClick={() => navigate("/admin/contests/update", {state: contest})}>
                    <EditIcon/>
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton onClick={() => mutation.mutate()}>
                    <DeleteForeverIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default AdminContestRow