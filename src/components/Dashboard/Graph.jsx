import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const Graph = () => {
  const leadPotData = [
    {
      leadPotential: "High",
      leads: 3,
      color: "#2c3e50",
    },
    {
      leadPotential: "Medium",
      leads: 2,
      color: "#d3d3d3",
    },
    {
      leadPotential: "Low",
      leads: 1,
      color: "#E8142C",
    },
  ];
  const chartData = {
    labels: leadPotData.map((v) => v.leadPotential),
    datasets: [
      {
        label: "My First Dataset",
        data: leadPotData.map((v) => v.leads),
        backgroundColor: leadPotData.map((v) => v.color),
        hoverOffset: 3,
      },
    ],
  };

  return (
    <>
      <Doughnut data={chartData} />
    </>
  );
};

export default Graph;
