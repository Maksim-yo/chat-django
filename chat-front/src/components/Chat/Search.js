import { useEffect, useState, useRef } from "react";

export const Search = ({ disable }) => {
  return (
    <input
      x-init="$watch('search', value => setInputTimer())"
      type="search"
      class="search-input form-control rounded-4 ms-3 me-4 "
      x-model="search"
      placeholder="Search"
      aria-label="Search"
      aria-describedby="search-addon"
      disabled={disable}
    />
  );
};
