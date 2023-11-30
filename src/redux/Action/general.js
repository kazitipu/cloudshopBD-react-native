import { types } from "./actionTypes";
import AsyncStorage from "@react-native-community/async-storage";
import {
  getAllTopCategories,
  getAllBanners,
  getAllHomeScreenCategories,
  getAllHomeScreenProducts,
  getAllLatestProducts,
  getSingleCategoryProducts,
  getAllCategories,
  getSingleProduct,
  addToCart,
  removeFromCart,
  updateUserAddress,
  updateShippingAddress,
} from "../../firebase/firebase.utils";
export function requestInit(user) {
  return {
    type: types.REQUEST_INIT,
    payload: {
      userAuth: user != null ? 1 : 0,
    },
  };
}

export function successInt(navigateScreen) {
  return {
    type: types.SUCCESS_INIT,
    payload: {
      navigateScreen,
    },
  };
}

export function addToWishList(data) {
  return {
    type: types.ADD_TO_WISHLIST,
    payload: {
      data,
    },
  };
}

export function successWishlist(data) {
  return {
    type: types.SUCCESS_WISHLIST,
    payload: {
      wishlistData: data,
    },
  };
}

export function decrementQuantity(id) {
  return {
    type: types.DEREMENT_QUANTITY,
    payload: {
      id,
    },
  };
}

export function incrementQuantity(id) {
  return {
    type: types.INCREMENT_QUANTITY,
    payload: {
      id,
    },
  };
}

export function proceedCheckout() {
  return {
    type: types.PROCEED_CHECKOUT,
    payload: {},
  };
}

export function successCheckout() {
  return {
    type: types.SUCCESS_CHECKOUT,
    payload: {},
  };
}

export function authStatus(status) {
  return {
    type: types.AUTH_STATUS,
    payload: {
      status: status,
    },
  };
}

export function doLogin(data) {
  return {
    type: types.DO_LOGIN,
    payload: {
      data,
    },
  };
}

export function doLogout() {
  return {
    type: types.DO_LOGOUT,
    payload: {},
  };
}
export function setCurrentUserRedux(user) {
  return {
    type: "SET_CURRENT_USER",
    payload: user,
  };
}
export function setAdditionalDataRedux(data) {
  return {
    type: "SET_ADDITIONAL_DATA",
    payload: data,
  };
}

export const getAllTopCategoriesRedux = () => async (dispatch) => {
  const allCats = await getAllTopCategories();
  dispatch({
    type: "GET_ALL_TOP_CATEGORIES",
    payload: allCats,
  });
};
export const addToCartRedux = (cartObj, currentUser) => async (dispatch) => {
  const cartData = await addToCart(cartObj, currentUser);
  dispatch({
    type: "ADD_TO_CART",
    payload: cartData,
  });
};
export const removeFromCartRedux = (item, currentUser) => async (dispatch) => {
  const cartData = await removeFromCart(item, currentUser);
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: cartData,
  });
};
export const setReduxCart = (cartData) => async (dispatch) => {
  dispatch({
    type: "SET_REDUX_CART",
    payload: cartData,
  });
};
export const updateUserAddressRedux =
  (currentUser, address) => async (dispatch) => {
    const updatedUser = await updateUserAddress(currentUser, address);
    dispatch({
      type: "UPDATE_ADDRESSBOOK",
      payload: updatedUser,
    });
  };
export const updateShippingAddressRedux =
  (currentUser, address) => async (dispatch) => {
    const updatedUser = await updateShippingAddress(currentUser, address);
    dispatch({
      type: "UPDATE_ADDRESSBOOK",
      payload: updatedUser,
    });
  };
export const incrementQuantityRedux = (item) => async (dispatch) => {
  dispatch({
    type: "INCREMENT_QUANTITY",
    payload: item,
  });
};
export const decrementQuantityRedux = (item) => async (dispatch) => {
  dispatch({
    type: "DECREMENT_QUANTITY",
    payload: item,
  });
};
export const setFreeShippingRedux = (value) => async (dispatch) => {
  dispatch({
    type: "SET_FREE_SHIPPING",
    payload: value,
  });
};

export const getAllBannersRedux = () => async (dispatch) => {
  const allBanners = await getAllBanners();
  dispatch({
    type: "GET_ALL_BANNERS",
    payload: allBanners,
  });
};

export const getAllCategoriesRedux = () => async (dispatch) => {
  const allCats = await getAllCategories();
  dispatch({
    type: "GET_ALL_CATEGORIES",
    payload: allCats,
  });
};

export const getAllHomeScreenCategoriesRedux = () => async (dispatch) => {
  const allCats = await getAllHomeScreenCategories();
  dispatch({
    type: "GET_ALL_HOMESCREEN_CATEGORIES",
    payload: allCats,
  });
};

export const getAllHomeScreenProductsRedux =
  (categoryId) => async (dispatch) => {
    const allProducts = await getAllHomeScreenProducts(categoryId);
    dispatch({
      type: "GET_ALL_HOMESCREEN_PRODUCTS",
      payload: { categoryId: categoryId, products: allProducts },
    });
  };
export const getAllLatestProductsRedux = () => async (dispatch) => {
  const allProducts = await getAllLatestProducts();
  dispatch({
    type: "GET_ALL_LATEST_PRODUCTS",
    payload: allProducts,
  });
};
export const getSingleCategoryProductsRedux =
  (categories) => async (dispatch) => {
    const allProducts = await getSingleCategoryProducts(categories);
    dispatch({
      type: "GET_ALL_SINGLE_CATEGORY_PRODUCTS",
      payload: allProducts,
    });
  };
export const getSimilarCategoryProductsRedux =
  (categories) => async (dispatch) => {
    const allProducts = await getSingleCategoryProducts(categories);
    dispatch({
      type: "GET_ALL_SIMILAR_CATEGORY_PRODUCTS",
      payload: allProducts,
    });
  };
export const getSingleProductRedux = (id) => async (dispatch) => {
  const product = await getSingleProduct(id);
  dispatch({
    type: "GET_SINGLE_PRODUCT",
    payload: product,
  });
};
