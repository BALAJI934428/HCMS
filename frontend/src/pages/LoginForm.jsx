import React, { Fragment, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Loader from "../components/layouts/Loader";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../components/layouts/MetaData";
import { clearAuthError, login } from "../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const LoginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      dispatch(clearAuthError);
      // toast.error(error, {
      //   position: "bottom-center",

      //   onOpen: () => {

      //   },
      // });
    }
  }, [error, isAuthenticated, dispatch]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />{" "}
          <div className="LoginBody">
            <div className="wrapper1">
              <form action="" onSubmit={LoginHandler}>
                <h1>Login</h1>
                <div className="input-box">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    value={email}
                    placeholder="Email"
                    required
                  />
                  <FaUserAlt className="icon" />
                </div>
                <div className="input-box">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    placeholder="Password"
                    required
                  />
                  <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                  <label>
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <a href="#">Forgot password?</a>
                </div>
                <button type="submit" disabled={loading}>
                  Login
                </button>
                <div className="register-link">
                  <p>
                    Don't have an account?<a href="#">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default LoginForm;
