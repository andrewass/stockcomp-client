import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from "@mui/material";
import {deleteContest} from "../adminClient";
import {queryClient} from "../../../config/queryConfig";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";

const AdminContestRow = ({contest}) => {

    const deleteMutation = useMutation(() => deleteContest(contest.contestNumber), {
        onSuccess: () => queryClient.invalidateQueries("getAllContests"),
        onError: (error) => console.log(error)
    });

    const navigate = useNavigate();

    return (
        <TableRow key={contest.contestNumber}>
            <TableCell>{contest.contestNumber}</TableCell>
            <TableCell>{contest.startTime}</TableCell>
            <TableCell>{contest.contestStatus}</TableCell>
            <TableCell>{contest.leaderboardUpdateStatus}</TableCell>
            <TableCell>
                <IconButton onClick={() => navigate("/admin/contests/update", {state:  contest})}>
                    <EditIcon/>
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton onClick={deleteMutation.mutate}>
                    <DeleteForeverIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default AdminContestRow;