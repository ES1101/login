import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["2020", "2021", "2022", "2023", "2024"];
const options = {
  reponsive: true,
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: "파란색",
      data: [32, 42, 51, 60, 51, 95, 97],
      backgroundColor: "#0CD3FF",
      borderColor: "#0CD3FF",
    },
    {
      label: "빨간색",
      data: [37, 42, 41, 37, 31, 44, 42],
      backgroundColor: "#a6120d",
      borderColor: "#a6120d",
    },
    {
      label: "노란색",
      data: [60, 54, 54, 28, 27, 49, 52],
      backgroundColor: "#FFCA29",
      borderColor: "#FFCA29",
    },
  ],
};

const Charts = () => {
  return (
    <div>
      <a style={{ fontSize: "10px" }}>차트</a>
      <div style={{ width: 300, height: 150 }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default Charts;
