//Store.js

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

//appointment Slice

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

//appointment action
import axios from "axios";
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
//Appointment jsx page
function Appointmendivetails() {
    const { appointment, loading, error } = useSelector(
      (state) => state.appointmentState
    );
    const { id } = useParams();
    const dispatch = useDispatch();
    console.log(appointment);
    useEffect(() => {
     
  
      dispatch(getAppointment(id));
    }, []);