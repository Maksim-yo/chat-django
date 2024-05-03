import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usePostSignUpMutation } from "../../app/services/api/apiService";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // const { loading, userInfo, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [
    postSignup,
    { data: signupResult, isLoading, error, isError, isSuccess },
  ] = usePostSignUpMutation();

  const onErrors = (errors) => console.error(errors);

  const navigate = useNavigate();

  useEffect(() => {
    // if (isSuccess) navigate("/login");
    console.log(error);
    console.log(signupResult);
    // if (userInfo) navigate("/");
  }, [navigate, signupResult, error]);

  const registerOptions = {
    name: { required: "Userame is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  return (
    <section className="vh-100  ">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black border-0">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form
                      className="mx-1 mx-md-4"
                      action=""
                      method="POST"
                      onSubmit={handleSubmit(postSignup, onErrors)}
                    >
                      {error && (
                        <div className="text-danger ms-3 mb-2">
                          Error {error.status}: {error.data.detail}
                        </div>
                      )}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="nickname">
                            Username
                          </label>
                          <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            className="form-control"
                            {...register("nickname", registerOptions.name)}
                          />
                          <small className="text-danger">
                            {errors?.name && errors.name?.message}
                          </small>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="mail">
                            Email
                          </label>
                          <input
                            type="email"
                            id="mail"
                            name="mail"
                            className="form-control"
                            {...register("email", registerOptions.email)}
                          />

                          <small className="text-danger">
                            {errors?.email && errors.email?.message}
                          </small>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="password1">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            {...register("password", registerOptions.password)}
                          />
                          <small className="text-danger">
                            {errors?.password && errors.password?.message}
                          </small>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="password2">
                            Repeat your password
                          </label>
                          <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            className="form-control"
                            {...register("confirm_password", {
                              required: true,
                              validate: (val) => {
                                if (watch("password") != val) {
                                  return "Your passwords do no match";
                                }
                              },
                            })}
                          />
                          <small className="text-danger">
                            {errors?.confirm_password &&
                              errors.confirm_password?.message}
                          </small>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
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
                            "Sign up"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
