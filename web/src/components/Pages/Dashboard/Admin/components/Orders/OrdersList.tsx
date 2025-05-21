import { Order } from '@/types/orders';
import { Table } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

import { getCells } from '@/api/cells/cells';
import { getLockers } from '@/api/lockers/lockers';

import CreateOrder from './CreateOrder';
import DeleteOrder from './DeleteOrder';
import UpdateOrder from './UpdateOrder';

function OrdersList({ orders, isLoading }: { orders: Order[]; isLoading: boolean }) {
  const [lockerOptions, setLockerOptions] = useState<any[]>([]);
  const [cellOptions, setCellOptions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLockers() {
      const res = await getLockers();
      if (res && Array.isArray(res)) {
        const sorted = res.slice().sort((a, b) => a.id - b.id);
        setLockerOptions(sorted);
      }
    }
    fetchLockers();
  }, []);

  useEffect(() => {
    async function fetchCells() {
      const res = await getCells();
      if (res && Array.isArray(res)) {
        const sorted = res.slice().sort((a, b) => (a.cellNumber ?? a.id) - (b.cellNumber ?? b.id));
        setCellOptions(sorted);
      }
    }
    fetchCells();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <span>
        <h1 className="text-xl font-bold text-red-500">Orders Management</h1>
      </span>

      <Table.Root
        className="flex flex-col gap-10 w-full rounded-xl border border-gray-800 shadow-lg"
        style={{
          backgroundColor: 'rgba(24,24,27,0.60)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Branch-Room ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Order Tracking ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Receiver Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date From</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date To</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Surname</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <Table.Cell>Loading...</Table.Cell>
            </Table.Row>
          ) : orders !== undefined ? (
            orders.map((order) => (
              <Table.Row key={order.id}>
                <Table.RowHeaderCell className="text-gray-500">{order.id}</Table.RowHeaderCell>
                <Table.Cell className="text-gray-500">
                  {order.locker_id} - {order.cell_id}
                </Table.Cell>
                <Table.Cell>{order.orderUuid}</Table.Cell>
                <Table.Cell>{order.email}</Table.Cell>
                <Table.Cell>{order.DateFrom}</Table.Cell>
                <Table.Cell>{order.DateTo}</Table.Cell>
                <Table.Cell>{order.Name}</Table.Cell>
                <Table.Cell>{order.Surname}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-row gap-5">
                    <UpdateOrder order={order} lockerOptions={lockerOptions} cellOptions={cellOptions} />
                    <DeleteOrder order={order} />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))
          ) : null}
        </Table.Body>
      </Table.Root>

      <div className="flex flex-row gap-5 mt-5 items-center">
        <CreateOrder />
        <p>
          Total orders: <b>{isLoading ? 'Loading...' : orders?.length || 0}</b>
        </p>
      </div>
    </div>
  );
}

export default OrdersList;
