import React, { Fragment, useEffect } from "react";
import assets from "../assets/assests";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAppointment } from "../actions/appointmentActions";
import Loader from "../components/layouts/Loader";
import Navbar from "../components/layouts/Navbar";
function Appointmendivetails() {
  const { appointment, loading, error } = useSelector(
    (state) => state.appointmentState
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(appointment);
  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
      });
    }

    dispatch(getAppointment(id));
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Navbar />
          <div className="userAD">
            <div className="ADQRcontainer">
              {" "}
              <div className="ADQR">
                <p className="ADQRP">Scan me to get Appointment Details</p>
                <div className="userAD-img">
                  <img className="qrimg" src={assets.qr} alt="" />
                </div>
              </div>
            </div>

            <div className="userADcontainer">
              <div className=" userADdiv div-auto">
                <div className="userADdivcontainer">
                  <div className="coloruserADhead">
                    <div colSpan={2} className="text-center userADhead ">
                      <h1 class="headline headline--text-stroke">
                        Appointment Details
                      </h1>
                    </div>
                  </div>

                  <div className="userAdbodycontainer">
                    <div className="userADbody ">
                      <div className="ADQRcontainer1">
                        <div className="imgP">
                          {" "}
                          <p className="ADQRP1">
                            Scan me to get Appointment Details
                          </p>
                        </div>
                        <div className="userAD-img1">
                          <img className="qrimg1" src={assets.qr} alt="" />
                        </div>
                      </div>

                      <div className="tr">
                        <div>Id:</div>
                        <div>{appointment.id}</div>
                      </div>

                      <div className="tr">
                        <div>Name:</div>
                        <div>{appointment.name}</div>
                      </div>

                      <div className="tr">
                        <div>Date:</div>
                        <div>{appointment.date}</div>
                      </div>
                      <div className="tr">
                        <div>Time Slot:</div>
                        <div>{appointment.timeSlot}</div>
                      </div>
                      <div className="tr">
                        <div>Hospital: </div>
                        <div>{appointment.hospital}</div>
                      </div>
                      <div className="tr">
                        <div>Doctor:</div>
                        <div>{appointment.doctor}</div>
                      </div>

                      <div className="tr">
                        <div>Status:</div>
                        <div>{appointment.status}</div>
                      </div>
                      <div className="tr">
                        <div>Payment:</div>
                        <div>Success</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ADuserButtondiv ">
                <button className="button ADbutton" role="button">
                  <span className="text">Change Slot</span>
                </button>
                <button className="Cbutton" role="button">
                  <span className="text">Cancel Appointment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Appointmendivetails;
