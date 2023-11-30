import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
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
import { updateShippingAddressRedux } from "@actions";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicon from "react-native-vector-icons/Ionicons";
import Fonts from "@helpers/Fonts";
import DummyAddress from "@component/items/DummyAddress";
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

  const {
    showAdd,
    addresses,
    selctedAddress,
    showEdit,
    editAddressData,
    step,
  } = state;
  const { currentUser } = props;
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
            Manage Address
          </Text>
        </View>
      </OtrixHeader>

      {/* Address Content start from here */}

      <View style={styles.addressContent}>
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
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("AddAddressScreen");
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffedf1",
                  padding: 13,
                  borderRadius: 5,
                  borderStyle: "dotted",
                  borderWidth: 1,
                  borderColor: "#ff8084",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <MatIcon name="plus" color={"#ec345b"} size={wp("5.5%")} />
                <Text style={{ color: "#ec345b", marginTop: 3 }}>
                  {" "}
                  Add New Address
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              height: 1,
              widht: "100%",
              backgroundColor: "gainsboro",
            }}
          ></View>
          <Text
            style={{
              textAlign: "center",
              color: "#ec345b",
              fontWeight: "bold",
              padding: 0,
            }}
          >
            OR
          </Text>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              height: 1,
              widht: "100%",
              backgroundColor: "gainsboro",
            }}
          ></View>
          <Text
            style={{
              textAlign: "center",
              color: "#555",

              padding: 5,
            }}
          >
            Choose Shipping Address
          </Text>
          {currentUser.address &&
            currentUser.address.length > 0 &&
            currentUser.address.map((shippingAddress) => (
              <TouchableOpacity
                key={shippingAddress.id}
                onPress={() => {
                  if (!shippingAddress.defaultShipping) {
                    props.updateShippingAddressRedux(currentUser, {
                      ...shippingAddress,
                      defaultShipping: true,
                    });
                  }
                  props.navigation.goBack();
                }}
              >
                <View
                  style={{
                    ...styles.box,
                    backgroundColor: shippingAddress.defaultShipping
                      ? "#fffafb"
                      : "white",
                    borderWidth: 1,
                    borderColor: shippingAddress.defaultShipping
                      ? "#ff99af"
                      : "white",
                  }}
                >
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
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Entypo
                        name={"location"}
                        color={"#ec345b"}
                        style={{ fontSize: wp("6.5%") }}
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
                    <View style={{ flex: 0.5 }}>
                      <Text style={styles.text}>
                        {shippingAddress.fullName}
                      </Text>
                      <Text style={styles.text}>
                        {shippingAddress.mobileNo}
                      </Text>
                      <Text style={styles.text}>{shippingAddress.address}</Text>
                      <Text style={styles.text}>
                        {shippingAddress.district},{shippingAddress.division}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 0.3,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginRight: 6,
                      }}
                    >
                      {!shippingAddress.defaultShipping && (
                        <TouchableOpacity
                          onPress={() => {
                            props.navigation.navigate("AddAddressScreen");
                          }}
                          style={{
                            marginRight: 8,
                          }}
                        >
                          <View
                            style={{
                              padding: 5,
                              paddingLeft: 15,
                              paddingRight: 15,
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
                              Edit
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                      {!shippingAddress.defaultShipping && (
                        <TouchableOpacity
                          onPress={() => {
                            props.navigation.navigate("AddAddressScreen");
                          }}
                        >
                          <Ionicon
                            name={"trash"}
                            color={"#ec345b"}
                            style={{ fontSize: wp("5.2%") }}
                          />
                        </TouchableOpacity>
                      )}
                      {shippingAddress.defaultShipping && (
                        <View
                          style={{
                            marginTop: 7,
                            backgroundColor: "#0092ac",
                            alignSelf: "flex-start",
                            padding: 5,
                            paddingTop: 3,
                            paddingBottom: 3,
                            borderRadius: 4,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: wp("2.3%"),
                              fontWeight: "bold",
                              color: "white",
                            }}
                          >
                            Shipping Address
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
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

export default connect(mapStateToProps, { updateShippingAddressRedux })(
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
    marginLeft: wp("3%"),
    marginRight: wp("3%"),
    flex: 1,
    height: "auto",
    borderRadius: wp("2%"),
    marginBottom: 100,
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
    height: hp("96%"),
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
