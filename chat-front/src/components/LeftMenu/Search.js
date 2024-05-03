import { useEffect, useState, useRef } from "react";

export const Search = ({ disable }) => {
  return (
    <input
      x-init="$watch('search', value => setInputTimer())"
      type="search"
      className="search-input form-control ms-3 me-4 "
      placeholder="Search"
      aria-label="Search"
      aria-describedby="search-addon"
      disabled={disable}
      style={{ borderRadius: "20px" }}
    />
  );
};
