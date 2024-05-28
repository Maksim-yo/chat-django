import { logout } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePostLogoutMutation } from "../../app/services/api/apiService";
import { appApi } from "../../app/services/api/apiService";
import { authApi } from "../../app/services/api/apiService";
import { reset } from "../../features/chat/chatSlice";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const dispatch = useDispatch();
  const [postLogout, { isLoading, error, isError, isSuccess }] =
    usePostLogoutMutation();
  const navigate = useNavigate();
  useEffect(() => {
    postLogout();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());

      dispatch(appApi.util.resetApiState());
      dispatch(authApi.util.resetApiState());
      dispatch(reset());
      navigate("/login");
    }
    if (error) console.log(error);
  }, [isSuccess, error]);

  return null;
};

export default Logout;
