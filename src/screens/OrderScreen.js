import React, { useEffect, useState } from "react";
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
  OrdersComponent,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import { proceedCheckout } from "@actions";
import Fonts from "@helpers/Fonts";
import Tabs from "../component/OrderComponent/Tabs";
import OrderList from "../component/OrderComponent/OrderList";
import { OtrixContent } from "../component";
import { borderRadius } from "styled-system";
import Delivery from "./delivery.png";
import CashOnDelivery from "./cashonDelivery.png";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicon from "react-native-vector-icons/Ionicons";
import { getAllOrdersRedux } from "../redux/Action/general";
function OrderScreen(props) {
  useEffect(() => {
    const { currentUser } = props;
    props.getAllOrdersRedux(currentUser.uid);
  }, []);
  const [tab, setTab] = useState(0);
  const { navigation, orders } = props;
  console.log(orders);
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
            My Orders
          </Text>
        </View>
      </OtrixHeader>

      {/* Orders Content start from here */}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          marginHorizontal: wp("4%"),
          marginBottom: 10,
        }}
      >
        <View style={styles.tab}>
          <Text style={styles.tabText}>All</Text>
        </View>
        <View style={{ ...styles.tab, backgroundColor: "#ffdde4" }}>
          <Text style={{ ...styles.tabText, color: "#ff686d" }}>Confirmed</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Delivering</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Delivered</Text>
        </View>
      </View>
      <OtrixContent>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("OrderDetailScreen", {
                  order: order,
                });
              }}
            >
              <View style={styles.box}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                    marginTop: 5,
                  }}
                >
                  <View style={{ flex: 0.85 }}>
                    <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>
                      {
                        order.currentUser.address.find(
                          (address) => address.defaultShipping
                        ).address
                      }
                      ,
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
                    <Text
                      style={{
                        backgroundColor: "cadetblue",
                        color: "white",
                        fontSize: wp("2.4%"),
                        padding: 2,
                        paddingLeft: 10,
                        paddingRight: 10,
                        fontWeight: "bold",
                        alignSelf: "flex-start",
                        marginTop: 3,
                      }}
                    >
                      Regular Delivery
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.15,
                      alignItems: "flex-end",
                      marginRight: 10,
                    }}
                  >
                    <Entypo
                      name={"location"}
                      color={"#ec345b"}
                      style={{ fontSize: wp("6%") }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "gainsboro",
                    marginTop: 10,
                    marginBottom: 5,
                  }}
                ></View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>
                    Order ID
                  </Text>
                  <Text
                    style={{
                      fontSize: wp("3%"),
                      color: "#777",
                      fontWeight: "bold",
                    }}
                  >
                    #{order.id}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>
                    Date
                  </Text>
                  <Text style={{ fontSize: wp("3%"), color: "#777" }}>
                    {new Date(Number(order.id)).toLocaleDateString()}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>
                    Status
                  </Text>
                  <View
                    style={{
                      alignSelf: "flex-end",
                      backgroundColor:
                        order.orderStatus == "Processing"
                          ? "#1B75D0"
                          : order.orderStatus == "Confirmed"
                          ? "orange"
                          : order.orderStatus == "Delivering"
                          ? "darkorange"
                          : order.orderStatus == "Delivered"
                          ? "green"
                          : "red",
                      padding: 5,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: wp("2.8%"),
                        color: "white",
                      }}
                    >
                      {order.orderStatus}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp("3%"),
                      color: "#777",
                      fontWeight: "bold",
                    }}
                  >
                    Amount Payable
                  </Text>
                  <Text
                    style={{
                      fontSize: wp("3%"),
                      color: "#777",
                      fontWeight: "bold",
                    }}
                  >
                    ৳{" "}
                    {order.subTotal +
                      order.deliveryCharge -
                      order.discountApplied -
                      (order.couponApplied ? order.couponApplied.discount : 0)}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 15,
                    marginBottom: 10,
                    padding: 10,
                    paddingTop: 8,
                    paddingBottom: 8,
                    backgroundColor: "#dcefff",
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      color: "#005dac",
                      fontWeight: "bold",
                      fontSize: wp("3.3%"),
                    }}
                  >
                    Order Again
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "#777",
              textAlignVertical: "center",
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            Sorry You do not have any orders.
          </Text>
        )}
        {/* <View style={styles.box}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              marginTop: 5,
            }}
          >
            <View style={{ flex: 0.85 }}>
              <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>
                Flat-6a,431/12 Malibagh, Bakshibagh, Dhaka....
              </Text>
              <Text
                style={{
                  backgroundColor: "#ec345b",
                  color: "white",
                  fontSize: wp("2.4%"),
                  padding: 2,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                  marginTop: 3,
                }}
              >
                Regular Delivery
              </Text>
            </View>
            <View
              style={{ flex: 0.15, alignItems: "flex-end", marginRight: 10 }}
            >
              <Entypo
                name={"location"}
                color={"#ec345b"}
                style={{ fontSize: wp("6%") }}
              />
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "gainsboro",
              marginTop: 10,
              marginBottom: 5,
            }}
          ></View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>
              Order ID
            </Text>
            <Text
              style={{ fontSize: wp("3%"), color: "#777", fontWeight: "bold" }}
            >
              #57399
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>Date</Text>
            <Text style={{ fontSize: wp("3%"), color: "#777" }}>
              26 oct 2023
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>Status</Text>
            <View
              style={{
                alignSelf: "flex-end",
                backgroundColor: "blue",
                padding: 5,
                borderRadius: 7,
              }}
            >
              <Text
                style={{
                  fontSize: wp("2.8%"),
                  color: "white",
                }}
              >
                Processing
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text
              style={{ fontSize: wp("3%"), color: "#777", fontWeight: "bold" }}
            >
              Amount Payable
            </Text>
            <Text
              style={{ fontSize: wp("3%"), color: "#777", fontWeight: "bold" }}
            >
              Tk431061
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 15,
              marginBottom: 10,
              padding: 10,
              paddingTop: 8,
              paddingBottom: 8,
              backgroundColor: "#dcefff",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "#005dac",
                fontWeight: "bold",
                fontSize: wp("3.3%"),
              }}
            >
              Order Again
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              marginTop: 5,
            }}
          >
            <View style={{ flex: 0.85 }}>
              <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>
                Flat-6a,431/12 Malibagh, Bakshibagh, Dhaka....
              </Text>
              <Text
                style={{
                  backgroundColor: "#ec345b",
                  color: "white",
                  fontSize: wp("2.4%"),
                  padding: 2,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                  marginTop: 3,
                }}
              >
                Regular Delivery
              </Text>
            </View>
            <View
              style={{ flex: 0.15, alignItems: "flex-end", marginRight: 10 }}
            >
              <Entypo
                name={"location"}
                color={"#ec345b"}
                style={{ fontSize: wp("6%") }}
              />
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "gainsboro",
              marginTop: 10,
              marginBottom: 5,
            }}
          ></View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>
              Order ID
            </Text>
            <Text
              style={{ fontSize: wp("3%"), color: "#777", fontWeight: "bold" }}
            >
              #57399
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>Date</Text>
            <Text style={{ fontSize: wp("3%"), color: "#777" }}>
              26 oct 2023
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>Status</Text>
            <View
              style={{
                alignSelf: "flex-end",
                backgroundColor: "darkorange",
                padding: 5,
                borderRadius: 7,
              }}
            >
              <Text
                style={{
                  fontSize: wp("2.8%"),
                  color: "white",
                }}
              >
                Delivering
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text
              style={{ fontSize: wp("3%"), color: "#777", fontWeight: "bold" }}
            >
              Amount Payable
            </Text>
            <Text
              style={{ fontSize: wp("3%"), color: "#777", fontWeight: "bold" }}
            >
              Tk431061
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 15,
              marginBottom: 10,
              padding: 10,
              paddingTop: 8,
              paddingBottom: 8,
              backgroundColor: "#dcefff",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "#005dac",
                fontWeight: "bold",
                fontSize: wp("3.3%"),
              }}
            >
              Order Again
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              marginTop: 5,
            }}
          >
            <View style={{ flex: 0.85 }}>
              <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>
                Flat-6a,431/12 Malibagh, Bakshibagh, Dhaka....
              </Text>
              <Text
                style={{
                  backgroundColor: "#ec345b",
                  color: "white",
                  fontSize: wp("2.4%"),
                  padding: 2,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                  marginTop: 3,
                }}
              >
                Regular Delivery
              </Text>
            </View>
            <View
              style={{ flex: 0.15, alignItems: "flex-end", marginRight: 10 }}
            >
              <Entypo
                name={"location"}
                color={"#ec345b"}
                style={{ fontSize: wp("6%") }}
              />
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "gainsboro",
              marginTop: 10,
              marginBottom: 5,
            }}
          ></View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>
              Order ID
            </Text>
            <Text
              style={{ fontSize: wp("3%"), color: "#777", fontWeight: "bold" }}
            >
              #57399
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>Date</Text>
            <Text style={{ fontSize: wp("3%"), color: "#777" }}>
              26 oct 2023
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: wp("3.1%"), color: "gray" }}>Status</Text>
            <View
              style={{
                alignSelf: "flex-end",
                backgroundColor: "green",
                padding: 5,
                borderRadius: 7,
              }}
            >
              <Text
                style={{
                  fontSize: wp("2.8%"),
                  color: "white",
                }}
              >
                Delivered
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text
              style={{ fontSize: wp("3%"), color: "#777", fontWeight: "bold" }}
            >
              Amount Payable
            </Text>
            <Text
              style={{ fontSize: wp("3%"), color: "#777", fontWeight: "bold" }}
            >
              Tk431061
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 15,
              marginBottom: 10,
              padding: 10,
              paddingTop: 8,
              paddingBottom: 8,
              backgroundColor: "#dcefff",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "#005dac",
                fontWeight: "bold",
                fontSize: wp("3.3%"),
              }}
            >
              Order Again
            </Text>
          </View>
        </View> */}
      </OtrixContent>
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
    orders: state.cart.orders,
    currentUser: state.auth.currentUser,
  };
}

export default connect(mapStateToProps, { proceedCheckout, getAllOrdersRedux })(
  OrderScreen
);

const styles = StyleSheet.create({
  tab: {
    marginRight: 5,
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.light_white,
  },
  tabText: {
    color: "gray",
    fontWeight: "bold",
    fontSize: wp("3%"),
  },
  flex: 1,
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
    height: hp("30.5%"),
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
  },
});
