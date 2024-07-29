import type { CreateChatMessageProps, GetChatMessagesProps, GetChatMessagesResponse } from '@/types/chat';
import type { APIResponse } from '@/types/common';
import { AxiosInstance } from 'axios';

class ChatAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  getChatMessages = async ({ channel_id }: GetChatMessagesProps): Promise<GetChatMessagesResponse> => {
    const { data } = await this.axios.get(`/api/chat/${channel_id}`);

    return data.data;
  };

  createChatMessage = async ({
    channel_id,
    content,
    workspace_user_id,
    type,
    is_notice
  }: CreateChatMessageProps): Promise<APIResponse<[]>> => {
    const { data } = await this.axios.post(`/api/chat/${channel_id}`, {
      content,
      workspace_user_id,
      type,
      is_notice
    });

    return data;
  };
}

export default ChatAPI;
