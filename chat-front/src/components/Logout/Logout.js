import { logout } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePostLogoutMutation } from "../../app/services/api/apiService";
const Logout = () => {
  const dispatch = useDispatch();
  const [postLogout, { isLoading, error, isError, isSuccess }] =
    usePostLogoutMutation();

  useEffect(() => {
    postLogout();
  }, []);

  useEffect(() => {
    if (isSuccess) dispatch(logout());
    if (error) console.log(error);
  }, [isSuccess, error]);

  return null;
};

export default Logout;
