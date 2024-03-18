import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
  products: [],
  brandProducts: [],
  lastProductBrand: null,
  productObj: null,
  similarProducts: [],
  lastProduct: null,
};
export default (state = initialState, action) => {
  //    logfunction("STATE LOG ====", action)
  switch (action.type) {
    case "GET_ALL_SINGLE_CATEGORY_PRODUCTS":
      return {
        ...state,
        products: [...state.products, ...action.payload.productsArray],
        lastProduct: action.payload.lastProduct,
      };
    case "GET_ALL_SINGLE_BRAND_PRODUCTS":
      return {
        ...state,
        brandProducts: [
          ...state.brandProducts,
          ...action.payload.productsArray,
        ],
        lastProductBrand: action.payload.lastProduct,
      };
    case "CLEAR_ALL_BRAND_PRODUCTS":
      return {
        ...state,
        brandProducts: [],
        lastProductBrand: null,
      };
    case "CLEAR_ALL_PRODUCTS":
      return {
        ...state,
        products: [],
        lastProduct: null,
      };
    case "CLEAR_SINGLE_PRODUCT":
      return {
        ...state,
        productObj: null,
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
