import { IApiServiceParams, PaginationResponse } from "../models/apiModels";
import { AssetData, IGetAssetsParams } from "../models/assetModels";
import { apiService } from "./ApiService";
import { GET_ASSETS } from "./routes";

export const getAssets = async (params?: IGetAssetsParams): Promise<PaginationResponse<AssetData>> => {
  const apiParams: IApiServiceParams = {
    url: GET_ASSETS,
    responseType: "json",
    method: "GET",
    queryParams: params,
  };

  return apiService(apiParams).then((response) => {
    return response.data;
  });
};
