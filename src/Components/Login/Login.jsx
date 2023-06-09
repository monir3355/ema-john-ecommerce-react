import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleSignIn = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    if (password.length < 6) {
      setError("Password more then 6 characters");
      return;
    }
    signIn(email, password)
      .then((result) => {
        const logged = result.user;
        setSuccess("Successfully logged!");
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <form
            onSubmit={handleSignIn}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />

                <div onClick={() => setShowPass(!showPass)}>
                  <input type="checkbox" />
                  <label htmlFor="password">
                    {" "}
                    <small>Show Password</small>
                  </label>
                </div>
                <label className="label">
                  <Link className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-4">
                <button className="btn bg-[#FFE0B3] hover:bg-[#FAE0B3] text-black">
                  Login
                </button>
              </div>
              <p>
                <small>
                  New to Ema-john?{" "}
                  <Link
                    className="text-yellow-500 link link-hover"
                    to="/signup"
                  >
                    Create New Account
                  </Link>
                </small>
              </p>
              <p className="text-red-500">
                <small>{error}</small>
              </p>
              <p className="text-green-400">
                <small>{success}</small>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
