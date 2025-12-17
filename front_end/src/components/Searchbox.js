import React from "react";

function SearchBox({ placeholder }) {
  return (
    <div className="mb-3 position-relative">
      <input
        type="text"
        className="form-control form-control-lg ps-5 rounded-pill shadow-sm border-0"
        placeholder={placeholder}
        style={{
          backgroundColor: "#f8f9fa",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => (e.target.style.boxShadow = "0 0 8px rgba(40,167,69,0.5)")}
        onBlur={(e) => (e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)")}
      />
      <span
        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
        style={{ pointerEvents: "none" }}
      >
      </span>
    </div>
  );
}

export default SearchBox;