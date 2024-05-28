import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostLoginMutation } from "../../app/services/api/apiService";
import { setToken } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import { setAuthError } from "../../features/auth/authSlice";
import { reset } from "../../features/chat/chatSlice";
import { authApi } from "../../app/services/api/apiService";
import { appApi } from "../../app/services/api/apiService";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const loadingDuration = 1000; // 3 seconds

  useEffect(() => {
    if (!loading) return;
    let loadingTimeout = setTimeout(() => {
      if (progress >= 100) return;
      setProgress(progress + 1);
    }, loadingDuration / 100);
    if (progress === 100) {
      setLoading(false);
    }
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [progress, loading]);

  const loginOptions = {
    email: {
      required: "Почта обязательна",
    },
    password: {
      required: "Пароль обязателен!",
      pattern: {
        value: /^[0-9a-zA-Z!\_\-\$\@\#]+$/,
        message:
          "Пароль может содержать только английский алфавит и символы: [!$@#_-]",
      },

      minLength: {
        value: 8,
        message: "Пароль должен содержать не менее 8 символов",
      },
    },
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const externalErrors = useSelector((state) => state.auth.error);
  const [
    postLogin,
    { data: loginResult, isLoading, error, isError, isSuccess },
  ] = usePostLoginMutation();

  const onErrors = (errors) => console.error(errors);

  useEffect(() => {
    if (error?.status > 200) {
      setError("root.serverError", {
        type: error.status,
      });
      dispatch(appApi.util.resetApiState());
      dispatch(authApi.util.resetApiState());
      dispatch(reset());
    } else if (!externalErrors && !errors && !error)
      dispatch(setAuthError(null));
  }, [navigate, error, setError, loginResult]);

  useEffect(() => {
    if (isSuccess) {
      // setLoading(true);
      console.log(loginResult);
      dispatch(setToken(loginResult.token));
      localStorage.setItem("userToken", loginResult.token);
      navigate("/");
    }
  }, [isSuccess]);

  // useEffect(() => {
  //   if (userToken)
  // }, [userToken]);

  const handleSumbit = (event) => {
    postLogin();
  };
  return (
    <section className="vh-100">
      {/* <LoadingOutlined progress={progress } trackWidth={5} indicatorWidth={10} /> */}

      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form method="POST" onSubmit={handleSubmit(postLogin, onErrors)}>
              {/* {externalErrors && (
                <div className="text-danger ms-3 mb-2">
                  Error {externalErrors.status}: {externalErrors.data.message}
                </div>
              )} */}
              <small className="text-danger">
                <p>
                  {errors.root?.serverError.type === 400 &&
                    "Логин/пароль неправильны, пожалуйста попробуйте снова"}
                </p>
              </small>
              <div className="text-danger">
                {(errors?.email && errors.email?.message) || error?.data?.email}
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" for="mail">
                  Почта
                </label>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  className="form-control form-control-lg"
                  {...register("email", loginOptions.email)}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" for="password">
                  Пароль
                </label>
                <div className="text-danger">
                  {(errors?.password && errors.password?.message) ||
                    error?.data?.password}
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-lg"
                  {...register("password", loginOptions.password)}
                />
              </div>
              <Link to="/signup">Регистрация</Link>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block float-end"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-3"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span className="">Загрузка...</span>
                  </>
                ) : (
                  "Войти"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
