import { useState } from 'react';
import { Locker } from '@/types/lockers';
import { Cell } from '@/types/cells';
import { Table } from '@radix-ui/themes';

import UpdateLocker from './UpdateLocker';
import CreateLocker from './CreateLocker';
import DeleteLocker from './DeleteLocker';
import CreateCell from '../Cells/CreateCell';
import UpdateCell from '../Cells/UpdateCell';
import DeleteCell from '../Cells/DeleteCell';
import { Button } from '@radix-ui/themes';
import { useEffect } from 'react';

function LockerList({ lockers, cells, isLoading }: { lockers: Locker[]; cells: Cell[]; isLoading: boolean }) {
  const [selectedLockerId, setSelectedLockerId] = useState<number | null>(null);
  const handleShowCells = (lockerId: number) => {
    setSelectedLockerId(selectedLockerId === lockerId ? null : lockerId);
  };
  const [apiKey, setApiKey] = useState('');
  useEffect(() => {
    fetch('http://localhost:3000/api/config')
      .then((response) => response.json())
      .then((data) => setApiKey(data.googleMapsApiKey))
      .catch((error) => console.error('Error fetching API key:', error));
  }, []);

  return (
    <div className="flex flex-wrap gap-10">
      <div className="flex flex-col gap-10">
        <span>
          <h1 className="text-xl font-bold text-red-500">Branches Management</h1>
        </span>

        <Table.Root className="w-full">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Total rooms</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading ? (
              <Table.Row>
                <Table.Cell>Loading...</Table.Cell>
              </Table.Row>
            ) : lockers !== undefined ? (
              lockers.map((locker: Locker) => (
                <Table.Row key={locker.id}>
                  <Table.RowHeaderCell className="text-gray-500">{locker.id}</Table.RowHeaderCell>
                  <Table.Cell>{locker.location}</Table.Cell>
                  <Table.Cell>{locker.name}</Table.Cell>
                  <Table.Cell>{locker.description}</Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-row gap-5 items-center justify-center">
                      <span>{cells.filter((cell) => cell.locker_id === locker.id).length}</span>
                      <Button variant="ghost" color="green" onClick={() => handleShowCells(locker.id)}>
                        {selectedLockerId === locker.id ? (
                          <img src="/eye-opened.svg" alt="Hide Cells" className="w-7 h-7" />
                        ) : (
                          <img src="/eye-closed.svg" alt="Show Cells" className="w-7 h-7" />
                        )}
                      </Button>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-row gap-5">
                      <UpdateLocker locker={locker} />
                      <DeleteLocker locker={locker} />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : null}
          </Table.Body>
        </Table.Root>

        <span className="flex flex-col gap-5">
          <p>
            Total branches: <b>{isLoading ? 'Loading...' : lockers?.length || 0}</b>
          </p>
        </span>
        <div className="flex flex-row gap-5 mt-5">
          <CreateLocker />
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        <div>
          {selectedLockerId !== null && (
            <div className="flex flex-col gap-10">
              <span>
                <h1 className="text-xl font-bold text-red-500">Rooms in branch #{selectedLockerId}</h1>
              </span>

              <Table.Root className="w-full">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Room Number</Table.ColumnHeaderCell>
                    {/* <Table.ColumnHeaderCell>Locker ID</Table.ColumnHeaderCell> */}
                    <Table.ColumnHeaderCell>Order ID</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Size</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Reserved Until</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Worker ID</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {cells
                    .filter((cell) => cell.locker_id === selectedLockerId)
                    .map((cell) => (
                      <Table.Row key={cell.id}>
                        <Table.RowHeaderCell className="text-gray-500">{cell.id}</Table.RowHeaderCell>
                        <Table.RowHeaderCell>{cell.cellNumber}</Table.RowHeaderCell>
                        {/* <Table.Cell>{cell.locker_id}</Table.Cell> */}
                        <Table.Cell>{cell.order_id || '-'}</Table.Cell>
                        <Table.Cell>{cell.size}</Table.Cell>
                        <Table.Cell>
                          {cell.reserved_until === null
                            ? '-'
                            : new Date(cell.reserved_until).toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                              })}
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
                    ))}
                </Table.Body>
              </Table.Root>
              <div className="flex flex-row gap-5 mt-5">
                <CreateCell />
                <UpdateCell />
                <DeleteCell />
              </div>
            </div>
          )}
        </div>
        <div className="rounded-lg overflow-hidden ">
          {apiKey && selectedLockerId != null && (
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}
              &q=${encodeURIComponent(
                `${lockers.find((locker) => locker.id === selectedLockerId)?.location || ''}, ${
                  lockers.find((locker) => locker.id === selectedLockerId)?.name || ''
                }`,
              )}`}
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}

export default LockerList;
