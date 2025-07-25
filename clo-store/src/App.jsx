// App.jsx
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
      <header style={{ backgroundColor: "white", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", padding: "1rem", textAlign: "center", fontSize: "1.5rem", fontWeight: "600" }}>
        CLO-SET Store Page
      </header>
      <main style={{ padding: "1rem" }}>
        <StorePage />
      </main>
    </div>
  );
};

export default App;
