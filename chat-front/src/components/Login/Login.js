import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { usePostLoginMutation } from "../../app/services/api/apiService";
import { isCancel } from "axios";
import { setToken } from "../../features/auth/authSlice";
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  return (
    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </div>
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form method="POST" onSubmit={handleSubmit(postLogin, onErrors)}>
              <small className="text-danger">
                <p>
                  {errors.root?.serverError.type === 400 &&
                    "Login/password incorrect, please try again"}
                </p>
              </small>

              <div class="form-outline mb-4">
                <label class="form-label" for="mail">
                  Email
                </label>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  class="form-control form-control-lg"
                  {...register("email")}
                />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="form-control form-control-lg"
                  {...register("password")}
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary btn-lg btn-block float-end"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      class="spinner-border spinner-border-sm me-3"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span class="">Loading...</span>
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
