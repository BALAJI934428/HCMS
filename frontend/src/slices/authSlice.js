import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
  },
  reducers: {
    loginRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    loginSucess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    registerRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    registerSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    registerFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    loadUserRequest(state, action) {
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    },
    loadUserSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loadUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    logoutSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: false,
      };
    },
    logoutFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    updateProfileRequest(state, action) {
      return {
        ...state,
        loading: true,
        isUpdated: false,
      };
    },
    updateProfileSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        isUpdated: true,
      };
    },
    updateProfileFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearUpdateProfile(state, action) {
      return {
        ...state,
        isUpdated: false,
      };
    },
  },
});
const { actions, reducer } = authSlice;
export const {
  loginRequest,
  loginSucess,
  loginFail,
  clearError,
  registerRequest,
  registerSuccess,
  registerFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  clearUpdateProfile,
} = actions;
export default reducer;
