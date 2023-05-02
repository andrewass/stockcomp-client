import TableRow from "@mui/material/TableRow";
import {User} from "../../user/userTypes";
import TableCell from "@mui/material/TableCell";
import {AdminUpdateUserForm} from "./AdminUpdateUserForm";


export const AdminUserRow = ({user}: { user: User }) => {

    return (
        <TableRow key={user.email}>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.userRole}</TableCell>
            <TableCell>{user.userStatus}</TableCell>
            <TableCell>
                <AdminUpdateUserForm user={user}/>
            </TableCell>
        </TableRow>
    );
}