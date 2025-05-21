import axios from 'axios';
import { User } from '@/types/users';

export const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${username}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
