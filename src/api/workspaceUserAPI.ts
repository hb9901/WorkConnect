import { AxiosInstance } from 'axios';

class workspaceUserAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getWorkspaceUser(workspaceUserId: string) {
    const path = 'api/workspace-user';
    const response = await this.axios.get(path, {
      params: { workspaceUserId }
    });
    const data = response.data;

    return data;
  }
}

export default workspaceUserAPI;
