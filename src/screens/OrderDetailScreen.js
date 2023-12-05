import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { Input, Button } from "native-base";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  OtirxBackButton,
} from "@component";
import CartView from "../component/OrderDetailComponent/CartView";
import OrderTrackingModalResult from "../component/OrderDetailComponent/orderTrackingModalResult";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import { removeFromCart, decrementQuantity, incrementQuantity } from "@actions";
import ProductListDummy from "@component/items/ProductListDummy";
import Icon from "react-native-vector-icons/Ionicons";
import Fonts from "@helpers/Fonts";
import GradientButton from "../component/CartComponent/Button";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicon from "react-native-vector-icons/Ionicons";
import Delivery from "./delivery.png";
import CashOnDelivery from "./cashonDelivery.png";
import { setTotalRedux } from "../redux/Action";
function CheckoutScreen(props) {
  const [state, setState] = React.useState({
    loading: true,
    cartArr: [],
    cartProducts: [],
    sumAmount: 0,
    actualOrder: 0,
    isApplied: false,
    validCode: false,
    couponCode: null,
    noRecord: false,
  });
  const { order } = props.route.params;

  const onDeleteItem = (id) => {
    props.removeFromCart(id);
  };

  const decrement = (id) => {
    props.decrementQuantity(id);
  };

  const increment = (id) => {
    props.incrementQuantity(id);
  };

  const calculateCart = () => {
    let cartProducts = order.orders;
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

  useEffect(() => {
    calculateCart();
  }, []);

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

  const {
    cartProducts,
    sumAmount,
    couponCode,
    loading,
    isApplied,
    validCode,
    noRecord,
    actualOrder,
  } = state;

  console.log(order);
  return (
    <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>
      {/* Header */}
      <OtrixHeader
        customStyles={{
          backgroundColor: Colors.light_white,
          height: Platform.OS === "ios" ? wp("13%") : wp("10%"),
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
            Order Details
          </Text>
        </View>
      </OtrixHeader>

      {/* Content Start from here */}
      <OtrixContent
        customStyles={{
          marginHorizontal: wp("2%"),
        }}
      >
        <View style={{ ...styles.box, marginBottom: 10 }}>
          <OrderTrackingModalResult order={order} />
        </View>
        {/* Cart Component Start from here */}
        <View style={styles.box}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#ffe6ec",
              padding: 10,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <Entypo
              name={"location"}
              color={"#ec345b"}
              style={{ fontSize: wp("4.5%") }}
            />
            <Text
              style={{
                fontWeight: "bold",
                color: "#ec345b",
                fontSize: wp("3.3%"),
              }}
            >
              {"   "}
              Delivery Address
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              marginTop: 10,
              paddingBottom: 10,
            }}
          >
            <View style={{ flex: 0.2 }}>
              <Image
                source={Delivery}
                style={{ height: 40, width: "100%" }}
                resizeMode="contain"
              />
              <View
                style={{
                  backgroundColor:
                    order.currentUser.address.find(
                      (address) => address.defaultShipping
                    ).addressType == "Home"
                      ? "green"
                      : order.currentUser.address.find(
                          (address) => address.defaultShipping
                        ).addressType == "Office"
                      ? "blue"
                      : "darkorange",
                  padding: 5,
                  paddingTop: 2,
                  paddingBottom: 2,
                  alignSelf: "center",

                  fontSize: wp("3%"),
                  borderRadius: 3,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: wp("2.5%"),
                    color: "white",
                  }}
                >
                  {
                    order.currentUser.address.find(
                      (address) => address.defaultShipping
                    ).addressType
                  }
                </Text>
              </View>
            </View>
            <View style={{ flex: 0.6 }}>
              <Text style={styles.text}>
                {
                  order.currentUser.address.find(
                    (address) => address.defaultShipping
                  ).fullName
                }
              </Text>
              <Text style={styles.text}>
                {
                  order.currentUser.address.find(
                    (address) => address.defaultShipping
                  ).mobileNo
                }
              </Text>
              <Text style={styles.text}>
                {
                  order.currentUser.address.find(
                    (address) => address.defaultShipping
                  ).address
                }
              </Text>
              <Text style={styles.text}>
                {
                  order.currentUser.address.find(
                    (address) => address.defaultShipping
                  ).district
                }
                ,
                {
                  order.currentUser.address.find(
                    (address) => address.defaultShipping
                  ).division
                }
              </Text>
            </View>
            {order.orderStatusScore < 3 && (
              <View style={{ flex: 0.2, paddingRight: 15 }}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("ManageAddressScreen");
                  }}
                >
                  <View
                    style={{
                      padding: 5,
                      paddingLeft: 10,
                      paddingRight: 10,
                      backgroundColor: "#fff0f4",
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        color: "#ff8084",

                        fontSize: wp("3%"),
                      }}
                    >
                      Change
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <CartView
          navigation={props.navigation}
          products={order.orders}
          deleteItem={onDeleteItem}
          decrementItem={decrement}
          incrementItem={increment}
          sumAmount={sumAmount}
          actualOrder={actualOrder}
          order={order}
        />
      </OtrixContent>
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
  };
}

export default connect(mapStateToProps, {
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  setTotalRedux,
})(CheckoutScreen);

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
  text: {
    color: "#777",
    fontSize: wp("3.3%"),
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
  box: {
    backgroundColor: Colors.white,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    borderRadius: wp("3%"),
    margin: 4,
  },
});
