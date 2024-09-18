import { useState } from "react";
import assets from "../../assets/assests";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { Dropdown, Image } from "react-bootstrap";
const Navbar = () => {
  const [menu, setMenu] = useState("menu");
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout);
  };

  return (
    <div className="w-full  bg-my-violet">
      <div className="container  ">
        <nav className="flex justify-between items-center">
          <div className="h-16 w-16">
            <a href="#">
              <img className="rounded-full" src={assets.logo} alt="" />
            </a>
          </div>
          <ul className="hidden md:flex ">
            <li>
              <a
                style={{ textDecoration: "none" }}
                onClick={() => setMenu("home")}
                className={menu === "home" ? "nav-active nav-link" : "nav-link"}
                href="#"
              >
                Home
              </a>
            </li>
            <li>
              <Link to={"/newAppointment"}>
                {" "}
                <div
                  style={{ textDecoration: "none" }}
                  onClick={() => setMenu("newAppointment")}
                  className={
                    menu === "newAppointment"
                      ? "nav-active nav-link "
                      : "nav-link"
                  }
                >
                  <p className="text-center"> New Appointment</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                {" "}
                <div
                  style={{ textDecoration: "none" }}
                  onClick={() => setMenu("bookedAppointments")}
                  className={
                    menu === "bookedAppointments"
                      ? "nav-active nav-link"
                      : "nav-link"
                  }
                >
                  <p className="text-center"> Booked Appointments</p>
                </div>
              </Link>
            </li>
            <li>
              <a
                style={{ textDecoration: "none" }}
                onClick={() => setMenu("reminder")}
                className={
                  menu === "reminder" ? "nav-active nav-link" : "nav-link"
                }
                href="#"
              >
                <p>Reminder</p>
              </a>
            </li>
          </ul>
          {isAuthenticated ? (
            <Dropdown className=" hidden md:block  px-6 py-2">
              <Dropdown.Toggle
                className="flex"
                variant="default text-white"
                id="dropdown-basic"
              >
                <img
                  className="rounded-full mr-2"
                  width="50px"
                  src={assets.bg}
                />

                <span>{user.name}</span>
                <div className="flex"> </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    navigate("/myprofile");
                  }}
                  className="text-dark"
                >
                  Profile
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => logoutHandler()}
                  className="text-danger"
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link
              to={"/login"}
              className="hidden md:block bg-green-500 px-6 py-2 rounded-full text-white hover:bg-blue-300  font-medium"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={() => (show ? setShow(false) : setShow(true))}
            className="md:hidden mobile-icon"
          >
            <svg
              className="h-10 w-10 mr-3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </nav>
      </div>

      <div className="md:hidden  mobile-menu">
        <div className={show ? "" : "hidden"}>
          <ul className="flex flex-col items-center space-y-6">
            <li>
              <a
                style={{ textDecoration: "none" }}
                className="text-my-yellow font-bold hover:text-white"
                href="#"
              >
                Home
              </a>
            </li>
            <li>
              <a
                style={{ textDecoration: "none" }}
                className="text-my-yellow  font-bold hover:text-white"
                href="#"
              >
                New Appointment
              </a>
            </li>
            <li>
              <a
                style={{ textDecoration: "none" }}
                className="text-my-yellow font-bold hover:text-white"
                href="#"
              >
                Booked Appointments
              </a>
            </li>
            <li>
              <a
                style={{ textDecoration: "none" }}
                className="text-my-yellow  font-bold hover:text-white"
                href="#"
              >
                Reminder
              </a>
            </li>
            <li>
              {isAuthenticated ? (
                <Link
                  onClick={() => logoutHandler()}
                  className=" bg-green-500 px-6 py-2 rounded-full text-white hover:bg-blue-300  font-medium"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className=" bg-green-500 px-6 py-2 rounded-full text-white hover:bg-blue-300  font-medium"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
