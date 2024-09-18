import React, { Fragment, useEffect } from "react";
import MetaData from "../components/layouts/MetaData";
import { getAppointments } from "../actions/appointmentActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/layouts/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
export default function BookedAppointments() {
  const dispatch = useDispatch();

  const { appointments, loading, error } = useSelector(
    (state) => state.appointmentsState
  );

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
      });
    }

    dispatch(getAppointments());
  }, [error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={"Booked Appointments"} />
          <Navbar />

          <div className="container userCardContainer border grid grid-flow-row ">
            {appointments &&
              appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className=" rounded-lg  userAppointmentDiv p-1  usercards  flex flex-col  justify-between"
                >
                  <div className="flex justify-center">
                    {" "}
                    <table className=" table-auto">
                      <thead>
                        <tr>
                          <th
                            colSpan={2}
                            className="headline1 headline--text-stroke1   text-center  font-extrabold"
                          >
                            Appointments
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-lg flex flex-col BAtbody ">
                        <tr className="flex">
                          <td>Name:</td>
                          <td>{appointment.name}</td>
                        </tr>
                        <tr className="flex">
                          <td>Date:</td>
                          <td>{appointment.date}</td>
                        </tr>
                        <tr className="flex">
                          <td>Hospital: </td>
                          <td>{appointment.hospital}</td>
                        </tr>
                        <tr className="flex">
                          <td>Doctor:</td>
                          <td>{appointment.doctor}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-center ">
                    <Link to={`/appointmentDetails/${appointment._id}`}>
                      {" "}
                      <button className="userDetailButton " role="button">
                        <p className="text">Details</p>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </Fragment>
  );
}
