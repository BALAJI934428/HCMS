import React, { Fragment } from "react";
import Navbar from "../components/layouts/Navbar";

function NewAppointment() {
  return (
    <Fragment>
      <Navbar />
      <div className="newAppointmentbody ">
        <div className="parent">
          <div className=" newAppointmentContainer  btn-gradient-1 flex justify-center   ">
            <form
              className="shadow-lg formcontainer  "
              encType="multipart/form-data"
            >
              <p className="text-center mb-4 headline3 headline--text-stroke3 ">
                New Appointment
              </p>

              <div className="gridcontainer grid grid-flow-row">
                {" "}
                <div className="form-group">
                  <label htmlFor="name_field">
                    <p className="text-1">Name1</p>
                  </label>
                  <input type="text" id="name_field" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="name_field">
                    <p className="text-1">Name1</p>
                  </label>
                  <input type="text" id="name_field" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="name_field">
                    <p className="text-1">Name1</p>
                  </label>
                  <input type="text" id="name_field" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="name_field">
                    <p className="text-1">Name1</p>
                  </label>
                  <input type="text" id="name_field" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="name_field">
                    <p className="text-1">Name1</p>
                  </label>
                  <input type="text" id="name_field" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="name_field">
                    <p className="text-1">Name1</p>
                  </label>
                  <input type="text" id="name_field" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="name_field">
                    <p className="text-1">Name1</p>
                  </label>
                  <input type="text" id="name_field" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="name_field">
                    <p className="text-1">Name1</p>
                  </label>
                  <input type="text" id="name_field" className="form-control" />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  role="button"
                  id="login_button"
                  type="submit"
                  className=" createButton "
                >
                  <p className="text">CREATE</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NewAppointment;
