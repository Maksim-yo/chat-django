import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useGetUserDetailsQuery } from "../app/services/api/apiService";
import React from "react";

const ChatWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {});

  useEffect(() => {
    // console.log(children);
    if (data) {
      console.log(data);
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  if (isFetching) return null;
  return <>{children}</>;
};
export default ChatWrapper;
