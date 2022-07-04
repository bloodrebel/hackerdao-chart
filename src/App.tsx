import "./App.css";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getAssets } from "./api/ApiCalls";
import { AssetData, IGetAssetsParams } from "./models/assetModels";
import { format } from "date-fns";
import { formatChartDate } from "./utils/dateFormater";

const defaultGetAssetParams: IGetAssetsParams = {
  pg: 58,
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
      //createAprChartData(resp.data[0]);
      setTvlChartData(createTvlChartData(resp.data[0]));
    });
  }, []);

  return (
    <div className="App">
      <div className="chart-wrapper">
        {aprChartData && <Line data={aprChartData} />}
      </div>
      <div className="chart-wrapper">
        {tvlChartData && <Line data={tvlChartData} options={tvlChartOptions} />}
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
        label: "Asset APR",
        data: [],
        fill: true,
        backgroundColor: "rgba(175,92,92,0.2)",
        borderColor: "rgba(175,192,192,1)",
        responsive: true,
      },
    ],
  };
};

const createTvlChartData = (assetData: AssetData) => {
  const tvlStalkedHistory =
    assetData.selected_farm[0].tvlStakedHistory.reverse();
  const labels = tvlStalkedHistory.map(
    (tvlHistory) => new Date(tvlHistory.date)
  );
  const data = tvlStalkedHistory.map((tvlHistory) => ({
    x: new Date(tvlHistory.date),
    y: tvlHistory.value,
  }));

  return {
    labels: labels,
    datasets: [
      {
        label: "Asset TVL",
        data: data,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        responsive: true,
      },
    ],
  };
};

const aprChartOptions: any = {
  scales: {
    y: {
      ticks: {
        callback: function (value: any) {
          return `${value}%`;
        },
      },
    },
    x: {
      type: "time",
      time: {
        stepSize: 3,
      },
    },
  },
};

const tvlChartOptions: any = {
  scales: {
    y: {
      ticks: {
        callback: function (value: any) {
          return `${value / 100000000}M`;
        },
      },
    },
    x: {
      type: "time",
      time: {
        stepSize: 3,
      },
    },
  },
};
