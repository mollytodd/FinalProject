import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const ScatterPlot = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "scatter",
        data: {
          datasets: [
            {
              data: dataPoints.map((dataPoint) => ({
                x: dataPoint.lead_type,
                y: dataPoint.stage,
                backgroundColor: dataPoint.color, // Customize the point color
              })),
              pointRadius: 5, // Customize the size of data points
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "category", // Assuming lead types are categorical
              position: "bottom",
            },
            y: {
              type: "category", // Assuming lead stages are categorical
            },
          },
        },
      });
    }
  }, [dataPoints]);

  return (
    <div>
      {dataPoints.length > 0 ? (
        <canvas ref={chartRef} width={400} height={400} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ScatterPlot;
