import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { clearAuthError, register } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/layouts/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function RegisterForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(register(userData));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error, {
        position: "bottom-center",

        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
    }
  }, [error, isAuthenticated, dispatch]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginBody">
          <div className="wrapper">
            <form onSubmit={submitHandler} action="">
              <h1>Register</h1>
              <div className="input-box">
                <input
                  name="name"
                  onChange={onChange}
                  type="text"
                  placeholder="Name"
                  required
                />
                <FaUserAlt className="icon" />
              </div>
              <div className="input-box">
                <input
                  name="email"
                  onChange={onChange}
                  type="text"
                  placeholder="Email"
                  required
                />
                <MdEmail className="icon iconmail" />
              </div>
              <div className="input-box">
                <input
                  name="password"
                  onChange={onChange}
                  type="password"
                  placeholder="Password"
                  required
                />
                <FaLock className="icon" />
              </div>

              {/* <div className="remember-forgot">
        <label>
          <input type="checkbox" />
          Remember me
        </label>
        <a href="#">Forgot password?</a>
      </div> */}
              <button type="submit">Register</button>
              <div className="register-link">
                <p>
                  Back to Sign In page? <a href="#">SIGN IN</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
