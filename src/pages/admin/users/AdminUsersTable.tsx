import { useState } from "react";
import { useGetPageableUsers } from "../../../domain/user/useUser";
import { User } from "../../../domain/user/userTypes";
import { AdminUserRow } from "./AdminUserRow";
import ErrorComponent from "../../../error/ErrorComponent";
import PageableTable, { Column } from "../../../components/table/PageableTable";

const columns: Column[] = [
  { id: "username", label: "Username" },
  { id: "email", label: "Email" },
  { id: "userRole", label: "User Role" },
  { id: "userStatus", label: "User Status" },
  { id: "edit", label: "Edit" },
];

export default function AdminUsersTable() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { data, isLoading, isError, error } = useGetPageableUsers(
    page,
    rowsPerPage,
  );

  function renderRow(row: User, key: number) {
    return <AdminUserRow user={row} key={key} />;
  }

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  return (
    <PageableTable<User>
      columns={columns}
      page={page}
      rowsPerPage={rowsPerPage}
      totalEntriesCount={data?.totalEntriesCount}
      rows={data?.users}
      isLoading={isLoading}
      onChangePage={setPage}
      onChangeRowsPerPage={setRowsPerPage}
      renderRow={renderRow}
    />
  );
}
