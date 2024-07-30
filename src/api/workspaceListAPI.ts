import { Tables } from '@/types/supabase';
import { TWorkspaceInfo } from '@/types/workspace';
import { AxiosInstance } from 'axios';

type TWorkSpaceListType = {
  userData: Tables<'workspace_user'>[];
  workspaceListData: TWorkspaceInfo[];
};

class WorkspaceListAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }
  async getWorkspaceList(workspaceId: number, userId: string): Promise<TWorkSpaceListType> {
    const path = 'api/workspace-list';
    const response = await this.axios.get(path, {
      params: { workspaceId, userId }
    });

    return response.data;
  }
}

export default WorkspaceListAPI;
