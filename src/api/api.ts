import axios, { AxiosInstance } from 'axios';

import ChannelAPI from './channelAPi';
import storageProfileAPI from './storageProfileAPI';
import TodoAPI from './todoAPi';
import workspaceUserAPI from './workspaceUserAPI';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class API {
  private axios: AxiosInstance;
  todo;
  channel;
  workspaceUser;
  storageProfile;

  constructor() {
    this.axios = axios.create({ baseURL: BASE_URL });

    this.todo = new TodoAPI(this.axios);
    this.channel = new ChannelAPI(this.axios);
    this.workspaceUser = new workspaceUserAPI(this.axios);
    this.storageProfile = new storageProfileAPI(this.axios);

  }
}

const api = new API();

export default api;
