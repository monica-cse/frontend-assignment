import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setKeyword,
  togglePricing,
  resetFilters,
  setPriceRange,
} from "../store/filterSlice";
import ContentCard from "../components/ContentCard";
import { fetchContentData } from "../features/contentSlice";
import "../styles/StorePage.css";

const StorePage = () => {
  const dispatch = useDispatch();
  const { keyword, pricing, priceRange } = useSelector((state) => state.filter);
  const { allItems, status } = useSelector((state) => state.content);
  const [loadMoreCount, setLoadMoreCount] = useState(20);
  const [sortOption, setSortOption] = useState("name");

  // Restore filters from URL on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keywordParam = params.get("search");
    const paid = params.get("paid") === "true";
    const free = params.get("free") === "true";
    const viewOnly = params.get("viewonly") === "true";

    if (keywordParam) dispatch(setKeyword(keywordParam));
    if (paid) dispatch(togglePricing("paid"));
    if (free) dispatch(togglePricing("free"));
    if (viewOnly) dispatch(togglePricing("viewonly"));
  }, [dispatch]);

  // Update URL when keyword or pricing changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (keyword) params.set("search", keyword);
    Object.keys(pricing).forEach((key) => {
      if (pricing[key]) params.set(key, "true");
    });
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [keyword, pricing]);

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
  const handleReset = () => {
    dispatch(resetFilters());
    const baseUrl = window.location.pathname;
    window.history.replaceState(null, "", baseUrl);
  };
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

    let matchPrice = true;
    if (pricing.paid && pricingLabel === "paid") {
      matchPrice =
        item.price >= priceRange.min && item.price <= priceRange.max;
    }

    return matchKeyword && matchPricing && matchPrice;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === "name") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "price-high") {
      return (b.price || 0) - (a.price || 0);
    } else if (sortOption === "price-low") {
      return (a.price || 0) - (b.price || 0);
    }
    return 0;
  });

  const visibleItems = sortedItems.slice(0, loadMoreCount);
const [rangeMin, setRangeMin] = useState(priceRange.min);
const [rangeMax, setRangeMax] = useState(priceRange.max);

useEffect(() => {
  dispatch(setPriceRange({ min: rangeMin, max: rangeMax }));
}, [rangeMin, rangeMax]);

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

        {/* {pricing.paid && (
          <div className="slider-wrapper" >
            <label style={{ display: "flex",justifyContent: "space-between" }}>
              <span>${priceRange.min}</span>
              <span>${priceRange.max}</span>
            </label>
            <input
              type="range"
              min={0}
              max={999}
              step={1}
              value={priceRange.min}
              onChange={(e) =>
                dispatch(
                  setPriceRange({ ...priceRange, min: Number(e.target.value) })
                )
              }
            />
            <input
              type="range"
              min={0}
              max={999}
              step={1}
              value={priceRange.max}
              onChange={(e) =>
                dispatch(
                  setPriceRange({ ...priceRange, max: Number(e.target.value) })
                )
              }
            />
          </div>
        )} */}
{pricing.paid && (
  <div className="custom-slider">
    <div className="price-values">
      <span>₹{rangeMin}</span>
<span>₹{rangeMax}</span>

    </div>
    <div className="slider-track">
      <input
        type="range"
        min="0"
        max="999"
        value={rangeMin}
        onChange={(e) =>
          setRangeMin(Math.min(Number(e.target.value), rangeMax - 1))
        }
      />
      <input
        type="range"
        min="0"
        max="999"
        value={rangeMax}
        onChange={(e) =>
          setRangeMax(Math.max(Number(e.target.value), rangeMin + 1))
        }
      />
    </div>
  </div>
)}

        <button onClick={handleReset} className="reset-button">
          Reset
        </button>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="sort-dropdown"
        >
          <option value="name">Item Name (A–Z)</option>
          <option value="price-high">Higher Price</option>
          <option value="price-low">Lower Price</option>
        </select>
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
              <p className="no-results">No matching items found.</p>
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
