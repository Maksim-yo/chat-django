import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/auth/authAction";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = (data) => dispatch(userLogin(data));

  const onErrors = (errors) => console.error(errors);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

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
            <form method="POST" onSubmit={handleSubmit(onFormSubmit, onErrors)}>
              <div class="form-outline mb-4">
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  class="form-control form-control-lg"
                  {...register("email")}
                />
                <label class="form-label" for="mail">
                  Username
                </label>
              </div>

              <div class="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="form-control form-control-lg"
                  {...register("password")}
                />
                <label class="form-label" for="password">
                  Password
                </label>
              </div>

              <button
                type="submit"
                class="btn btn-primary btn-lg btn-block float-end"
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
