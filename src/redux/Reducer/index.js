import { combineReducers } from "redux";
import Cart from "./Cart";
import MainScreenReducer from "./MainScreenReducer";
import Auth from "./Auth";
import Wishlist from "./Wishlist";
import ProductList from "./productList";
const Reducers = combineReducers({
  mainScreenInit: MainScreenReducer,
  cart: Cart,
  auth: Auth,
  wishlist: Wishlist,
  products: ProductList,
});

export default Reducers;
