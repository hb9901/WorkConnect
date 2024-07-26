import { Tables } from '@/types/supabase';
import { AxiosInstance } from 'axios';

class WorkspaceUserAPI {
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

  async updateWorkspaceUser(workspaceUser: Partial<Tables<'workspace_user'>>) {
    const path = 'api/workspace-user';
    const response = await this.axios.put(path, workspaceUser);
    const data = response.data;

    return data;
  }
}

export default WorkspaceUserAPI;
