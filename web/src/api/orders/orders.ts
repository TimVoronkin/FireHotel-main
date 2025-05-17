import { Order } from '@/types/orders';
import axios from 'axios';

export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get('http://localhost:3000/api/orders', {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
  });
  return response.data;
};

export const createOrder = async (order: Pick<Order, 'email' | 'cell_id' | 'locker_id'>, worker_id: number) => {
  const response = await axios
    .post(
      'http://localhost:3000/api/orders',
      { ...order, worker_id },
      {
        withCredentials: true,
      },
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { message: err.response.data.message, error: true };
    });
  return response;
};

export const updateOrder = async (order: Partial<Order>) => {
  const response = await axios
    .put('http://localhost:3000/api/orders', order, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { message: err.response.data.message, error: true };
    });
  return response;
};

export const deleteOrder = async (order: Pick<Order, 'orderUuid'>) => {
  const response = await axios
    .delete(`http://localhost:3000/api/orders/?tn=${order.orderUuid}`, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { message: err.response.data.message, error: true };
    });
  return response;
};
