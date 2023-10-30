import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [leadTypes, setLeadTypes] = useState([]);
  const [counts, setCounts] = useState([]);
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
        const leadTypeCounts = {};
        data.forEach((item) => {
          const leadType = item.lead_type;
          if (leadType in leadTypeCounts) {
            leadTypeCounts[leadType] += 1;
          } else {
            leadTypeCounts[leadType] = 1;
          }
        });

        const leadTypes = Object.keys(leadTypeCounts);
        const counts = Object.values(leadTypeCounts);

        setLeadTypes(leadTypes);
        setCounts(counts);
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

      const totalLeads = counts.reduce((a, b) => a + b, 0);
      const percentages = counts.map((count) =>
        ((count / totalLeads) * 100).toFixed(2)
      );

      const uniqueColors = generateUniqueColors(leadTypes.length);

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: leadTypes.map(
            (leadType, index) => `${leadType} (${percentages[index]}%)`
          ),
          datasets: [
            {
              data: counts,
              backgroundColor: uniqueColors, // Use unique colors
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [dataFetched, leadTypes, counts]);

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

export default PieChart;
