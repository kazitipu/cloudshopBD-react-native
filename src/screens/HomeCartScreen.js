import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { Input, Button } from "native-base";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  CartView,
  OtirxBackButton,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import {
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  setTotalRedux,
  setSpinnerRedux,
} from "@actions";
import ProductListDummy from "@component/items/ProductListDummy";
import Icon from "react-native-vector-icons/Ionicons";
import Fonts from "@helpers/Fonts";
import GradientButton from "../component/CartComponent/Button";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { updateCart } from "../firebase/firebase.utils";
function CartScreen(props) {
  const [state, setState] = React.useState({
    loading: true,
    cartArr: [],
    cartProducts: [],
    sumAmount: 0,
    actualOrder: 0,
    isApplied: false,
    validCode: false,
    couponCode: null,
  });

  const applyCouponCode = () => {
    const { couponCode } = state;
    if (couponCode != null) {
      if (couponCode == "otrixweb") {
        setState({ ...state, isApplied: true, validCode: true });
      } else {
        setState({ ...state, isApplied: true, validCode: false });
      }
    } else {
      setState({ ...state, isApplied: true, validCode: false });
    }
  };

  const onDeleteItem = async (id) => {
    props.setSpinnerRedux(true);
    props.removeFromCart(id);
    props.setSpinnerRedux(false);
  };

  const decrement = (id) => {
    props.decrementQuantity(id);
  };

  const increment = (id) => {
    props.incrementQuantity(id);
  };

  const calculateCart = () => {
    let cartProducts = props.cartData;
    let sumAmount = 0;
    let actualOrder = 0;

    //find and create array
    cartProducts &&
      cartProducts.length > 0 &&
      cartProducts.forEach(function (item, index) {
        let price = getPrice2(item);
        let actualPrice = getPrice3(item);
        sumAmount += parseInt(price) * item.quantity;
        actualOrder += parseInt(actualPrice) * item.quantity;
      });

    setState({
      ...state,
      loading: false,
      cartProducts: cartProducts,
      sumAmount: sumAmount,
      actualOrder: actualOrder,
    });
    props.setTotalRedux(sumAmount);
  };

  const getPrice2 = (product) => {
    if (product.selectedVariation.id) {
      if (product.selectedVariation.salePrice == 0) {
        return product.selectedVariation.price;
      } else {
        return product.selectedVariation.salePrice;
      }
    } else {
      if (product.product) {
        if (product.product.salePrice == 0) {
          return product.product.price;
        } else {
          return product.product.salePrice;
        }
      } else {
        return 0;
      }
    }
  };
  const getPrice3 = (product) => {
    if (product.selectedVariation.id) {
      return product.selectedVariation.price;
    } else {
      if (product.product) {
        return product.product.price;
      } else {
        return 0;
      }
    }
  };

  useEffect(() => {
    calculateCart();
  }, [props.cartData]);

  const { cartProducts, sumAmount, couponCode, loading, isApplied, validCode } =
    state;
  return (
    <OtrixContainer
      customStyles={{ backgroundColor: Colors.light_white }}
      statusBarColor={Colors.light_white}
    >
      {/* Header */}
      <OtrixHeader
        customStyles={{
          backgroundColor: Colors.light_white,
          height: Platform.OS === "ios" ? wp("13%") : wp("13%"),
        }}
      >
        <TouchableOpacity
          style={{ ...GlobalStyles.headerLeft }}
          onPress={() => props.navigation.goBack()}
        >
          <OtirxBackButton />
        </TouchableOpacity>
        <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
          <Text style={{ ...GlobalStyles.headingTxt, fontSize: wp("4.5%") }}>
            {" "}
            Shopping Cart
          </Text>
        </View>
      </OtrixHeader>

      {/* Content Start from here */}
      <OtrixContent
        customStyles={{
          marginHorizontal: wp("2%"),
          marginBottom: Platform.OS == "ios" ? hp("5%") : hp("10%"),
        }}
      >
        {/* Cart Component Start from here */}
        {!loading && props.cartData.length > 0 && (
          <CartView
            navigation={props.navigation}
            products={props.cartData}
            deleteItem={onDeleteItem}
            decrementItem={decrement}
            incrementItem={increment}
            sumAmount={sumAmount}
            actualOrder={state.actualOrder}
          />
        )}
        {props.cartData.length == 0 && (
          <View style={styles.noRecord}>
            <Text style={styles.emptyTxt}>Cart is empty!</Text>
            <Button
              size="lg"
              variant="solid"
              bg={Colors.themeColor}
              style={[
                GlobalStyles.button,
                {
                  marginHorizontal: wp("2%"),
                  marginBottom: hp("2.5%"),
                  marginTop: hp("1%"),
                },
              ]}
              onPress={() => props.navigation.navigate("HomeScreen")}
            >
              <Text style={GlobalStyles.buttonText}>
                <Icon
                  name={"md-cart-sharp"}
                  color={Colors.white}
                  style={{ fontSize: wp("4.5%") }}
                />{" "}
                Shop Now
              </Text>
            </Button>
          </View>
        )}
      </OtrixContent>

      {props.cartData.length > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: Platform.OS === "ios" ? -20 : 0,
            padding: 10,
            backgroundColor: Colors.light_white,
            display: "flex",
            flexDirection: "row",
            minWidth: "100%",
          }}
        >
          <GradientButton
            children={
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: wp("3.1%"),
                  }}
                >
                  Total ৳ {props.total}
                </Text>
                <View
                  style={{
                    height: "100%",
                    width: 2,
                    backgroundColor: "white",
                  }}
                ></View>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: wp("3.1%"),
                  }}
                >
                  Go to Checkout{" "}
                  <Text style={{ marginTop: -5 }}>
                    <FontAwesomeIcon name={"arrow-right"} />
                  </Text>
                </Text>
              </View>
            }
            onPress={async () => {
              props.setSpinnerRedux(true);
              await updateCart(props.cartData, props.currentUser);
              props.setSpinnerRedux(false);
              props.navigation.navigate("CheckoutScreen", {
                sumAmount,
                actualOrder: state.actualOrder,
              });
            }}
          />
        </View>
      )}
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
    currentUser: state.auth.currentUser,
    total: state.cart.total,
  };
}

export default connect(mapStateToProps, {
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  setTotalRedux,
  setSpinnerRedux,
})(CartScreen);

const styles = StyleSheet.create({
  checkoutView: {
    backgroundColor: Colors.light_white,
    height: hp("5%"),
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    borderTopLeftRadius: wp("2%"),
    borderTopRightRadius: wp("2%"),
  },
  couponInput: {
    marginHorizontal: wp("5%"),
    marginVertical: hp("1.5%"),
  },
  inputStyle: {
    borderColor: Colors.black,
    backgroundColor: Colors.light_white,
  },
  applyTxt: {
    color: Colors.link_color,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("4%"),
  },
  applyView: {
    marginHorizontal: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  totalView: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: wp("6%"),
  },
  leftTxt: {
    color: Colors.secondry_text_color,
    fontFamily: Fonts.Font_Bold,
    flex: 0.5,
    fontSize: wp("3.8%"),
    textAlign: "left",
  },
  rightTxt: {
    color: Colors.text_color,
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("4.5%"),
    flex: 0.5,
    textAlign: "right",
  },
  noRecord: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: hp("25%"),
  },
  emptyTxt: {
    fontSize: wp("6%"),
    marginVertical: hp("1.5%"),
    fontFamily: Fonts.Font_Semibold,
    color: Colors.secondry_text_color,
  },
});
