import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StorePage from "./pages/StorePage";
import { fetchContentData } from "./features/contentSlice";

const App = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchContentData());
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: "#f9fafb", color: "#1f2937" }}>
      <style>
        {`
          .top-header {
            position: sticky;
            top: 0;
            z-index: 999;
            background-color: #0f0f0f;
            padding: 0.8rem 2rem;
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            border-bottom: 1px solid #222;
          }

          .top-controls {
            display: flex;
            gap: 1rem;
            align-items: center;
            flex-wrap: wrap;
          }

          .top-controls input,
          .top-controls select {
            padding: 6px 12px;
            border-radius: 6px;
            border: 1px solid #444;
            background: #1a1a1a;
            color: #fff;
          }

          .mobile-toggle {
            display: none;
            font-size: 1.4rem;
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
          }

          @media (max-width: 768px) {
            .top-controls {
              display: ${menuOpen ? "flex" : "none"};
              flex-direction: column;
              align-items: stretch;
              width: 100%;
              margin-top: 1rem;
            }

            .top-controls input,
            .top-controls select {
              width: 100%;
            }

            .mobile-toggle {
              display: block;
            }
          }
        `}
      </style>

      <header className="top-header">
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            letterSpacing: "0.5px",
          }}
        >
          CLO<span style={{ color: "#FFD700" }}>-SET</span> Store
        </div>

        {/* Hamburger menu button */}
        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>

        {/* Filter controls */}
        <div className="top-controls">
          <input type="text" placeholder="Find the items you’re looking for" />
          <select>
            <option>Curator’s Pick</option>
            <option>Trending</option>
          </select>
          <select>
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
