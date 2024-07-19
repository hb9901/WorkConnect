import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class API {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({ baseURL: BASE_URL });
  }
}

const api = new API();

export default api;
