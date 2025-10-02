import TableCell from "@mui/material/TableCell";
import StyledTableRow from "../../../components/table/StyledTableRow";
import {
	type User,
	userRoleRecord,
	userStatusRecord,
} from "../../../domain/user/userTypes";
import { AdminUpdateUserForm } from "./AdminUpdateUserForm";

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
