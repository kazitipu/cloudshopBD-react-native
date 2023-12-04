import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
  cartData: [],
  orders: [],
  freeShipping: 0,
  total: 0,
  coupon: null,
};
export default (state = initialState, action) => {
  const { payload } = action;
  logfunction("PAYLOAD IN REDUCER ", payload);
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartData: payload,
      };
    case "ADD_TO_ORDER":
      return {
        ...state,
        orders: payload,
        cartData: [],
      };
    case "GET_ALL_ORDERS":
      return {
        ...state,
        orders: payload,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartData: payload,
      };
    case "SET_REDUX_CART":
      return {
        ...state,
        cartData: payload,
      };
    case "SET_TOTAL_REDUX":
      return {
        ...state,
        total: payload,
      };
    case "SET_COUPON_REDUX":
      return {
        ...state,
        coupon: payload,
      };
    case "SET_FREE_SHIPPING":
      return {
        ...state,
        freeShipping: payload,
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cartData: state.cartData.map((cartItem) => {
          console.log(payload);
          console.log(payload.selectedVariation);

          console.log(payload.selectedVariation.id);
          if (payload.selectedVariation && payload.selectedVariation.id) {
            if (cartItem.selectedVariation) {
              if (
                cartItem.selectedVariation.id === payload.selectedVariation.id
              ) {
                console.log(cartItem);
                console.log(payload);
                return {
                  ...cartItem,
                  quantity: parseInt(cartItem.quantity) + 1,
                };
              } else {
                return cartItem;
              }
            } else {
              return cartItem;
            }
          } else {
            if (cartItem.productId == payload.productId) {
              return { ...cartItem, quantity: parseInt(cartItem.quantity) + 1 };
            } else {
              return cartItem;
            }
          }
        }),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cartData: state.cartData.map((cartItem) => {
          if (payload.selectedVariation && payload.selectedVariation.id) {
            if (
              cartItem.selectedVariation &&
              cartItem.selectedVariation.id == payload.selectedVariation.id
            ) {
              return {
                ...cartItem,
                quantity:
                  cartItem.quantity > 1 ? parseInt(cartItem.quantity) - 1 : 1,
              };
            } else {
              return cartItem;
            }
          } else {
            if (cartItem.productId == payload.productId) {
              return {
                ...cartItem,
                quantity:
                  cartItem.quantity > 1 ? parseInt(cartItem.quantity) - 1 : 1,
              };
            } else {
              return cartItem;
            }
          }
        }),
      };
    default:
      return state;
  }
};
