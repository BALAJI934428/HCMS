import { createSlice } from "@reduxjs/toolkit";

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    loading: false,
  },
  reducers: {
    appointmentsRequest(state, action) {
      return {
        loading: true,
      };
    },
    appointmentsSucess(state, action) {
      return {
        loading: false,
        appointments: action.payload.appointments,
      };
    },
    appointmentsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
const { actions, reducer } = appointmentsSlice;
export const { appointmentsRequest, appointmentsSucess, appointmentsFail } =
  actions;
export default reducer;
