import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import { clearAuthError } from "../actions/userActions";
import { clearUpdateProfile } from "../slices/authSlice";
import { updateProfile } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/layouts/Loader";
import { toast } from "react-toastify";
function UpdateProfile() {
  const { loading, user, isUpdated, error } = useSelector(
    (state) => state.authState
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png"
  );
  const dispatch = useDispatch();
  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (isUpdated) {
      toast("Profile updated successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearUpdateProfile()),
      });
      return;
    }
    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
    }
  }, [user, isUpdated, error, dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {" "}
          <div>
            <Navbar />
            <div className="updateProfileBody  flex justify-center">
              <div className="parent">
                <div className="updateProfilecontainer btn-gradient-1  ">
                  <form
                    onSubmit={submitHandler}
                    className="shadow-lg"
                    encType="multipart/form-data"
                  >
                    <div className="flex justify-center">
                      {" "}
                      <h1 className="mt-2 mb-5 updateProfilehead headline3 headline--text-stroke3 ">
                        Update Profile
                      </h1>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email_field ">
                        <p className="text-1">Name</p>
                      </label>
                      <input
                        type="name"
                        id="name_field"
                        className="form-control"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email_field ">
                        {" "}
                        <p className="text-1">Email</p>
                      </label>
                      <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="avatar_upload ">
                        {" "}
                        <p className="text-1">Avatar</p>
                      </label>
                      <div className="d-flex align-items-center">
                        <div>
                          <figure className="avatar mr-3 item-rtl">
                            <img
                              src={avatarPreview}
                              className="rounded-circle "
                              alt="Avatar Preview"
                            />
                          </figure>
                        </div>
                        <div className="custom-file">
                          <input
                            type="file"
                            name="avatar"
                            className="custom-file-input"
                            id="customFile"
                            onChange={onChangeAvatar}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            Choose Avatar
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      {" "}
                      <button
                        type="submit"
                        role="button"
                        className="btn update-btn btn-block mt-4 mb-3 myProfileUpdateButton"
                      >
                        <p>Update</p>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdateProfile;
