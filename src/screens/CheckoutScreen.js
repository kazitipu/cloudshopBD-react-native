import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { Button } from "native-base";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  CheckoutView,
  OtirxBackButton,
  AddAdressComponent,
  EditAddressComponent,
  PaymentSuccessComponent,
  OrderView,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicon from "react-native-vector-icons/Ionicons";
import Fonts from "@helpers/Fonts";
import DummyAddress from "@component/items/DummyAddress";
import GradientButton from "../component/CartComponent/Button";
import Delivery from "./delivery.png";
import CashOnDelivery from "./cashonDelivery.png";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { addToOrderRedux, setSpinnerRedux } from "../redux/Action/general";

function CheckoutScreen(props) {
  const [state, setState] = React.useState({
    loading: true,
    cartArr: [],
    showAdd: false,
    cartProducts: [],
    sumAmount: 0,
    noRecord: false,
    addresses: DummyAddress,
    selctedAddress: DummyAddress[0].id,
    showEdit: false,
    editAddressData: [],
    step: 1,
    selectedPaymentMethod: 4,
    paymentSuccessModal: false,
  });

  const storeAddress = (addressData) => {
    let newID = "" + Math.floor(Math.random() * 10000) + 1;
    let newObj = {
      id: "" + newID,
      name: addressData.name,
      country: addressData.country,
      city: addressData.city,
      postcode: addressData.postcode,
      address1: addressData.address1,
      address2: addressData.address2,
    };
    setState({
      ...state,
      addresses: [newObj, ...addresses],
      showAdd: false,
    });
  };

  const {
    cartProducts,
    loading,
    noRecord,
    showAdd,
    addresses,
    selctedAddress,
    showEdit,
    editAddressData,
    step,
    selectedPaymentMethod,
    paymentSuccessModal,
  } = state;
  const { sumAmount, actualOrder } = props.route.params;
  const { currentUser, coupon } = props;
  let shippingAddress = null;
  if (currentUser && currentUser.address && currentUser.address.length > 0) {
    shippingAddress = currentUser.address.find((addr) => addr.defaultShipping);
  }
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
            Checkout
          </Text>
        </View>
      </OtrixHeader>
      <OtrixContent>
        <View style={styles.box}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#ffe6ec",
              padding: 10,
              paddingTop: 7,
              paddingBottom: 7,
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
                fontSize: wp("4.1%"),
              }}
            >
              {"   "}
              Delivery Address
            </Text>
          </View>
          {props.currentUser &&
          props.currentUser.address &&
          props.currentUser.address.length > 0 ? (
            shippingAddress ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  marginTop: 15,
                  paddingBottom: 20,
                }}
              >
                <View
                  style={{
                    flex: 0.2,
                  }}
                >
                  <Image
                    source={Delivery}
                    style={{ height: 30, width: "100%" }}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      backgroundColor:
                        shippingAddress.addressType == "Home"
                          ? "green"
                          : shippingAddress.addressType == "Office"
                          ? "blue"
                          : "darkorange",
                      padding: 5,
                      paddingTop: 2,
                      paddingBottom: 2,
                      alignSelf: "center",
                      marginTop: 7,
                      fontSize: wp("3%"),
                      borderRadius: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: wp("2.8%"),
                        color: "white",
                      }}
                    >
                      {shippingAddress.addressType}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 0.6 }}>
                  <Text style={styles.text}>{shippingAddress.fullName}</Text>
                  <Text style={styles.text}>{shippingAddress.mobileNo}</Text>
                  <Text style={styles.text}>{shippingAddress.address}</Text>
                  <Text style={styles.text}>
                    {shippingAddress.district},{shippingAddress.division}
                  </Text>
                </View>

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
              </View>
            ) : (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  flex: 1,
                  marginTop: 15,
                  paddingBottom: 20,
                }}
              >
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
                      Choose Shipping Address
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flex: 1,
                marginTop: 15,
                paddingBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("AddAddressScreen");
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
                    + Add Shipping Address
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={40}
            onChangeText={(text) => onChangeText(text)}
            // value={}
            placeholder="Write here any additional instruction here"
            placeholderTextColor={"#555"}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "gainsboro",
              borderRadius: 10,
              width: "100%",
              backgroundColor: "white",
              height: hp("9%"),
              fontSize: wp("3.8%"),
            }}
          />
        </View>
        <OtrixDivider size={"md"} />
        <View style={styles.box}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#ffe6ec",
              padding: 10,
              paddingTop: 7,
              paddingBottom: 7,
              justifyContent: "space-between",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Ionicon
                name={"cash-outline"}
                color={"#ec345b"}
                style={{ fontSize: wp("4.5%") }}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#ec345b",
                  fontSize: wp("4.1%"),
                }}
              >
                {"   "}
                Amount To be Paid
              </Text>
            </View>
            <Text
              style={{
                fontWeight: "bold",
                color: "#ec345b",
                fontSize: wp("4.1%"),
              }}
            >
              ৳ {props.total}
            </Text>
          </View>
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 3,
                marginTop: 3,
              }}
            >
              <Text style={{ color: "#444", fontSize: wp("3.2%") }}>
                Subtotal
              </Text>
              <Text
                style={{
                  color: "#666",
                  fontWeight: "bold",
                  fontSize: wp("2.8%"),
                }}
              >
                ৳ {actualOrder}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 3,
              }}
            >
              <Text style={{ color: "#444", fontSize: wp("3.2%") }}>
                Delivery Charge
              </Text>
              <Text
                style={{
                  color: "#666",
                  fontWeight: "bold",
                  fontSize: wp("2.8%"),
                }}
              >
                +৳ {sumAmount >= props.freeShipping ? 0 : 70}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 3,
              }}
            >
              <Text style={{ color: "#444", fontSize: wp("3.2%") }}>
                Discount applied
              </Text>
              <Text
                style={{
                  color: "#666",
                  fontWeight: "bold",
                  fontSize: wp("2.8%"),
                }}
              >
                -৳ {actualOrder - sumAmount}
              </Text>
            </View>
            {coupon && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 3,
                }}
              >
                <Text style={{ color: "#444", fontSize: wp("3.2%") }}>
                  Coupon applied ({coupon.name})
                </Text>
                <Text
                  style={{
                    color: "#666",
                    fontWeight: "bold",
                    fontSize: wp("2.8%"),
                  }}
                >
                  -৳{" "}
                  {coupon.discountType == "cash"
                    ? coupon.discountAmount
                    : parseInt(sumAmount * (coupon.discountAmount / 100))}
                </Text>
              </View>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 3,
              }}
            >
              <Text style={{ color: "#444", fontSize: wp("3.2%") }}>
                Rounding off
              </Text>
              <Text
                style={{
                  color: "#666",
                  fontSize: wp("2.8%"),
                  fontWeight: "bold",
                }}
              >
                -৳ 0
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 10, padding: 10 }}>
            <Text
              style={{
                textAlign: "center",
                backgroundColor: "#eaeaff",
                color: "#0000a9",
                padding: 5,
              }}
            >
              Spend{" "}
              <Text style={{ fontWeight: "bold" }}>৳ {props.freeShipping}</Text>{" "}
              to get free home delivery.
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              paddingBottom: 10,
            }}
          >
            <View style={{ flex: 0.3 }}>
              <Image
                source={CashOnDelivery}
                style={{ height: 70, width: "100%" }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 0.7, padding: 10, paddingRight: 30 }}>
              <View
                style={{
                  backgroundColor: "#ec345b",
                  padding: 4,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 7,
                  marginTop: 14,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  CASH ON DELIVERY
                </Text>
              </View>
            </View>
          </View>
        </View>
        <OtrixDivider size={"sm"} />
        <View style={{ ...styles.box, marginBottom: 70 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#ffe6ec",
              padding: 10,
              paddingTop: 7,
              paddingBottom: 7,
              justifyContent: "space-between",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesomeIcon
                name={"list-alt"}
                color={"#ec345b"}
                style={{ fontSize: wp("4.5%") }}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#ec345b",
                  fontSize: wp("4.1%"),
                }}
              >
                {"   "}
                Order Details
              </Text>
            </View>
          </View>

          <OrderView
            navigation={props.navigation}
            products={props.cartData}
            sumAmount={sumAmount}
          />
        </View>
      </OtrixContent>

      <View
        style={{
          position: "absolute",
          bottom: -10,
          padding: 10,
          backgroundColor: Colors.light_white,
          display: "flex",
          flexDirection: "row",
          minWidth: "100%",
        }}
      ></View>
      {props.cartData.length > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: -20,
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
                  Place Order{" "}
                  <Text style={{ marginTop: -5 }}>
                    <FontAwesomeIcon name={"arrow-right"} />
                  </Text>
                </Text>
              </View>
            }
            onPress={async () => {
              props.setSpinnerRedux(true);
              let orderObj = {
                id:
                  new Date().getTime().toString() + currentUser.id.slice(0, 3),
                currentUser: currentUser,
                orders: props.cartData,
                subTotal: actualOrder,
                deliveryCharge: sumAmount >= props.freeShipping ? 0 : 70,
                discountApplied: actualOrder - sumAmount,
                couponApplied: coupon
                  ? {
                      name: coupon.name,
                      discount:
                        coupon.discountType == "cash"
                          ? coupon.discountAmount
                          : parseInt(sumAmount * (coupon.discountAmount / 100)),
                    }
                  : null,
                orderStatus: "Processing",
                date: new Date().getTime().toString(),
                orderStatusScore: 1,
                userId: currentUser.uid,
              };
              await props.addToOrderRedux(orderObj);
              props.setSpinnerRedux(false);
              setState({
                ...state,
                paymentSuccessModal: true,
              });
            }}
          />
        </View>
      )}

      {/* Payment Modal  */}
      <Modal visible={paymentSuccessModal} transparent={true}>
        <PaymentSuccessComponent
          navigation={props.navigation}
          setPaymentSuccessModal={(value) => {
            setState({
              ...state,
              paymentSuccessModal: value,
            });
          }}
        />
      </Modal>
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
    currentUser: state.auth.currentUser,
    freeShipping: state.cart.freeShipping,
    total: state.cart.total,
    coupon: state.cart.coupon,
  };
}

