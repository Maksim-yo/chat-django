import { logout } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Logouta = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, []);

  return null;
};

export default Logouta;
