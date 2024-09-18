import axios from "axios";

import {
  appointmentsFail,
  appointmentsRequest,
  appointmentsSucess,
} from "../slices/appointmentsSlice";

import {
  appointmentFail,
  appointmentRequest,
  appointmentSucess,
} from "../slices/appointmentSlice";

export const getAppointment = (id) => async (dispatch) => {
  try {
    dispatch(appointmentRequest());
    console.log(id);
    const { data } = await axios.get(`/api/appointment/${id}`);
    dispatch(appointmentSucess(data));
  } catch (error) {
    //handle error
    dispatch(appointmentFail(error.response.data.message));
  }
};

export const getAppointments = () => async (dispatch) => {
  try {
    dispatch(appointmentsRequest());

    const { data } = await axios.get("/api/appointments");
    dispatch(appointmentsSucess(data));
  } catch (error) {
    //handle error
    dispatch(appointmentsFail(error.response.data.message));
  }
};
