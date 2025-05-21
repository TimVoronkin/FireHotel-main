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
import CreateOrder from '../Orders/CreateOrder';

function LockerList({
  lockers,
  cells,
  isLoading,
  hideActions = false,
}: {
  lockers: Locker[];
  cells: Cell[];
  isLoading: boolean;
  hideActions?: boolean;
}) {
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
    <div className="flex flex-col w-full min-h-screen gap-20 max-w-6xl">
      <div className="flex flex-col gap-10 w-full">
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
              {!hideActions && <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>}
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
                  <Table.Cell>
                    <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{locker.description}</div>
                  </Table.Cell>
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
                  {!hideActions && (
                    <Table.Cell>
                      <div className="flex flex-row gap-5">
                        <UpdateLocker locker={locker} />
                        <DeleteLocker locker={locker} />
                      </div>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))
            ) : null}
          </Table.Body>
        </Table.Root>
        {!hideActions && (
          <div className="flex flex-row gap-5 mt-5 items-center">
            <CreateLocker />
            <p>
              Total branches: <b>{isLoading ? 'Loading...' : lockers?.length || 0}</b>
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-row gap-10 w-full justify-center mt-10">
        <div className="flex-[6] flex flex-col items-center min-w-0">
          {selectedLockerId !== null && (
            <div className="flex flex-col gap-10 w-full">
              <span>
                <h1 className="text-xl font-bold text-red-500">
                  Rooms in branch #{selectedLockerId} - {lockers.find((locker) => locker.id === selectedLockerId)?.name}
                </h1>
                <p className="text-gray-600">Location: {lockers.find((locker) => locker.id === selectedLockerId)?.location}</p>
              </span>
              <Table.Root className="w-full">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Room №</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Order ID</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Size</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    {<Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {cells
                    .filter((cell) => cell.locker_id === selectedLockerId)
                    .map((cell) => (
                      <Table.Row key={cell.id}>
                        <Table.RowHeaderCell className="text-gray-500">{cell.id}</Table.RowHeaderCell>
                        <Table.RowHeaderCell>{cell.cellNumber}</Table.RowHeaderCell>
                        <Table.Cell>{cell.order_id || '-'}</Table.Cell>
                        <Table.Cell>{cell.size}</Table.Cell>
                        <Table.Cell>{cell.status}</Table.Cell>
                        <Table.Cell>
                          <div className="flex flex-row gap-3">
                          {!hideActions && (
                          <div className="flex flex-row gap-3 items-center justify-center">
                            
                            <UpdateCell cell={cell} />
                            <DeleteCell cell={cell} />
                          </div>)}
                            <CreateOrder defaultLockerId={selectedLockerId} defaultCellId={cell.id} />

                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table.Root>
              {!hideActions && (
                <div className="flex flex-row gap-5 mt-5">
                  <CreateCell />
                  {/* <UpdateCell />
                  <DeleteCell /> */}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex-[4] flex flex-col items-center min-w-0">
          <div className="rounded-lg overflow-hidden flex items-center justify-center w-full min-h-[400px]">
            {apiKey && selectedLockerId != null && (
              <iframe
                width="100%"
                height="400"
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
    </div>
  );
}

export default LockerList;
