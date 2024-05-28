import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../app/services/api/apiService";
import { setCredentials } from "../../features/auth/authSlice";
import React from "react";

const Header = () => {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {});

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  return null;
};
export default React.memo(Header);
