import { InsertChannelUserType } from '@/types/channeluser';
import { AxiosInstance } from 'axios';

class ChannelUserAPI {
  private axios: AxiosInstance;
  path = 'api/channel_user';
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getChannelUserList(channel_id: number): Promise<InsertChannelUserType> {
    const response = await this.axios.get(this.path, {
      params: { channel_id }
    });

    return response.data;
  }

  async postChannelUser(row: InsertChannelUserType) {
    const response = await this.axios.post(this.path, row);
    return response.data;
  }

  async deleteChannelUser(channel_id: number, workspace_user_id: string) {
    const response = await this.axios.delete(this.path, {
      params: {
        channel_id,
        workspace_user_id
      }
    });
    return response.data;
  }
}

export default ChannelUserAPI;
