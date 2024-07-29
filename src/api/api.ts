import axios, { AxiosInstance } from 'axios';

import ChannelAPI from './channelAPI';
import storageProfileAPI from './storageProfileAPI';
import TodoAPI from './todoAPI';
import WorkspaceUserAPI from './workspaceUserAPI';
import ChannelUserAPI from './channelUser';
import ChatAPI from './chatAPI';
import WorkspaceAPI from './workspaceAPI';
import WorkspaceUserListAPI from './workspaceUserListAPI';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class API {
  private axios: AxiosInstance;
  todo;
  channel;
  workspaceUser;
  workspaceUserList;
  storageProfile;
  channelUser;
  chat;
  workspace;

  constructor() {
    this.axios = axios.create({ baseURL: BASE_URL });

    this.todo = new TodoAPI(this.axios);
    this.channel = new ChannelAPI(this.axios);
    this.workspaceUser = new WorkspaceUserAPI(this.axios);
    this.workspaceUserList = new WorkspaceUserListAPI(this.axios);
    this.storageProfile = new storageProfileAPI(this.axios);
    this.channelUser = new ChannelUserAPI(this.axios);
    this.chat = new ChatAPI(this.axios);
    this.workspace = new WorkspaceAPI(this.axios);
  }
}

const api = new API();

export default api;
