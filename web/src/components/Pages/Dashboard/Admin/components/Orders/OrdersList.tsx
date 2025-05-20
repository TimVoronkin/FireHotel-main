import { Order } from '@/types/orders';
import { Table } from '@radix-ui/themes';

import CreateOrder from './CreateOrder';
import UpdateOrder from './UpdateOrder';
import DeleteOrder from './DeleteOrder';

function OrdersList({ orders, isLoading }: { orders: Order[]; isLoading: boolean }) {
  return (
    <div className="flex flex-col gap-10">
      <span>
        <h1 className="text-xl font-bold text-red-500">Orders Management</h1>
      </span>


      <Table.Root className="w-full">
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
                <Table.Cell className="text-gray-500">{order.locker_id} - {order.cell_id}</Table.Cell>
                <Table.Cell>{order.orderUuid}</Table.Cell>
                <Table.Cell>{order.email}</Table.Cell>
                <Table.Cell>{order.DateFrom}</Table.Cell>
                <Table.Cell>{order.DateTo}</Table.Cell>
                <Table.Cell>{order.Name}</Table.Cell>
                <Table.Cell>{order.Surname}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-row gap-5">
                    <UpdateOrder order={order} />
                    <DeleteOrder order={order} />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))
          ) : null}
        </Table.Body>
      </Table.Root>
            <span className="flex flex-col gap-5">
        <p>Total orders: <b>{isLoading ? 'Loading...' : orders?.length || 0}</b></p>
      </span>
      <div className="flex flex-row gap-5 mt-5">
        <CreateOrder />
      </div>
    </div>
  );
}

export default OrdersList;
