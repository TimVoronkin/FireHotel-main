import { Cell } from '@/types/cells';
import { Table } from '@radix-ui/themes';

import CreateCell from './CreateCell';
import UpdateCell from './UpdateCell';
import DeleteCell from './DeleteCell';

function CellsList({ cells, isLoading, hideActions = false }: { cells: Cell[]; isLoading: boolean; hideActions?: boolean }) {
  // Сортировка по locker_id, затем по id
  const sortedCells = [...cells].sort((a, b) => {
    if (a.locker_id < b.locker_id) return -1;
    if (a.locker_id > b.locker_id) return 1;
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
  return (
    <div className="flex flex-col gap-10">
      <span>
        <h1 className="text-xl font-bold text-red-500">Rooms Management</h1>
      </span>
      <Table.Root className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Branch-Room ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Room №</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Size</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            {!hideActions && <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <Table.Cell>Loading...</Table.Cell>
            </Table.Row>
          ) : cells !== undefined ? (
            sortedCells.map((cell: Cell) => {
              return (
                <Table.Row key={cell.id}>
                  <Table.Cell className="text-gray-500">
                    {cell.locker_id} - {cell.id}
                  </Table.Cell>
                  <Table.RowHeaderCell>{cell.cellNumber}</Table.RowHeaderCell>
                  <Table.Cell>{cell.size}</Table.Cell>
                  <Table.Cell>{cell.status}</Table.Cell>
                  {!hideActions && (
                    <Table.Cell>
                      <div className="flex flex-row gap-5">
                        <UpdateCell cell={cell} />
                        <DeleteCell cell={cell} />
                      </div>
                    </Table.Cell>
                  )}
                </Table.Row>
              );
            })
          ) : null}
        </Table.Body>
      </Table.Root>

      {!hideActions && (
        <div className="flex flex-row gap-5 mt-5 items-center">
          <CreateCell />
          {/* <UpdateCell />
          <DeleteCell /> */}
          <p>
            Total room in all branches: <b>{isLoading ? 'Loading...' : cells?.length || 0}</b>
          </p>
        </div>
      )}
    </div>
  );
}

export default CellsList;
