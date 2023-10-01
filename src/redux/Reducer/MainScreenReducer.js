import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
  loadApplication: false,
  navScreen: "",
  allTopCategories: [],
  banners: [],
};
export default (state = initialState, action) => {
  //    logfunction("STATE LOG ====", action)
  switch (action.type) {
    case types.REQUEST_INIT:
      return {
        ...state,
        loadApplication: false,
      };
    case types.SUCCESS_INIT:
      return {
        ...state,
        loadApplication: true,
        navScreen: action.payload.navigateScreen,
      };
    case "GET_ALL_TOP_CATEGORIES":
      return {
        ...state,
        allTopCategories: action.payload,
      };
    case "GET_ALL_BANNERS":
      return {
        ...state,
        banners: action.payload,
      };
    default:
      return state;
  }
};
