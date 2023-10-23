import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
  loadApplication: false,
  navScreen: "",
  allTopCategories: [],
  banners: [],
  homeCategories: [],
  homeProducts: [],
  latestProducts: [],
  categories: [],
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
    case "GET_ALL_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "GET_ALL_HOMESCREEN_CATEGORIES":
      return {
        ...state,
        homeCategories: action.payload,
      };
    case "GET_ALL_LATEST_PRODUCTS":
      return {
        ...state,
        latestProducts: action.payload,
      };
    case "GET_ALL_HOMESCREEN_PRODUCTS":
      return {
        ...state,
        homeProducts: [...state.homeProducts, action.payload],
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
