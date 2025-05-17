import { Cell } from '@/types/cells';
import { Table } from '@radix-ui/themes';

import CreateCell from './CreateCell';
import UpdateCell from './UpdateCell';
import DeleteCell from './DeleteCell';

function CellsList({ cells, isLoading }: { cells: Cell[]; isLoading: boolean }) {
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
            {/* <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell> */}
            <Table.ColumnHeaderCell>Room №</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Order ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Size</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Reserved Until</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Worker ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
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
                  <Table.Cell className="text-gray-500">{cell.locker_id} - {cell.id}</Table.Cell>
                  {/* <Table.RowHeaderCell className="text-gray-500">{cell.id}</Table.RowHeaderCell> */}
                  <Table.RowHeaderCell>{cell.cellNumber}</Table.RowHeaderCell>
                  <Table.Cell>{cell.order_id || '-'}</Table.Cell>
                  <Table.Cell>{cell.size}</Table.Cell>
                  <Table.Cell>
                    {cell.reserved_until === null
                      ? '-'
                      : new Date(cell.reserved_until).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </Table.Cell>
                  <Table.Cell>{cell.status}</Table.Cell>
                  <Table.Cell>{cell.worker_id || '-'}</Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-row gap-5">
                      <UpdateCell cell={cell} />
                      
                      <DeleteCell cell={cell} />
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })
          ) : null}
        </Table.Body>
      </Table.Root>
      <span className="flex flex-col gap-5">
        <p>
          Total room in all branches: <b>{isLoading ? 'Loading...' : cells?.length || 0}</b>
        </p>
      </span>
      <div className="flex flex-row gap-5 mt-5">
        <CreateCell />
        <UpdateCell />
        <DeleteCell />
      </div>
    </div>
  );
}

export default CellsList;
