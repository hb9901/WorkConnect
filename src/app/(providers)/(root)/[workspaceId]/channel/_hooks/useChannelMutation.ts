import api from '@/api';
import { ChannelInsertType } from '@/types/channel';
import { CreateChannelUsersProps } from '@/types/channelUser';
import { PostUploadFileProps } from '@/types/storage';
import { useMutation } from '@tanstack/react-query';

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
    mutationFn: ({ name, type, thumbnail }: UseCreateChannelMutationProps) =>
      api.channel.postChannel({
        name,
        type,
        workspace_id,
        thumbnail
      })
  });
};

export const useMutationUploadThumbnail = ({ ...options }) => {
  return useMutation({
    mutationFn: ({ formData, storagePath, maxFileSize = 3 }: PostUploadFileProps) =>
      api.storage.postUploadFile({
        formData,
        storagePath,
        maxFileSize
      }),
    ...options
  });
};
