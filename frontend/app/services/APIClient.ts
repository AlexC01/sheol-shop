import axios, { AxiosInstance, AxiosResponse } from "axios";

class APIClient {
  client: AxiosInstance;

  constructor(url: string = `${process.env.NEXT_PUBLIC_API_URL}/api`) {
    this.client = axios.create({
      baseURL: url,
      headers: { "Content-Type": "application/json" }
    });

    this.client.interceptors.response.use(
      response => response,
      error => {
        const { response } = error;
        return this.handleError(response);
      }
    );
  }

  protected async get<T>(path: string): Promise<AxiosResponse<T>> {
    return this.client.get<T, AxiosResponse<T>>(path);
  }

  protected async post<T>(path: string, data?: unknown, config?: any): Promise<AxiosResponse<T>> {
    return this.client.post<T, AxiosResponse<T>>(path, data, config);
  }

  // eslint-disable-next-line class-methods-use-this
  private handleError(error: any): Promise<never> {
    if (error === null || error === undefined) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
}

export default APIClient;
