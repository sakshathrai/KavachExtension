// Graph.jsx

import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

import "primereact/resources/themes/lara-light-cyan/theme.css";

function Graph({ values }) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ['Urgency', 'Scarcity', 'Misdirection', 'Social Proof', 'Obstruction', 'Sneaking', 'Forced Action'],
      datasets: [
        {
          data: values,
          backgroundColor: [
            '#FF6B6B', '#FFD166', '#06D6A0', '#118AB2', '#073B4C', '#EF476F', '#B06AB3',
          ],
          hoverBackgroundColor: [
            '#FF5252', '#FFC043', '#00AE87', '#0A4C6A', '#061E2E', '#FF5E78', '#925B9F',
          ],
        },
      ],
    };

    const options = {
      cutout: '60%',
    };

    setChartData(data);
    setChartOptions(options);
  }, [values]);

  return (
    <div className="card flex justify-content-center">
      <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
    </div>
  );
}

export default Graph;
