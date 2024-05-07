import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {IconButton} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {AdminUpdateContestForm} from "./AdminUpdateContestForm";
import {useApiWrapper} from "../../config/useApiWrapper";
import {queryClient} from "../../config/queryConfig";
import {
    Contest,
    CONTEST_STATUS,
    contestStatusMap,
    leaderboardUpdateStatusMap
} from "../../domain/contests/contestTypes";
import {GET_ALL_CONTESTS, getDeleteContestConfig} from "../../domain/contests/contestApi";


export const AdminContestRow = ({contest}: { contest: Contest }) => {
    const {apiDeleteVoid} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: () => {
            return apiDeleteVoid(getDeleteContestConfig(contest.contestNumber))
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: [GET_ALL_CONTESTS]})
    });

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
                <AdminUpdateContestForm contest={contest}/>
            </TableCell>
            <TableCell>
                <IconButton disabled={contest.contestStatus === CONTEST_STATUS.COMPLETED}
                            onClick={() => mutation.mutate()}>
                    <DeleteForeverIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}