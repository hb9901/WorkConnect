import { GetSearchWorkspaceUsersProps, GetSearchWorkspaceUsersResponse } from '@/types/workspaceUser';
import { AxiosInstance } from 'axios';

class WorkspaceAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  getSearchWorkspaceUsers = async ({
    workspace_id,
    term
  }: GetSearchWorkspaceUsersProps): Promise<GetSearchWorkspaceUsersResponse> => {
    const { data } = await this.axios.get(`/api/workspace/${workspace_id}/users/search?term=${term}`);

    return data.data;
  };
}

export default WorkspaceAPI;
