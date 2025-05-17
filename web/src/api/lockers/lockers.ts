import { Locker } from '@/types/lockers';
import axios from 'axios';

export const getLockers = async (): Promise<Locker[]> => {
  const response = await axios.get('http://localhost:3000/api/lockers', {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    },
  });
  return response.data;
};

export const createLocker = async (locker: Omit<Locker, 'id'>) => {
  const response = await axios
    .post('http://localhost:3000/api/lockers', locker, {
      withCredentials: true,

// добавил 
      // headers: {
      //   Authorization: `Bearer ${document.cookie.split('=')[1]}`,
      // },

    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { message: err.response.data.message, error: true };
    });
  return response;
};

export const updateLocker = async (locker: Partial<Locker>) => {
  const response = await axios
    .put(`http://localhost:3000/api/lockers/${locker.id}`, locker, {
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

export const deleteLocker = async (locker: Pick<Locker, 'id'>) => {
  const response = await axios
    .delete(`http://localhost:3000/api/lockers/${locker.id}`, {
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
