import TableCell from "@mui/material/TableCell";
import { AdminUpdateUserForm } from "./AdminUpdateUserForm";
import {
  User,
  userRoleRecord,
  userStatusRecord,
} from "../../../domain/user/userTypes";
import StyledTableRow from "../../../components/table/StyledTableRow";

export const AdminUserRow = ({ user }: { user: User }) => {
  return (
    <StyledTableRow rowId={user.username}>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{userRoleRecord[user.userRole]}</TableCell>
      <TableCell>{userStatusRecord[user.userStatus]}</TableCell>
      <TableCell>
        <AdminUpdateUserForm />
      </TableCell>
    </StyledTableRow>
  );
};
