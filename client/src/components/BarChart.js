import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [leadStages, setLeadStages] = useState([]);
  const [stageCounts, setStageCounts] = useState([]); // Changed variable name to match the state variable
  const [dataFetched, setDataFetched] = useState(false);

  // Function to generate unique colors
  const generateUniqueColors = (count) => {
    const uniqueColors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      uniqueColors.push(`hsla(${hue}, 70%, 60%, 0.7)`);
    }
    return uniqueColors;
  };

  useEffect(() => {
    fetch("http://localhost:5555/leads")
      .then((response) => {
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const counts = {}; // Changed variable name from stageCounts to counts
        data.forEach((item) => {
          const stage = item.stage;
          if (stage in counts) {
            counts[stage] += 1;
          } else {
            counts[stage] = 1;
          }
        });

        const leadStages = Object.keys(counts); // Changed variable name from stageCounts to counts
        const stageCounts = Object.values(counts); // Changed variable name from stageCounts to counts

        setLeadStages(leadStages);
        setStageCounts(stageCounts);
        setDataFetched(true);
      })
      .catch((error) => {
        console.error("Error fetching lead data:", error);
      });
  }, []);

  useEffect(() => {
    if (dataFetched && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const uniqueColors = generateUniqueColors(leadStages.length);

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: leadStages,
          datasets: [
            {
              data: stageCounts,
              backgroundColor: uniqueColors, // Use unique colors
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }, [dataFetched, leadStages, stageCounts]);

  return (
    <div>
      {dataFetched ? (
        <canvas ref={chartRef} width={400} height={400} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default BarChart;
