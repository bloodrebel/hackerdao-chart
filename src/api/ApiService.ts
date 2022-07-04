import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IApiServiceParams, IQueryParams } from "../models/apiModels";

const baseUrl = "https://api.multifarm.fi/jay_flamingo_random_6ix_vegas";

export const apiService = async (params: IApiServiceParams) => {
  const encodedUrl =
    baseUrl + params.url + createQueryParams(params.queryParams ?? {});

  const config: AxiosRequestConfig = {
    url: encodedUrl,
    responseType: params.responseType,
    method: params.method,
    data: params.body,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
  };

  const api: AxiosInstance = axios.create(config);

  return api.request(config);
};

export const createQueryParams = (queryParams: IQueryParams): any => {
  const queryStringArr: any = [];

  for (let [key, value] of Object.entries(queryParams)) {
    if (value !== null && value !== undefined) {
      const encoded = encodeURIComponent(value.toString());
      queryStringArr.push(`${key}=${encoded}`);
    }
  }

  if (!queryStringArr.length) {
    return "";
  }

  const queryParamsString = "?" + queryStringArr.join("&");

  return queryParamsString;
};
