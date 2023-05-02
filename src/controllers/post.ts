import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const post = async <Data, Response>(
  url: string,
  data?: Data,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<Response>> => {
  const response = await axios.post<Response>(url, data, config);
  return response;
};
