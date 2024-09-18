import React from "react";
import assets from "../assets/assests";
import Navbar from "../components/layouts/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function MyProfile() {
  const { user } = useSelector((state) => state.authState);
  const value = String(user.createdAt).split("");
  const date = value.slice(0, 10).join("");

  return (
    <div>
      <Navbar />
      <div className="container container-fluid">
        <h2 className="flex justify-center mt-4 headline headline--text-stroke myProfileHead">
          My Profile
        </h2>
        <div className="row justify-content-around user-info">
          <div className="col-12 col-md-3 flex flex-col  items-center">
            <div className=" avatar-profile ">
              <img
                className=" myProfileImage  img-fluid"
                src={user.avatar ? user.avatar : "/images/default_avatar.png"}
                alt=""
              />
            </div>
            <div className="myprofile-edit-button-div">
              {" "}
              <Link to={"/updateProfile"}>
                <button
                  role="button"
                  id="edit_profile"
                  className="btn btn-primary btn-block editButton "
                >
                  {" "}
                  <p className="text">Edit Profile</p>
                </button>
              </Link>
            </div>
          </div>

          <div className="col-12 col-md-5 myProfileRightDiv flex flex-col gap-2">
            <h4>Full Name</h4>
            <p>{user.name}</p>

            <h4>Email Address</h4>
            <p>{user.email}</p>
            <h4>Joined</h4>
            <p>{date}</p>

            <button
              role="button"
              className="changePasswordButton btn btn-primary btn-block mt-3"
            >
              <p className="text">Change Password</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
