import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { useHistory } from "react-router-dom";

const PieChart = ({ setTopSources, setFilteredLeads }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [leadTypes, setLeadTypes] = useState([]);
  const [counts, setCounts] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  

  const history = useHistory();
  // Function to generate unique colors
  const generateUniqueColors = (count) => {
    const uniqueColors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      uniqueColors.push(`hsla(${hue}, 70%, 60%, 0.7)`);
    }
    return uniqueColors;
  };

  // Function to handle click events on the chart
  const handleChartClick = (event) => {
    if (chartInstanceRef.current) {
      const chart = chartInstanceRef.current;
      const elements = chart.getElementsAtEventForMode(
        event,
        "point",
        chart.options
      );

      if (elements.length > 0) {
        // Get the index of the clicked element
        const index = elements[0].index;
        if (index >= 0 && index < leadTypes.length) {
          const leadTypeClicked = leadTypes[index];
          console.log("leadTypeClicked:", leadTypeClicked);
          history.push(`/leads/${leadTypeClicked}`);
        }
      }
    }
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
        type: "pie",
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
          onClick: handleChartClick, // Handle click events
        },
      });
    }
  }, [dataFetched, leadTypes, counts]);

  useEffect(() => {
    // Check if the chart data is available
    if (dataFetched && chartInstanceRef.current) {
      const chart = chartInstanceRef.current;

      // Access the data of the chart
      const chartData = chart.data.datasets[0].data;

      // Calculate the total number of leads
      const totalLeads = chartData.reduce((a, b) => a + b, 0);

      // Calculate the percentages for each lead type
      const percentages = chartData.map((count) =>
        ((count / totalLeads) * 100).toFixed(2)
      );

      // Create an array of objects to store lead types and their percentages
      const leadSourceData = leadTypes.map((leadType, index) => ({
        leadType,
        percentage: parseFloat(percentages[index]),
      }));

      // Sort the lead sources by percentage in descending order
      leadSourceData.sort((a, b) => b.percentage - a.percentage);

      // Extract the top 3 lead sources
      const topSources = leadSourceData.slice(0, 3);
      setTopSources(topSources); // Use props.setTopSources to update the state in Home

      // Now you can do whatever you want with the topThreeLeadSources
      console.log("Top Three Lead Sources:", topSources);
    }
  }, [dataFetched, leadTypes]);

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
