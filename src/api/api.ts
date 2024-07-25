import axios, { AxiosInstance } from 'axios';
import TodoAPI from './todoAPi';
import workspaceUserAPI from './workspaceUserAPI';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class API {
  private axios: AxiosInstance;
  todo;
  workspaceUser;

  constructor() {
    this.axios = axios.create({ baseURL: BASE_URL });

    this.todo = new TodoAPI(this.axios);
    this.workspaceUser = new workspaceUserAPI(this.axios);
  }
}

const api = new API();

export default api;
