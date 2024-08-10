import type {
  CreateChatMessageProps,
  GetChatMessagesProps,
  GetChatMessagesResponse,
  GetChatMessageType
} from '@/types/chat';
import type { APIResponse } from '@/types/common';
import { AxiosInstance } from 'axios';

class ChatAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  getChatMessages = async (channelId: number): Promise<GetChatMessagesResponse> => {
    const { data } = await this.axios.get(`/api/chat/${channelId}`);

    return data.data;
  };

  createChatMessage = async ({ channel_id, content, type }: CreateChatMessageProps): Promise<APIResponse<[]>> => {
    const { data } = await this.axios.post(`/api/chat/${channel_id}`, {
      content,
      type
    });

    return data;
  };

  getLatestNotice = async (chatId: string): Promise<GetChatMessageType> => {
    const { data } = await this.axios.get(`/api/chat/${chatId}/latest-notice`);

    return data.data;
  };
}

export default ChatAPI;
