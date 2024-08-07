import { Tables } from '@/types/supabase';
import { AxiosInstance } from 'axios';

type WorkSpaceType = Tables<'workspace_user'>;

class WorkspaceUserListAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }
  async getWorkspaceUserList(workspaceId: number, workspaceUserId: string): Promise<WorkSpaceType[]> {
    const path = 'api/workspace-userlist';
    const response = await this.axios.get(path, {
      params: { workspaceId, workspaceUserId }
    });

    return response.data;
  }
}

export default WorkspaceUserListAPI;
