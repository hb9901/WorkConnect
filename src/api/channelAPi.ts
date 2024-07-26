import { ChannelInsertType } from '@/types/channel';
import { Tables } from '@/types/supabase';
import { AxiosInstance } from 'axios';

type Channel = Tables<'channel'>;

class ChannelAPI {
  private axios: AxiosInstance;
  path;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.path = '/api/channel';
  }

  async getChannelList(type: string, workspace_id: number): Promise<Channel[]> {
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
}
export default ChannelAPI;