export default connect(mapStateToProps, { addToOrderRedux, setSpinnerRedux })(
  CheckoutScreen
);

const styles = StyleSheet.create({
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
  text: {
    color: "gray",
    fontSize: wp("3.3%"),
  },
  checkoutView: {
    backgroundColor: Colors.light_white,
    height: hp("8%"),
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    borderTopLeftRadius: wp("2%"),
    borderTopRightRadius: wp("2%"),
  },
  totalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: wp("6%"),
  },
  leftTxt: {
    color: Colors.secondry_text_color,
    fontFamily: Fonts.Font_Bold,
    flex: 0.2,
    fontSize: wp("4%"),
    textAlign: "left",
  },
  rightTxt: {
    color: Colors.text_color,
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("4%"),
    flex: 0.4,
    textAlign: "left",
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
  indicatorView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: hp("1.5%"),
  },

  indicator1: {
    marginHorizontal: wp("3%"),
  },
  ract: {
    borderWidth: 1,
    padding: 4.4,
    width: wp("38%"),
    backgroundColor: Colors.white,

    alignItems: "center",
  },
  tri: {
    position: "absolute",
    top: hp("0.6%"),
    right: -wp("2.6%"),
  },
  arrow: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    backgroundColor: Colors.white,
    borderColor: "#007299",
    width: 20,
    height: 21,
    transform: [{ rotate: "45deg" }],
  },
  indicatorText: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.8%"),
    textTransform: "uppercase",
    color: Colors.secondry_text_color,
  },
  deliveryTitle: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.8%"),
    color: Colors.text_color,
    marginLeft: wp("5%"),
  },
  summayTitle: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.8%"),
    color: Colors.text_color,
    left: wp("5%"),
  },
  addressBox: {
    marginLeft: wp("5%"),
    marginRight: wp("2.5%"),
    flex: 0.9,
    height: hp("15.5%"),
    borderRadius: wp("2%"),
  },
  deliveryBox: {
    marginHorizontal: wp("1.5%"),
    width: wp("72%"),
    height: hp("15.5%"),
    borderRadius: wp("2%"),
    backgroundColor: Colors.white,
    padding: wp("2.5%"),
  },
  addressTxt: {
    fontSize: wp("3.6%"),
    fontFamily: Fonts.Font_Reguler,
    color: Colors.text_color,
    textAlign: "left",
  },
  deliveryAddressTxt: {
    textAlign: "right",
    fontSize: wp("3.4%"),
    fontFamily: Fonts.Font_Reguler,
    color: Colors.link_color,
  },
  edit: {
    textAlign: "right",
  },
  editView: { justifyContent: "flex-start" },
  addressContent: {
    flexDirection: "row",
  },
  summryBox: {
    height: hp("6.5%"),
    backgroundColor: Colors.white,
    flexDirection: "row",
    marginVertical: hp("1%"),
  },
  image: {
    flex: 0.25,
    height: hp("10%"),
    resizeMode: "contain",
    width: wp("20%"),
  },
  plusView: {
    flex: 0.1,
    height: hp("15%"),
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  //payment styles here
  offerView: {
    padding: hp("1.5%"),
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  offerTxt: {
    fontSize: wp("3.8%"),
    fontFamily: Fonts.Font_Semibold,
    color: Colors.link_color,
  },
  paymentMethodTitle: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("4%"),
    color: Colors.text_color,
    marginLeft: wp("1%"),
  },
  paymentView: {
    flexDirection: "row",
    padding: hp("2%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: hp("0.5%"),
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.light_gray,
  },
  paymentMethodTxt: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.8%"),
    textAlign: "left",
    marginLeft: wp("2%"),
    flex: 0.9,
  },
});
