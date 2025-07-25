// StorePage.jsx
import React, { useEffect } from "react";
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
console.log("Fetched Items:", allItems);
  useEffect(() => {
    dispatch(fetchContentData());
  }, [dispatch]);

  const handleCheckbox = (key) => dispatch(togglePricing(key));
  const handleReset = () => dispatch(resetFilters());
  const handleSearch = (e) => dispatch(setKeyword(e.target.value));

  const selectedPricing = Object.keys(pricing).filter((key) => pricing[key]);
  const filteredItems = allItems.filter((item) => {
    const matchKeyword =
      (item.title || "").toLowerCase().includes(keyword.toLowerCase()) ||
      (item.userName || "").toLowerCase().includes(keyword.toLowerCase());
    const pricingOption = typeof item.pricingOption === "string" ? item.pricingOption.toLowerCase() : "";
    const matchPricing =
      selectedPricing.length === 0 || selectedPricing.includes(pricingOption);
    return matchKeyword && matchPricing;
  });

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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  }}
>
  {filteredItems.map((item, idx) => (
    <ContentCard key={idx} item={item} />
  ))}
</div>

        )}
      </div>
    </div>
  );
};

export default StorePage;
