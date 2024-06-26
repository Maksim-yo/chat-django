import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    postSignup,
    { data: signupResult, isLoading, error, isError, isSuccess },
  ] = usePostSignUpMutation();

  const onErrors = (errors) => console.error(errors);

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess]);

  const registerOptions = {
    name: {
      required: "Никнейм обязателен",
      pattern: {
        value: /^[0-9a-zA-Z\_\-]+$/,
        message:
          "Никнейм может содержать только английский алфавит и символы: [_-]",
      },
    },
    email: { required: "Почта обязательна" },
    password: {
      required: "Пароль обязателен",
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
                      Регистрация
                    </p>
                    <form
                      className="mx-1 mx-md-4"
                      action=""
                      method="POST"
                      onSubmit={handleSubmit(postSignup, onErrors)}
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="nickname">
                            Имя
                          </label>
                          <div className="text-danger">
                            {(errors?.name && errors.name?.message) ||
                              error?.data?.nickname}
                          </div>
                          <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            className="form-control"
                            {...register("nickname", registerOptions.name)}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="mail">
                            Почта
                          </label>
                          <div className="text-danger">
                            {(errors?.email && errors.email?.message) ||
                              error?.data?.email}
                          </div>
                          <input
                            type="email"
                            id="mail"
                            name="mail"
                            className="form-control"
                            {...register("email", registerOptions.email)}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <span className="form-label" for="password1">
                            Пароль
                          </span>
                          <div className="text-danger">
                            {(errors?.password && errors.password?.message) ||
                              error?.data?.password}
                          </div>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            {...register("password", registerOptions.password)}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="password2">
                            Повторите пароль
                          </label>
                          <div className="text-danger">
                            {(errors?.confirm_password &&
                              errors.confirm_password?.message) ||
                              error?.data?.confirm_password}
                          </div>
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
                        </div>
                      </div>
                      <div className="text-end mt-1">
                        <Link to="/login">Уже имеется акаунт?</Link>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 mt-1">
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
                              <span className="">Загрузка...</span>
                            </>
                          ) : (
                            "Регистрация"
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
