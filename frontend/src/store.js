import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appointmentsReducer from "./slices/appointmentsSlice";
import appointmentReducer from "./slices/appointmentSlice";
import { thunk } from "redux-thunk";
import authReducer from "./slices/authSlice";
const reducer = combineReducers({
  appointmentsState: appointmentsReducer,
  appointmentState: appointmentReducer,
  authState: authReducer,
});

const store = configureStore({
  reducer,
  applyMiddleware: [thunk],
});

export default store;
