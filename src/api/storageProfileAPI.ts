import { AxiosInstance } from 'axios';

class storageProfileAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async postStorageProfile(image: File, filename: string) {
    const path = '/api/supabase-storage-profile';
    const formData = new FormData();
    formData.append('image', image);
    formData.append('filename', filename);
    const response = await this.axios.post(path, formData);
    const data = response.data;

    return data;
  }

  async getStorageProfile(filename: string) {
    const path = '/api/supabase-storage-profile';
    const response = await this.axios.get(path, {
      params: {
        filename
      }
    });
    const data = response.data;

    return data;
  }
}
export default storageProfileAPI;
