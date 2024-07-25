import { Tables } from '@/types/supabase';
import { AxiosInstance } from 'axios';

class ChannelAPI {
  private axios: AxiosInstance;
  path = '/api/channel';

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getChannelList(type: string) {
    const response = await this.axios.get(this.path, {
      params: {
        type
      }
    });
    return response.data;
  }

  async postChannel(channel: Tables<'channel'>) {
    const response = await this.axios.post(this.path, channel);
    return response.data;
  }

  async deleteChannel(name: string, type: string) {
    if (name === '' || type === '') {
      console.error(`"name" or "type" is empty`);
      return;
    }
    const response = await this.axios.delete(this.path, {
      params: {
        name,
        type
      }
    });
    return response.data;
  }
}
export default ChannelAPI;
