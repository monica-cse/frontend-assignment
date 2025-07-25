// // StorePage.jsx
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setKeyword,
//   togglePricing,
//   resetFilters,
// } from "../store/filterSlice";
// import ContentCard from "../components/ContentCard";
// import { fetchContentData } from "../features/contentSlice";

// const StorePage = () => {
//   const dispatch = useDispatch();
//   const { keyword, pricing } = useSelector((state) => state.filter);
//   const { allItems, status } = useSelector((state) => state.content);

//   useEffect(() => {
//     dispatch(fetchContentData());
//   }, [dispatch]);

//   const handleCheckbox = (key) => dispatch(togglePricing(key));
//   const handleReset = () => dispatch(resetFilters());
//   const handleSearch = (e) => dispatch(setKeyword(e.target.value));

//   const selectedPricing = Object.keys(pricing).filter((key) => pricing[key]);
//   const filteredItems = allItems.filter((item) => {
//     const matchKeyword =
//       (item.title || "").toLowerCase().includes(keyword.toLowerCase()) ||
//       (item.creator || "").toLowerCase().includes(keyword.toLowerCase());

//     let pricingLabel = "";
//     if (item.pricingOption === 0) pricingLabel = "paid";
//     else if (item.pricingOption === 1) pricingLabel = "free";
//     else if (item.pricingOption === 2) pricingLabel = "viewonly";

//     const matchPricing =
//       selectedPricing.length === 0 || selectedPricing.includes(pricingLabel);
//     return matchKeyword && matchPricing;
//   });

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <div
//         style={{
//           width: "280px",
//           padding: "1.5rem",
//           borderRight: "1px solid #ddd",
//           backgroundColor: "#f9f9f9",
//         }}
//       >
//         <h2 style={{ marginBottom: "1rem", fontSize: "20px" }}>Filters</h2>

//         <input
//           type="text"
//           value={keyword}
//           onChange={handleSearch}
//           placeholder="Search by title or user..."
//           style={{
//             padding: "8px",
//             width: "100%",
//             marginBottom: "1rem",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//           }}
//         />

//         <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
//           {["Paid", "Free", "View Only"].map((label) => {
//             const key = label.toLowerCase().replace(" ", "");
//             return (
//               <label key={key} style={{ fontSize: "15px" }}>
//                 <input
//                   type="checkbox"
//                   checked={pricing[key]}
//                   onChange={() => handleCheckbox(key)}
//                   style={{ marginRight: "8px" }}
//                 />
//                 {label}
//               </label>
//             );
//           })}
//         </div>

//         <button
//           onClick={handleReset}
//           style={{
//             marginTop: "1rem",
//             padding: "6px 12px",
//             backgroundColor: "#e11d48",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             width: "100%",
//           }}
//         >
//           Reset
//         </button>
//       </div>

//       {/* Main Content */}
//       <div style={{ flex: 1, padding: "2rem" }}>
//         {status === "loading" ? (
//           <p>Loading...</p>
//         ) : (
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: "2rem",
//               justifyContent: "flex-start",
//             }}
//           >
//             {filteredItems.map((item) => (
//               <div style={{ flex: "1 1 calc(25% - 2rem)", minWidth: "250px" }}>
//                 <ContentCard key={item.id} item={item} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StorePage;




// StorePage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setKeyword,
  togglePricing,
  resetFilters,
} from "../store/filterSlice";
import ContentCard from "../components/ContentCard";
import { fetchContentData } from "../features/contentSlice";

const StorePage = () => {
  const dispatch = useDispatch();
  const { keyword, pricing } = useSelector((state) => state.filter);
  const { allItems, status } = useSelector((state) => state.content);

  const [loadMoreCount, setLoadMoreCount] = useState(12);

  useEffect(() => {
    dispatch(fetchContentData());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.innerHeight + document.documentElement.scrollTop;
      const offsetHeight = document.documentElement.offsetHeight;

      if (scrollTop + 100 >= offsetHeight) {
        setLoadMoreCount((prev) => prev + 8); // Load 8 more on scroll bottom
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheckbox = (key) => dispatch(togglePricing(key));
  const handleReset = () => dispatch(resetFilters());
  const handleSearch = (e) => dispatch(setKeyword(e.target.value));

  const selectedPricing = Object.keys(pricing).filter((key) => pricing[key]);
  const filteredItems = allItems.filter((item) => {
    const matchKeyword =
      (item.title || "").toLowerCase().includes(keyword.toLowerCase()) ||
      (item.creator || "").toLowerCase().includes(keyword.toLowerCase());

    let pricingLabel = "";
    if (item.pricingOption === 0) pricingLabel = "paid";
    else if (item.pricingOption === 1) pricingLabel = "free";
    else if (item.pricingOption === 2) pricingLabel = "viewonly";

    const matchPricing =
      selectedPricing.length === 0 || selectedPricing.includes(pricingLabel);
    return matchKeyword && matchPricing;
  });

  const visibleItems = filteredItems.slice(0, loadMoreCount);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "280px",
          padding: "1.5rem",
          borderRight: "1px solid #ddd",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginBottom: "1rem", fontSize: "20px" }}>Filters</h2>

        <input
          type="text"
          value={keyword}
          onChange={handleSearch}
          placeholder="Search by title or user..."
          style={{
            padding: "8px",
            width: "100%",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {["Paid", "Free", "View Only"].map((label) => {
            const key = label.toLowerCase().replace(" ", "");
            return (
              <label key={key} style={{ fontSize: "15px" }}>
                <input
                  type="checkbox"
                  checked={pricing[key]}
                  onChange={() => handleCheckbox(key)}
                  style={{ marginRight: "8px" }}
                />
                {label}
              </label>
            );
          })}
        </div>

        <button
          onClick={handleReset}
          style={{
            marginTop: "1rem",
            padding: "6px 12px",
            backgroundColor: "#e11d48",
            color: "white",
            border: "none",
            borderRadius: "4px",
            width: "100%",
          }}
        >
          Reset
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "2rem" }}>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              justifyContent: "flex-start",
            }}
          >
            {visibleItems.map((item) => (
              <div key={item.id} style={{ flex: "1 1 calc(25% - 2rem)", minWidth: "250px" }}>
                <ContentCard item={item} />
              </div>
            ))}
            {visibleItems.length < filteredItems.length && (
              <p style={{ width: "100%", textAlign: "center", marginTop: "2rem", color: "#999" }}>
                Scroll to load more...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
