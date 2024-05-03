import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostLoginMutation } from "../../app/services/api/apiService";
import { setToken } from "../../features/auth/authSlice";
import { LoadingOutlined } from "../LoadingOutlined/LoadingOutlined";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const loadingDuration = 1000; // 3 seconds

  useEffect(() => {
    let loadingTimeout = setTimeout(() => {
      if (loading >= 100) return;
      setProgress(progress + 1);
    }, loadingDuration / 100);
    if (progress === 100) {
      setLoading(false);
    }
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [progress, loading]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { userInfo } = useSelector((state) => state.auth);
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
    }
  }, [navigate, error, setError, loginResult]);

  useEffect(() => {
    if (isSuccess) {
      console.log(loginResult);
      dispatch(setToken(loginResult.token));
      localStorage.setItem("userToken", loginResult.token);
      navigate("/");
    }
  }, [isSuccess]);

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
              {externalErrors && (
                <div className="text-danger ms-3 mb-2">
                  Error {externalErrors.status}: {externalErrors.data.message}
                </div>
              )}
              <small className="text-danger">
                <p>
                  {errors.root?.serverError.type === 400 &&
                    "Login/password incorrect, please try again"}
                </p>
              </small>

              <div className="form-outline mb-4">
                <label className="form-label" for="mail">
                  Email
                </label>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  className="form-control form-control-lg"
                  {...register("email")}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" for="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-lg"
                  {...register("password")}
                />
              </div>

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
                    <span className="">Loading...</span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
