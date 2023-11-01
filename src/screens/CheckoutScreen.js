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
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import { proceedCheckout } from "@actions";
import ProductListDummy from "@component/items/ProductListDummy";
import PaymentMethodsDummy from "@component/items/PaymentMethodsDummy";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicon from "react-native-vector-icons/Ionicons";
import Fonts from "@helpers/Fonts";
import DummyAddress from "@component/items/DummyAddress";
import GradientButton from "../component/CartComponent/Button";
import Delivery from "./delivery.png";
import CashOnDelivery from "./cashonDelivery.png";
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

  const calculateCart = () => {
    let cartProducts = props.cartData;
    let cartItems = [];
    let sumAmount = 0;

    //find and create array
    cartProducts &&
      cartProducts.length > 0 &&
      cartProducts.forEach(function (item, index) {
        let findedProduct = ProductListDummy.filter(
          (product) => product.id == item.product_id
        );
        cartItems.push({
          quantity: item.quantity,
          name: findedProduct[0].name,
          price: findedProduct[0].price,
          image: findedProduct[0].image,
          id: findedProduct[0].id,
        });
        let amt = parseInt(findedProduct[0].price.replace("$", ""));
        sumAmount += amt * item.quantity;
      });

    setState({
      ...state,
      noRecord: cartProducts.length > 0 ? false : true,
      loading: false,
      cartProducts: cartItems,
      sumAmount: sumAmount,
    });
  };

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

  const updateAddress = (addressData) => {
    let newID = "" + Math.floor(Math.random() * 10000) + 1;
    if (selctedAddress == addressData.id) {
      setState({ ...state, selctedAddress: newID });
    }
    let findIndex = addresses.findIndex(
      (item) => item.id === editAddressData.id
    );
    let newObj = {
      id: newID,
      name: addressData.name,
      country: addressData.country,
      city: addressData.city,
      postcode: addressData.postcode,
      address1: addressData.address1,
      address2: addressData.address2,
    };
    addresses.splice(findIndex, 1);

    setState({
      ...state,
      addresses: [newObj, ...addresses],
      showEdit: false,
    });
    if (selctedAddress == addressData.id) {
      setState({ ...state, selctedAddress: newID });
    }
  };

  const editAddress = (id) => {
    let findAddress = addresses.filter((item) => item.id.indexOf(id) > -1);
    setState({ ...state, editAddressData: findAddress[0], showEdit: true });
  };

  const closeAddressModel = () => {
    setState({
      ...state,
      showAdd: false,
    });
  };

  const closeAddressEditModel = () => {
    setState({
      ...state,
      showEdit: false,
    });
  };

  const _proceedCheckout = () => {
    props.proceedCheckout();
  };

  useEffect(() => {
    calculateCart();
  }, []);

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
  const { totalAmt } = props.route.params;

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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              marginTop: 15,
              paddingBottom: 20,
            }}
          >
            <View style={{ flex: 0.2 }}>
              <Image
                source={Delivery}
                style={{ height: 40, width: "100%" }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 0.6 }}>
              <Text style={styles.text}>Kazi Tipu</Text>
              <Text style={styles.text}>+8801641103558</Text>
              <Text style={styles.text}>
                431/12,Bakshibagh,Malibagh,Dhaka City,Dhaka
              </Text>
              <Text style={styles.text}>kazi.tipu.nxt@gmail.com</Text>
            </View>

            <View style={{ flex: 0.2, paddingRight: 15 }}>
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
            </View>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
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
              ৳ 1290
            </Text>
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
              Spend <Text style={{ fontWeight: "bold" }}>Tk 1500</Text> to get
              free home delivery.
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
                  }}
                >
                  CASH ON DELIVERY
                </Text>
              </View>
            </View>
          </View>
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
      >
        <GradientButton
          label={"PLACE ORDER"}
          onPress={() => {
            setState({
              ...state,
              paymentSuccessModal: true,
            });
          }}
        />
      </View>

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
  };
}

export default connect(mapStateToProps, { proceedCheckout })(CheckoutScreen);

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
