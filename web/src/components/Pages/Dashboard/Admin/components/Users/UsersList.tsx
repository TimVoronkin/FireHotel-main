import { User } from '@/types/users';
import { Table } from '@radix-ui/themes';

import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

function UsersList({ users, isLoading, hideActions = false }: { users: User[]; isLoading: boolean; hideActions?: boolean }) {
  return (
    <div className="flex flex-col gap-10">
      <span>
        <h1 className="text-xl font-bold text-red-500">Users Management</h1>
      </span>
      <span className="flex flex-col gap-1">
        <p>
          Total users: <b>{isLoading ? 'Loading...' : users?.length || 0}</b>
        </p>
        <p>
          Admin users: <b>{isLoading ? 'Loading...' : users?.filter((user) => user.role === 'admin').length || 0}</b>
        </p>
        <p>
          Worker users: <b>{isLoading ? 'Loading...' : users?.filter((user) => user.role === 'worker').length || 0}</b>
        </p>
      </span>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell >Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name & Surname</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            {!hideActions && <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <Table.Cell>Loading...</Table.Cell>
            </Table.Row>
          ) : users !== undefined ? (
            users.map((user: User) => (
              <Table.Row key={user.id}>
                <Table.RowHeaderCell className="text-gray-500">{user.id}</Table.RowHeaderCell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.name} {user.last_name}</Table.Cell>
                <Table.Cell>📧 {user.email}</Table.Cell>
                <Table.Cell>📞 +{user.phone}</Table.Cell>
                <Table.Cell className="text-gray-500">{user.role}</Table.Cell>
                {!hideActions && (
                  <Table.Cell>
                    <div className="flex flex-row gap-5">
                      <UpdateUser user={user} />
                      <DeleteUser user={user} />
                    </div>
                  </Table.Cell>
                )}
              </Table.Row>
            ))
          ) : null}
        </Table.Body>
      </Table.Root>
      {!hideActions && (
        <div className="flex flex-row gap-5">
          <CreateUser />
          <UpdateUser />
          <DeleteUser />
        </div>
      )}
    </div>
  );
}

export default UsersList;
