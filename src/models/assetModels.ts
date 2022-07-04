export interface AssetData {
  active: true;
  aprDaily: number;
  aprWeekly: number;
  aprYearly: number;
  apyYearly: number;
  asset: string;
  assetAddress: string;
  assetId: string;
  assetLockup: boolean;
  assetPopupMessage: string;
  assetPrice: number;
  auditInfo: string;
  blockchain: string;
  category: string;
  collateralLockPeriod: string;
  d_active_reason: string;
  dateAdded: string;
  dateEnding: null;
  dateStarted: null;
  dateUpdated: string;
  daysRemaining: null;

  selected_farm: SelectedFarm[];
}

export interface SelectedFarm {
  active: boolean;
  blockchain: string;
  dateAdded: string;
  dateUpdated: string;
  farmId: string;
  farmName: string;
  farmType: string;
  lastFullUpdate: string;
  riskLevel: string;
  scam: boolean;
  scamInfo: string;
  tvlChange24h: string;
  tvlChange24hValue: number;
  tvlStaked: number;
  tvlStakedHistory: TvlStalkedHistory[];
}

export interface TvlStalkedHistory {
  date: string;
  value: number;
}

export interface IGetAssetsParams {
  pg?: number;
  tvl_min?: number;
  sort?: string;
  sort_order?: "asc" | "desc";
  farms_tvl_staked_gte?: number;
}
