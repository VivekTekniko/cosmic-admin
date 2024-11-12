import React from "react";
import { Bar } from "react-chartjs-2";

const Graph1 = () => {
  const leadPotData = [
    {
      leadPotential: 200,
      leads: 3,
      color: "#2a88c0",
    },
    {
      leadPotential: 400,
      leads: 1,
      color: "#e4a92f",
    },
    {
      leadPotential: 500,
      leads: 1,
      color: "#e4a92f",
    },
    {
      leadPotential: 200,
      leads: 1,
      color: "#e4a92f",
    },
    {
      leadPotential: 800,
      leads: 1,
      color: "#e4a92f",
    },
    {
      leadPotential: 600,
      leads: 3,
      color: "#24ae6d",
    },
    {
      leadPotential: 300,
      leads: 3,
      color: "#24ae6d",
    },
    {
      leadPotential: 300,
      leads: 3,
      color: "#24ae6d",
    },
    {
      leadPotential: 300,
      leads: 3,
      color: "#24ae6d",
    },
  ];
  const leadPotData1 = [
    {
      leadPotential: 100,
      leads: 3,
      color: "#2a88c0",
    },
    {
      leadPotential: 800,
      leads: 1,
      color: "#e4a92f",
    },
    {
      leadPotential: 300,
      leads: 1,
      color: "#e4a92f",
    },
    {
      leadPotential: 250,
      leads: 1,
      color: "#e4a92f",
    },
    {
      leadPotential: 550,
      leads: 1,
      color: "#e4a92f",
    },
    {
      leadPotential: 450,
      leads: 3,
      color: "#24ae6d",
    },
    {
      leadPotential: 400,
      leads: 3,
      color: "#24ae6d",
    },
    {
      leadPotential: 400,
      leads: 3,
      color: "#24ae6d",
    },
    {
      leadPotential: 400,
      leads: 3,
      color: "#24ae6d",
    },
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      // title: {
      //   display: true,
      //   text: "Chart.js Bar Chart",
      // },
    },
  };

  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: leadPotData.map((v) => v.leadPotential),
        backgroundColor: "#2c3e50",
      },
      {
        label: "Dataset 2",
        data: leadPotData1.map((v) => v.leadPotential),
        backgroundColor: "#d3d3d3",
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
};

export default Graph1;
