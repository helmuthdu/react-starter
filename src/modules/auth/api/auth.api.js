// @flow
import axios from 'axios';

type GetPayload = {
  email: string,
  password: string
};

const get = (payload: GetPayload) =>
  axios.post(`https://httpstat.us/200`, {
    username: payload.email,
    password: payload.password
  });

export const authApi = {
  get
};
