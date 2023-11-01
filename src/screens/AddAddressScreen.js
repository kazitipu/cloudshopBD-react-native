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
  Switch,
} from "react-native";
import { connect } from "react-redux";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixDivider,
  OtirxBackButton,
  AddAdressComponent,
  EditAddressComponent,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import { proceedCheckout } from "@actions";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicon from "react-native-vector-icons/Ionicons";
import Fonts from "@helpers/Fonts";
import DummyAddress from "@component/items/DummyAddress";
import GradientButton from "../component/CartComponent/Button";
import { Button } from "native-base";
import Delivery from "./delivery.png";
import CashOnDelivery from "./cashonDelivery.png";
import { fontWeight } from "styled-system";
function ManageAddressScreen(props) {
  const [state, setState] = React.useState({
    cartArr: [],
    showAdd: false,
    sumAmount: 0,
    addresses: DummyAddress,
    selctedAddress: DummyAddress[0].id,
    showEdit: false,
    editAddressData: [],
    step: 1,
    selectedPaymentMethod: 4,
    paymentSuccessModal: false,
    switch: false,
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

  useEffect(() => {}, []);

  const toggleSwitch = () => {
    setState({
      ...state,
      switch: !state.switch,
    });
  };
  const {
    showAdd,
    addresses,
    selctedAddress,
    showEdit,
    editAddressData,
    step,
  } = state;

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
            Add Shipping Address
          </Text>
        </View>
      </OtrixHeader>

      {/* Address Content start from here */}

      <>
        <View style={styles.addressContent}>
          {/*horizontal address* */}
          <ScrollView
            style={styles.addressBox}
            showsHorizontalScrollIndicator={false}
            vertical={true}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "#ec345b",
                  fontSize: wp("3.6%"),

                  flex: 0.35,
                }}
              >
                Full Name
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#666",
                  padding: 3,
                  width: "100%",
                  flex: 0.65,
                }}
                placeholder="Enter full name"
                placeholderTextColor={"#777"}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "#ec345b",
                  fontSize: wp("3.6%"),

                  flex: 0.35,
                }}
              >
                Mobile
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#666",
                  padding: 3,
                  width: "100%",
                  flex: 0.65,
                }}
                placeholder="+8801641103558"
                placeholderTextColor={"#777"}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "#ec345b",
                  fontSize: wp("3.6%"),

                  flex: 0.35,
                }}
              >
                Division
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#666",
                  padding: 3,
                  width: "100%",
                  flex: 0.65,
                }}
                placeholder="Enter your division name"
                placeholderTextColor={"#777"}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "#ec345b",
                  fontSize: wp("3.6%"),

                  flex: 0.35,
                }}
              >
                District
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#666",
                  padding: 3,
                  width: "100%",
                  flex: 0.65,
                }}
                placeholder="Enter district name"
                placeholderTextColor={"#777"}
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "#ec345b",
                  fontSize: wp("3.6%"),

                  flex: 0.35,
                }}
              >
                Address
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#666",
                  padding: 3,
                  width: "100%",
                  flex: 0.65,
                }}
                placeholder="Enter your address"
                placeholderTextColor={"#777"}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "#ec345b",
                  fontSize: wp("3.6%"),

                  flex: 0.35,
                }}
              >
                Address Type
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "gainsboro",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Ionicon
                  name={"home"}
                  color={"gray"}
                  style={{ fontSize: wp("4.5%") }}
                />
                <Text style={{ color: "gray", marginLeft: 7 }}>Home</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#ff8084",
                  padding: 10,
                  borderRadius: 5,
                  marginLeft: 15,
                }}
              >
                <MatIcon
                  name={"office-building"}
                  color={"#ff8084"}
                  style={{ fontSize: wp("4.5%") }}
                />
                <Text style={{ color: "#ec345b", marginLeft: 7 }}>Office</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "gainsboro",
                  padding: 10,
                  borderRadius: 5,
                  marginLeft: 15,
                }}
              >
                <Ionicon
                  name={"home-outline"}
                  color={"gray"}
                  style={{ fontSize: wp("4.5%") }}
                />
                <Text style={{ color: "gray", marginLeft: 7 }}>Village</Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  color: "#ec345b",
                  fontSize: wp("3.6%"),
                  flex: 0.8,
                  marginTop: 6,
                }}
              >
                Make default shipping address
              </Text>
              <Switch
                trackColor={{ false: "gray", true: "#ff6166" }}
                ios_backgroundColor={"gainsboro"}
                onValueChange={toggleSwitch}
                value={state.switch}
              />
            </View>
          </ScrollView>
        </View>
      </>
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
          label={"Save"}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </View>
      {/* Add Address Screen */}
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
  };
}

export default connect(mapStateToProps, { proceedCheckout })(
  ManageAddressScreen
);

const styles = StyleSheet.create({
  deliveryTitle: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.8%"),
    color: Colors.text_color,
    marginLeft: wp("5%"),
  },
  addressBox: {
    marginLeft: wp("5%"),
    marginRight: wp("2.5%"),
    flex: 1,
    height: "auto",
    borderRadius: wp("2%"),
  },
  deliveryBox: {
    marginHorizontal: wp("1.5%"),
    width: wp("88%"),
    marginVertical: hp("0.5%"),
    height: hp("13.5%"),
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
    height: hp("70%"),
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
  text: {
    color: "gray",
    fontSize: wp("3.3%"),
  },
});
