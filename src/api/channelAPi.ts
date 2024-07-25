import { Tables } from '@/types/supabase';
import { AxiosInstance } from 'axios';

type Channel = Tables<'channel'>;

class ChannelAPI {
  private axios: AxiosInstance;
  path = '/api/channel';

  constructor(axios: AxiosInstance) {
    this.axios = axios;
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

  async postChannel(channel: Tables<'channel'>) {
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
