// // ContentCard.jsx
// import React from "react";

// const ContentCard = ({ item }) => {
//   const {
//     imagePath,
//     title,
//     creator,
//     price,
//     pricingOption,
//   } = item;

//   // Map pricingOption integers to strings
//   const pricingMap = {
//     0: "Paid",
//     1: "Free",
//     2: "View Only",
//   };
//   const pricingLabel = pricingMap[pricingOption] || "Unknown";

//   return (
//     <div
//       style={{
//         border: "1px solid #ddd",
//         borderRadius: "10px",
//         padding: "12px",
//         backgroundColor: "#fff",
//         boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
//         display: "flex",
//         flexDirection: "column",
//         transition: "transform 0.3s ease",
//         cursor: "pointer",
//         height: "100%",
//       }}
//       onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
//       onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//     >
//       <img
//         src={imagePath || "https://via.placeholder.com/300x180"}
//         alt={title}
//         style={{
//           width: "100%",
//           height: "180px",
//           objectFit: "cover",
//           borderRadius: "8px",
//           marginBottom: "10px",
//           transition: "transform 0.3s ease-in-out",
//         }}
//       />
//       <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "6px" }}>
//         {title}
//       </h3>
//       <p style={{ fontSize: "14px", color: "#666", marginBottom: "4px" }}>
//         {creator}
//       </p>
//       <p style={{ fontWeight: "bold", color: "#333", fontSize: "15px" }}>
//         {pricingOption === 0 ? `₹${price}` : pricingLabel}
//       </p>
//     </div>
//   );
// };

// export default ContentCard;



import React from "react";

const ContentCard = ({ item }) => {
  const { imagePath, title, creator, price, pricingOption } = item;

  const pricingMap = {
    0: "Paid",
    1: "Free",
    2: "View Only",
  };
  const pricingLabel = pricingMap[pricingOption] || "Unknown";

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        cursor: "pointer",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        <img
          src={imagePath || "https://via.placeholder.com/300x180"}
          alt={title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "8px",
            transition: "transform 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>

      <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "10px 0 6px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "4px" }}>
        {creator}
      </p>
      <p style={{ fontWeight: "bold", color: "#333", fontSize: "15px" }}>
        {pricingOption === 0 ? `₹${price}` : pricingLabel}
      </p>
    </div>
  );
};

export default ContentCard;
