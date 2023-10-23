import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
  products: [],
  productObj: null,
  similarProducts: [],
};
export default (state = initialState, action) => {
  //    logfunction("STATE LOG ====", action)
  switch (action.type) {
    case "GET_ALL_SINGLE_CATEGORY_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "GET_ALL_SIMILAR_CATEGORY_PRODUCTS":
      return {
        ...state,
        similarProducts: action.payload,
      };
    case "GET_SINGLE_PRODUCT":
      return {
        ...state,
        productObj: action.payload,
      };

    default:
      return state;
  }
};
