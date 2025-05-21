import { User } from '@/types/users';
import axios from 'axios';

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get('http://localhost:3000/api/users', {
    withCredentials: true,
  });
  return response.data;
};

export const createUser = async (user: User) => {
  const response = await axios
    .post('http://localhost:3000/api/users', user, {
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

export const updateUser = async (user: Partial<User>) => {
  const response = await axios
    .put('http://localhost:3000/api/users', user, {
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

export const deleteUser = async (user: Pick<User, 'id'>) => {
  const response = await axios
    .delete(`http://localhost:3000/api/users/${Number(user.id)}`, {
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
