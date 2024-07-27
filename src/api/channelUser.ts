import { ChannelUserType } from '@/types/channelUser';
import { AxiosInstance } from 'axios';

type CreateChannelUserParams = Pick<ChannelUserType, 'channel_id'> & { workspaceUserIds: ChannelUserType['workspace_user_id'][] };

class channelUserAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async createChannelUsers({ workspaceUserIds, channel_id }: CreateChannelUserParams) {
    const path = '/api/channel-user';
    const response = await this.axios.post(path, {
      workspaceUserIds,
      channel_id
    });
    return response.data;
  }
}

export default channelUserAPI;
