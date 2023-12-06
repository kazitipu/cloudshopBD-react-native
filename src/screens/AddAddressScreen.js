import React, { useEffect, useState } from "react";
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
import { updateUserAddressRedux, updateShippingAddressRedux } from "@actions";
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
import { setSpinnerRedux } from "../redux/Action";
function ManageAddressScreen(props) {
  const [state, setState] = React.useState({
    fullName: "",
    mobileNo: "",
    division: "",
    district: "",
    address: "",
    addressType: "Home",
    defaultShipping: false,
  });

  const { selectedAddress } =
    props.route && props.route.params
      ? props.route.params
      : { selectedAddress: null };
  console.log(selectedAddress);
  useEffect(() => {
    if (selectedAddress) {
      setState({
        ...selectedAddress,
      });
    }
  }, [selectedAddress]);

  const toggleSwitch = () => {
    setState({
      ...state,
      defaultShipping: !state.defaultShipping,
    });
  };
  const {} = state;
  const { currentUser } = props;
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
            {selectedAddress ? "Edit" : "Add"} Shipping Address
          </Text>
        </View>
      </OtrixHeader>

      {/* Address Content start from here */}

      {/*horizontal address* */}

      <ScrollView
        style={styles.addressBox}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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
            value={state.fullName}
            onChangeText={(value) => {
              console.log(value);
              setState({
                ...state,
                fullName: value,
              });
            }}
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
            placeholder="Enter mobile number"
            placeholderTextColor={"#777"}
            value={state.mobileNo}
            onChangeText={(value) => {
              setState({
                ...state,
                mobileNo: value,
              });
            }}
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
            value={state.division}
            onChangeText={(value) => {
              setState({
                ...state,
                division: value,
              });
            }}
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
            placeholder="Enter your district name"
            placeholderTextColor={"#777"}
            value={state.district}
            onChangeText={(value) => {
              setState({
                ...state,
                district: value,
              });
            }}
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
            value={state.address}
            onChangeText={(value) => {
              setState({
                ...state,
                address: value,
              });
            }}
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
          <TouchableOpacity
            onPress={() => {
              setState({
                ...state,
                addressType: "Home",
              });
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor:
                  state.addressType == "Home" ? "#ec345b" : "gainsboro",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Ionicon
                name={"home"}
                color={state.addressType == "Home" ? "#ec345b" : "gray"}
                style={{ fontSize: wp("4.5%") }}
              />
              <Text
                style={{
                  color: state.addressType == "Home" ? "#ec345b" : "gray",
                  marginLeft: 7,
                }}
              >
                Home
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setState({
                ...state,
                addressType: "Office",
              });
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor:
                  state.addressType == "Office" ? "#ec345b" : "gainsboro",
                padding: 10,
                borderRadius: 5,
                marginLeft: 15,
              }}
            >
              <MatIcon
                name={"office-building"}
                color={state.addressType == "Office" ? "#ec345b" : "gray"}
                style={{ fontSize: wp("4.5%") }}
              />
              <Text
                style={{
                  color: state.addressType == "Office" ? "#ec345b" : "gray",
                  marginLeft: 7,
                }}
              >
                Office
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setState({
                ...state,
                addressType: "Village",
              });
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor:
                  state.addressType == "Village" ? "#ec345b" : "gainsboro",
                padding: 10,
                borderRadius: 5,
                marginLeft: 15,
              }}
            >
              <Ionicon
                name={"home-outline"}
                color={state.addressType == "Village" ? "#ec345b" : "gray"}
                style={{ fontSize: wp("4.5%") }}
              />
              <Text
                style={{
                  color: state.addressType == "Village" ? "#ec345b" : "gray",
                  marginLeft: 7,
                }}
              >
                Village
              </Text>
            </View>
          </TouchableOpacity>
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
            value={state.defaultShipping}
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: -15,
          padding: 10,
          backgroundColor: "Colors.light_white",
          display: "flex",
          flexDirection: "row",
          minWidth: "100%",
        }}
      >
        <GradientButton
          onPress={async () => {
            props.setSpinnerRedux(true);
            await props.updateUserAddressRedux(props.currentUser, {
              ...state,
              id:
                selectedAddress && selectedAddress.id
                  ? selectedAddress.id
                  : new Date().getTime().toString(),
            });
            props.setSpinnerRedux(false);
            props.navigation.goBack();
          }}
          children={
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "Colors.light_white",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
            </View>
          }
        />
      </View>
      {/* Add Address Screen */}
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
    currentUser: state.auth.currentUser,
  };
}

export default connect(mapStateToProps, {
  updateUserAddressRedux,
  updateShippingAddressRedux,
  setSpinnerRedux,
})(ManageAddressScreen);

const styles = StyleSheet.create({
  deliveryTitle: {
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.8%"),
    color: Colors.text_color,
    marginLeft: wp("5%"),
  },
  addressBox: {
    marginLeft: wp("3%"),
    marginRight: wp("3%"),
    flex: 1,
    borderRadius: wp("2%"),
    marginBottom: 50,
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
    height: hp("100%"),
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
    padding: 10,
    paddingBottom: 30,
  },
  text: {
    color: "gray",
    fontSize: wp("3.3%"),
  },
});
