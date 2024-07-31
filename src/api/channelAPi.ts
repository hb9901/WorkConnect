import type {
  ChannelInsertType,
  ChannelType,
  GetChatChannelsProps,
  GetChatChannelsResponse,
  GetExistingChannelIdRequestProps,
  GetUsersInChannelRequestProps,
  GetUsersInChannelResponse
} from '@/types/channel';
import { AxiosInstance } from 'axios';

class ChannelAPI {
  private axios: AxiosInstance;
  path;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.path = '/api/channel';
  }

  async getChannelList({ type, workspace_id }: Pick<ChannelType, 'type' | 'workspace_id'>): Promise<ChannelType[]> {
    const response = await this.axios.get(this.path, {
      params: {
        type,
        workspace_id
      }
    });
    return response.data;
  }
  async postChannel(channel: ChannelInsertType) {
    const response = await this.axios.post(this.path, channel);
    return response.data;
  }

  async deleteChannel(id: number) {
    if (!id) {
      console.error(`"id" is empty`);
      return;
    }
    const response = await this.axios.delete(this.path, {
      params: {
        id
      }
    });
    return response.data;
  }

  getChatChannels = async ({
    workspace_id,
    workspace_user_id
  }: GetChatChannelsProps): Promise<GetChatChannelsResponse[]> => {
    const { data } = await this.axios.get(
      `/api/chat?workspace_id=${workspace_id}&workspace_user_id=${workspace_user_id}`
    );

    return data.data;
  };

  getUsersInChannel = async ({
    channel_id,
    workspace_user_id
  }: GetUsersInChannelRequestProps): Promise<GetUsersInChannelResponse> => {
    const { data } = await this.axios.get(`${this.path}/${channel_id}/users?workspace_user_id=${workspace_user_id}`);

    return data.data;
  };

  getExistingChannelId = async ({ workspace_user_id, other_workspace_user_id }: GetExistingChannelIdRequestProps) => {
    const { data } = await this.axios.get(
      `${this.path}/existing-id?workspace_user_id=${workspace_user_id}&other_workspace_user_id=${other_workspace_user_id}`
    );

    return data.data;
  };
}
export default ChannelAPI;
