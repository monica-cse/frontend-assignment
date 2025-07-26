import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setKeyword,
  togglePricing,
  resetFilters,
} from "../store/filterSlice";
import ContentCard from "../components/ContentCard";
import { fetchContentData } from "../features/contentSlice";
import "../styles/StorePage.css"; 

const StorePage = () => {
  const dispatch = useDispatch();
  const { keyword, pricing } = useSelector((state) => state.filter);
  const { allItems, status } = useSelector((state) => state.content);
  const [loadMoreCount, setLoadMoreCount] = useState(20);

  useEffect(() => {
    dispatch(fetchContentData());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100) {
        setLoadMoreCount((prev) => prev + 20);
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
    <div>
      {/* Top Filter Bar */}
      <div className="top-filter-bar">
        <h2 className="filters-title">Filters</h2>
        
        <input
          type="text"
          value={keyword}
          onChange={handleSearch}
          placeholder="Search by title or user..."
          className="search-input"
        />

        <div className="checkbox-group">
          {["Paid", "Free", "View Only"].map((label) => {
            const key = label.toLowerCase().replace(" ", "");
            return (
              <label key={key} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={pricing[key]}
                  onChange={() => handleCheckbox(key)}
                  className="checkbox-input"
                />
                {label}
              </label>
            );
          })}
        </div>

        <button onClick={handleReset} className="reset-button">
          Reset
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {status === "loading" ? (
          <div className="spinner-container">
            <div className="spinner" />
          </div>
        ) : (
          <div className="content-grid">
            {visibleItems.length === 0 ? (
              <p className="no-results">
                No matching items found.
              </p>
            ) : (
              visibleItems.map((item) => (
                <div key={item.id} className="content-card-wrapper">
                  <ContentCard item={item} />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;