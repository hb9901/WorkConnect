import type {
  ChannelInsertType,
  GetChannelsResponse,
  GetExistingChannelIdRequestProps,
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

  getChannels = async (): Promise<GetChannelsResponse[]> => {
    const { data } = await this.axios.get('/api/channel');

    return data.data;
  };

  getUsersInChannel = async (channelId: number): Promise<GetUsersInChannelResponse> => {
    const { data } = await this.axios.get(`/api/channel/${channelId}/users`);

    return data.data;
  };

  getExistingChannelId = async ({ other_workspace_user_id }: GetExistingChannelIdRequestProps) => {
    const { data } = await this.axios.get(
      `/api/channel/existing-id?other_workspace_user_id=${other_workspace_user_id}`
    );

    return data.data;
  };

  getChannelName = async (channelId: number): Promise<string> => {
    const { data } = await this.axios.get(`/api/channel/${channelId}/name`);

    return data.data || '';
  };
}
export default ChannelAPI;
