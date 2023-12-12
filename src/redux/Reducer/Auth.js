import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
  authStatus: false,
  currentUser: null,
  additionalData: {},
  spinner: false,
};
export default (state = initialState, action) => {
  const { payload } = action;
  logfunction("PAYLOAD IN REDUCER AUTH", payload);
  switch (action.type) {
    case types.AUTH_STATUS:
      return {
        ...state,
        authStatus: payload.status,
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        currentUser: payload,
      };
    case "SAVE_DEVICE_TOKEN":
      return { ...state, currentUser: action.payload };
    case "UPDATE_ADDRESSBOOK":
      return {
        ...state,
        currentUser: payload,
      };
    case "SET_ADDITIONAL_DATA":
      return {
        ...state,
        additionalData: payload,
      };
    case "SET_SPINNER":
      return {
        ...state,
        spinner: payload,
      };
    default:
      return state;
  }
};
