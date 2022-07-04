import "./App.css";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getAssets } from "./api/ApiCalls";
import { AssetData, IGetAssetsParams } from "./models/assetModels";

const defaultGetAssetParams: IGetAssetsParams = {
  pg: 1,
  tvl_min: 50000,
  sort: "tvlStaked",
  sort_order: "desc",
  farms_tvl_staked_gte: 10000000,
};

function App() {
  const [aprChartData, setAprChartData] = useState<any>();
  const [tvlChartData, setTvlChartData] = useState<any>();

  useEffect(() => {
    getAssets(defaultGetAssetParams).then((resp) => {
      createAprChartData(resp.data[0]);
      createTvlChartData(resp.data[0]);
    });
  }, []);

  return (
    <div className="App">
      <div className="chart-wrapper">
        {aprChartData && <Line data={aprChartData} />}
      </div>
      <div className="chart-wrapper">
        {tvlChartData && <Line data={tvlChartData} />}
      </div>
    </div>
  );
}

export default App;

const createAprChartData = (assetData: AssetData) => {
  return {
    labels: [],
    datasets: [
      {
        label: "APR dataset",
        data: [],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        responsive: true,
      },
    ],
  };
};

const createTvlChartData = (assetData: AssetData) => {
  const tvlStalkedHistory = assetData.selectedFarm[0].tvlStakedHistory;
  const labels = tvlStalkedHistory.map((tvlHistory) => tvlHistory.date);
  const data = tvlStalkedHistory.map((tvlHistory) => tvlHistory.value);

  return {
    labels: labels,
    datasets: [
      {
        label: "TVL dataset",
        data: data,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        responsive: true,
      },
    ],
  };
};
