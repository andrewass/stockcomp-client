import TableRow from "@mui/material/TableRow";
import {User} from "../../user/userTypes";


export const AdminUserRow = ({user}: { user: User }) => {

    return (
        <TableRow key={user.email}>
        </TableRow>
    );
}