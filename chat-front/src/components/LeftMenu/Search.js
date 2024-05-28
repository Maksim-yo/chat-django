import { useEffect, useState, useRef } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useFindChatsQuery } from "../../app/services/api/apiService";
import { setFindRoomsResult } from "../../features/chat/chatSlice";
import { useDispatch } from "react-redux";
import React from "react";

const Search = ({ disable }) => {
  const inputRef = useRef();
  const [queryData, setQueryData] = useState(skipToken); // initialize with skipToken to skip at first
  const { data, error, isError, isSuccess, isLoading } =
    useFindChatsQuery(queryData);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);
      // Send Axios request here
      if (searchTerm.trim()) setQueryData(searchTerm);
      else dispatch(setFindRoomsResult(""));
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(setFindRoomsResult(data));
    }
    if (error) console.log(error);
  }, [data, error]);

  return (
    <input
      autoComplete="off"
      ref={inputRef}
      type="search"
      className="search-input form-control ms-3 me-4 "
      placeholder="Поиск"
      aria-label="Search"
      onChange={(e) => setSearchTerm(e.target.value)}
      aria-describedby="search-addon"
      disabled={disable}
      style={{ borderRadius: "20px" }}
    />
  );
};

export default React.memo(Search);
