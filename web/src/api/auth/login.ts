import axios from 'axios';
export const Login = async (username: string, password: string) => {
  const res = await axios
    .post(
      'http://localhost:3000/api/auth/login',
      {
        username,
        password,
      },
      {
        withCredentials: true,
      },
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data.message === 'Unauthorized'
        ? { message: 'Invalid username or password', error: 'Unauthorized' }
        : { message: err.response.data.message, error: 'Unauthorized' };
    });
  return res;
};
