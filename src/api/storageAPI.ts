import { APIResponse } from '@/types/common';
import { PostUploadFileProps } from '@/types/storage';
import { AxiosInstance, AxiosResponse } from 'axios';

class StorageAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  postUploadFile = async ({
    formData,
    storagePath,
    maxFileSize = 3
  }: PostUploadFileProps): Promise<AxiosResponse<string>> => {
    try {
      const { data } = await this.axios.post(`/api/storage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: {
          storagePath,
          maxFileSize
        }
      });

      return data;
    } catch (error) {
      throw new Error();
    }
  };
}

export default StorageAPI;
