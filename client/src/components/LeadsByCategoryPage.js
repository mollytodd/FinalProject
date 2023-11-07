// // LeadsByCategoryPage.js

// import React from "react";
// import { useParams } from "react-router-dom";

// const LeadsByCategoryPage = () => {
//   const { category } = useParams();

//   // Assume you have a leads array in your state
//   const leads = [
//     // Your lead data here
//   ];

//   // Filter leads based on the selected category
//   const filteredLeads = leads.filter((lead) => lead.lead_type === category);

//   return (
//     <div>
//       <h1>Leads in the "{category}" Category</h1>
//       {filteredLeads.map((lead) => (
//         <div key={lead.id}>
//           {/* Display lead information here */}
//           <p>{lead.lead_name}</p>
//           {/* Add more lead details as needed */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeadsByCategoryPage;
