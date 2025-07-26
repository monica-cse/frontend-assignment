import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import StorePage from "./pages/StorePage";
import { fetchContentData } from "./features/contentSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContentData());
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: "#f9fafb", color: "#1f2937" }}>
      {/* Responsive header styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .responsive-header {
              flex-direction: column;
              align-items: flex-start !important;
              gap: 1rem;
            }

            .responsive-controls {
              flex-direction: column;
              align-items: stretch !important;
              width: 100%;
              gap: 0.5rem;
            }

            .responsive-controls input,
            .responsive-controls select {
              width: 100% !important;
            }
          }
        `}
      </style>

      <header
        className="responsive-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          backgroundColor: "#0f0f0f",
          padding: "0.8rem 2rem",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          borderBottom: "1px solid #222",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            letterSpacing: "0.5px",
          }}
        >
          CLO<span style={{ color: "#FFD700" }}>-SET</span> Store
        </div>

        <div
          className="responsive-controls"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Find the items you’re looking for"
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #444",
              background: "#1a1a1a",
              color: "#fff",
              width: "250px",
            }}
          />
          <select
            style={{
              background: "#1a1a1a",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #444",
            }}
          >
            <option>Curator’s Pick</option>
            <option>Trending</option>
          </select>
          <select
            style={{
              background: "#1a1a1a",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #444",
            }}
          >
            <option>Official</option>
            <option>Community</option>
          </select>
          <span style={{ fontSize: "0.9rem", color: "#ccc" }}>
            75,581 Items
          </span>
        </div>
      </header>

      <main style={{ padding: "1rem" }}>
        <StorePage />
      </main>
    </div>
  );
};

export default App;
