import api from '@/api';
import type { ChannelInsertType } from '@/types/channel';
import type { CreateChannelUsersProps } from '@/types/channelUser';
import type { CreateChatMessageProps } from '@/types/chat';
import { useMutation } from '@tanstack/react-query';

type UseChatMessageProps = Pick<CreateChatMessageProps, 'channel_id' | 'workspace_user_id'> & {
  onSuccess?: () => void;
};
type UseChatMessageMutationProps = Omit<CreateChatMessageProps, 'channel_id' | 'workspace_user_id'>;

export const useMutationChatMessage = ({ channel_id, workspace_user_id, ...props }: UseChatMessageProps) => {
  return useMutation({
    mutationFn: ({ content, type, is_notice }: UseChatMessageMutationProps) => {
      return api.chat.createChatMessage({
        channel_id,
        content,
        workspace_user_id,
        type,
        is_notice
      });
    },
    ...props
  });
};

export const useMutationCreateChannelUsers = () => {
  return useMutation({
    mutationFn: ({ channel_id, workspaceUserIds }: CreateChannelUsersProps) => {
      return api.channelUser.createChannelUsers({ channel_id, workspaceUserIds });
    }
  });
};

type UseCreateChannelProps = Pick<ChannelInsertType, 'workspace_id'>;
type UseCreateChannelMutationProps = Omit<ChannelInsertType, 'workspace_id'>;

export const useMutationCreateChannel = ({ workspace_id }: UseCreateChannelProps) => {
  return useMutation({
    mutationFn: ({ name, type }: UseCreateChannelMutationProps) =>
      api.channel.postChannel({
        name,
        type,
        workspace_id
      })
  });
};
