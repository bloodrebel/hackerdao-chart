import { Method, ResponseType } from "axios";

export interface IApiServiceParams {
  url: string;
  responseType: ResponseType;
  method: Method;
  body?: any;
  queryParams?: any;
}

export interface IQueryParams {
  [key: string]: any;
}

export interface PaginationResponse<T> {
  data: T[];
  max_pages: number;
}