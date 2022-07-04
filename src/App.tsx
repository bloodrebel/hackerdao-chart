import "./App.css";
import { Line } from "react-chartjs-2";

function App() {
  const labels = [1, 2, 3, 4, 5, 6, 7];

  const arpChartData = {
    labels: labels,
    datasets: [
      {
        label: "APR dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        responsive: true,
      },
    ],
  };

  const tlvChartData = {
    labels: labels,
    datasets: [
      {
        label: "TVL dataset",
        data: [10, 20, 30, 41, 50, 80],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        responsive: true,
      },
    ],
  };

  return (
    <div className="App">
      <div className="chart-wrapper">
        <Line data={arpChartData} />
      </div>
      <div className="chart-wrapper">
        <Line data={tlvChartData} />
      </div>
    </div>
  );
}

export default App;
