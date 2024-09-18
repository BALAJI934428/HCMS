import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    loading: false,
    appointment: {},
  },
  reducers: {
    appointmentRequest(state, action) {
      return {
        loading: true,
      };
    },
    appointmentSucess(state, action) {
      return {
        loading: false,
        appointment: action.payload.appointment,
      };
    },
    appointmentFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
const { actions, reducer } = appointmentSlice;
export const { appointmentRequest, appointmentSucess, appointmentFail } =
  actions;
export default reducer;
