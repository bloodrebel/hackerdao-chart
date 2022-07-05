import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getAssets } from "../../api/ApiCalls";
import { AssetData, IGetAssetsParams } from "../../models/assetModels";
import { createDate } from "../../utils/dateUtils";
import "./Charts.css";

const defaultGetAssetParams: IGetAssetsParams = {
  pg: 56,
  tvl_min: 50000,
  sort: "tvlStaked",
  sort_order: "desc",
  farms_tvl_staked_gte: 10000000,
};

const Charts: React.FC = () => {
  const [aprChartData, setAprChartData] = useState<any>();
  const [tvlChartData, setTvlChartData] = useState<any>();

  useEffect(() => {
    getAssets(defaultGetAssetParams).then((resp) => {
      setAprChartData(createAprChartData(10));
      setTvlChartData(createTvlChartData(resp.data));
    });
  }, []);

  return (
    <>
      <div className="chart-wrapper">
        {aprChartData && <Line data={aprChartData} options={aprChartOptions} />}
      </div>
      <div className="chart-wrapper">
        {tvlChartData && <Line data={tvlChartData} options={tvlChartOptions} />}
      </div>
    </>
  );
};
export default Charts;

const createAprChartData = (lastDays: number) => {
  const dates = [];
  const values = [];
  for (let index = lastDays; index >= 1; index--) {
    const date = createDate(-index);
    dates.push(date);

    const value = (lastDays - index) * 5;
    values.push({ x: date, y: value });
  }

  return {
    labels: dates,
    datasets: [
      {
        label: "Asset APR",
        data: values,
        fill: true,
        backgroundColor: "rgba(71,63,116,0.7)",
        borderColor: "rgb(175,80,219)",
        responsive: true,
      },
    ],
  };
};

const createTvlChartData = (assetData: AssetData[]) => {
  if (!Array.isArray(assetData)) return { datasets: [] };

  const asset = assetData[0];

  const tvlStalkedHistory = asset.selected_farm[0].tvlStakedHistory.reverse();
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
        backgroundColor: "rgba(71,63,116,0.7)",
        borderColor: "rgb(175,80,219)",
        responsive: true,
      },
    ],
  };
};

const aprChartOptions: any = {
  plugins: {
    legend: {
      labels: {
        boxWidth: 0,
        color: "white",
      },
    },
  },
  scales: {
    y: {
      ticks: {
        color: "white",

        callback: function (value: any) {
          return `${value}%`;
        },
      },
    },
    x: {
      type: "time",
      ticks: {
        color: "white",
      },
      time: {
        unit: "day",
      },
    },
  },
};

const tvlChartOptions: any = {
  plugins: {
    legend: {
      labels: {
        boxWidth: 0,
        color: "white",
      },
    },
  },
  scales: {
    y: {
      ticks: {
        color: "white",
        callback: function (value: any) {
          return `${value / 100000000}M`;
        },
      },
    },
    x: {
      type: "time",
      ticks: {
        color: "white",
      },
      time: {
        stepSize: 6,
        unit: "day",
      },
    },
  },
};
