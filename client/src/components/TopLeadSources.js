import React from "react";

const TopLeadSources = ({ leadTypeData }) => {
  // Sort the lead types by percentage in descending order
  const sortedLeadTypes = leadTypeData.sort(
    (a, b) => b.percentage - a.percentage
  );

  // Get the top three lead types
  const topThreeLeadTypes = sortedLeadTypes.slice(0, 3);

  return (
    <div>
      <h2>Your Top 3 Lead Sources</h2>
      <div className="top-sources">
        {topThreeLeadTypes.map((leadType, index) => (
          <div key={leadType.id} className="source">
            <img src={leadType.image} alt={leadType.name} />
            <p>{leadType.name}</p>
            <p>{leadType.percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopLeadSources;
