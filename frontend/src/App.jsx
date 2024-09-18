import React, { useEffect } from "react";
import ProtectedRoute from "./components/route/ProtectedRoute";
import "./App.css";
import BookedAppointments from "./pages/BookedAppointments";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointmentDetails from "./pages/AppointmentDetails";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import store from "./store";
import { loadUser } from "./actions/userActions";
import MyProfile from "./pages/MyProfile";
import UpdateProfile from "./pages/updateProfile";
import NewAppointment from "./pages/NewAppointment";
function App() {
  useEffect(() => {
    store.dispatch(loadUser);
  });
  return (
    <Router>
      <div className="">
        <HelmetProvider>
          <ToastContainer theme="colored" />
          <Routes>
            <Route path="/" element={<BookedAppointments />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/myprofile"
              element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              }
            />
            <Route path="/updateProfile" element={<UpdateProfile />} />

            <Route
              path="/appointmentDetails/:id"
              element={<AppointmentDetails />}
            />
            <Route path="/newAppointment" element={<NewAppointment />} />
          </Routes>
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
