import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {IconButton} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {AdminUpdateContestModal} from "./AdminUpdateContestModal";
import {useApiWrapper} from "../../config/useApiWrapper";
import {queryClient} from "../../config/queryConfig";
import {
    Contest,
    CONTEST_STATUS,
    contestStatusRecord,
    leaderboardUpdateStatusMap
} from "../../domain/contests/contestTypes";
import {GET_ALL_CONTESTS, getDeleteContestConfig} from "../../domain/contests/contestApi";


export const AdminContestRow = ({contest}: { contest: Contest }) => {
    const {apiDelete} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: () => {
            return apiDelete(getDeleteContestConfig(contest.contestId))
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: [GET_ALL_CONTESTS]})
    });

    return (
        <TableRow key={contest.contestId}>
            <TableCell>{contest.contestName}</TableCell>
            <TableCell>{contest.startTime}</TableCell>
            <TableCell>
                {contestStatusRecord[contest.contestStatus]}
            </TableCell>
            <TableCell>
                {contest.contestId}
            </TableCell>
            <TableCell>
                <AdminUpdateContestModal contest={contest}/>
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
