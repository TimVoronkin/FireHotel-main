import { Cell } from '@/types/cells';
import axios from 'axios';

export const getCells = async (): Promise<Cell[]> => {
  const response = await axios.get('http://localhost:3000/api/cells', {
    withCredentials: true,
  });
  return response.data;
};

export const createCell = async (
  cell: Pick<Cell, 'locker_id' | 'size' | 'status'>,
  cellNumber: number,
): Promise<{ message: string; error?: boolean }> => {
  const response = await axios
    .post(
      'http://localhost:3000/api/cells',
      { ...cell, cellNumber },
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

export const updateCell = async (cell: Partial<Cell>) => {
  const response = await axios
    .put(`http://localhost:3000/api/cells/${cell.id}`, cell, {
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

export const deleteCell = async (cell: Pick<Cell, 'id'>) => {
  const response = await axios
    .delete(`http://localhost:3000/api/cells/${cell.id}`, {
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
