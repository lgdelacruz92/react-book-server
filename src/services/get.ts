import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const get = async <Response>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<Response>> => {
  const response = await axios.get<Response>(url, config);
  return response;
};
