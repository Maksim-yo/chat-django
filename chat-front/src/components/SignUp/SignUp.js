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

  const { loading, userInfo, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [
    postSignup,
    { data: signupResult, isLoading, error, isError, isSuccess },
  ] = usePostSignUpMutation();

  const onErrors = (errors) => console.error(errors);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/login");
    if (userInfo) navigate("/");
  }, [navigate, isSuccess, userInfo]);

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
    <section class="vh-100  ">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black border-0">
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form
                      class="mx-1 mx-md-4"
                      action=""
                      method="POST"
                      onSubmit={handleSubmit(postSignup, onErrors)}
                    >
                      {error && <div class="text-danger">{error}</div>}
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <label class="form-label" for="nickname">
                            Username
                          </label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            class="form-control"
                            {...register("username", registerOptions.name)}
                          />
                          <small className="text-danger">
                            {errors?.name && errors.name.message}
                          </small>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <label class="form-label" for="mail">
                            Email
                          </label>
                          <input
                            type="email"
                            id="mail"
                            name="mail"
                            class="form-control"
                            {...register("email", registerOptions.email)}
                          />

                          <small className="text-danger">
                            {errors?.email && errors.email.message}
                          </small>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <label class="form-label" for="password1">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            class="form-control"
                            {...register("password", registerOptions.password)}
                          />
                          <small className="text-danger">
                            {errors?.password && errors.password.message}
                          </small>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <label class="form-label" for="password2">
                            Repeat your password
                          </label>
                          <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            class="form-control"
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
                              errors.confirm_password.message}
                          </small>
                        </div>
                      </div>

                      <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          class="btn btn-primary btn-lg"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span
                                class="spinner-border spinner-border-sm me-3"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              <span class="">Loading...</span>
                            </>
                          ) : (
                            "Sign up"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      class="img-fluid"
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
