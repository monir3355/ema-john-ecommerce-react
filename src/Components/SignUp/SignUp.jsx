import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { createUser } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    console.log(email, password, confirm);
    if (password.length < 6) {
      setError("Password more then 6 characters");
      return;
    } else if (password !== confirm) {
      setError("Password not matched");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const logged = result.user;
        setSuccess("Successfully Registration!");
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
            <h1 className="text-5xl font-bold">Sign Up!</h1>
          </div>
          <form
            onSubmit={handleSignUp}
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
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="confirm"
                  name="confirm"
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
              </div>
              <div className="form-control mt-4">
                <button className="btn bg-[#FFE0B3] hover:bg-[#FAE0B3] text-black">
                  Sign Up
                </button>
              </div>
              <p>
                <small>
                  Already have an account?{" "}
                  <Link className="text-yellow-500 link link-hover" to="/login">
                    login
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

export default SignUp;
