import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput,
  Modal,
  Platform,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";

import { connect } from "react-redux";
const { height, width } = Dimensions.get("screen");

class OrderTrackingModalResult extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    const { order } = this.props;
    return (
      <View style={styles.footerContainer}>
        {order.orderStatus !== "Cancelled" ? (
          <>
            {order.orderStatusScore >= 1 ? (
              <View style={styles.row}>
                <View style={{ marginRight: 25, marginTop: 5 }}>
                  <Text style={styles.text}>
                    {new Date(Number(order.date)).toLocaleDateString()}
                  </Text>
                  <Text style={styles.text}>
                    {new Date(Number(order.date)).toLocaleTimeString()}
                  </Text>
                </View>
                <View style={styles.iconProgressBarContainer}>
                  <View style={styles.iconContainer}>
                    <Entypo
                      name="shopping-cart"
                      size={15}
                      color="white"
                      style={{ marginTop: 7 }}
                    />
                  </View>
                  <View
                    style={{
                      ...styles.progressBarLine,
                      backgroundColor: "#23527c",
                    }}
                  ></View>
                </View>

                <Text style={styles.progressBarText}>
                  Order Placed {"\n"}
                  <Text style={{ color: "gray" }}>
                    Your order is successfully placed
                  </Text>
                </Text>
              </View>
            ) : (
              <View style={styles.row}>
                <View style={{ marginRight: 25, marginTop: 5 }}>
                  <Text style={{ ...styles.text, color: "white" }}>
                    12/12/2023
                  </Text>
                  <Text style={{ ...styles.text, color: "white" }}>
                    03:00 PM
                  </Text>
                </View>
                <View style={styles.iconProgressBarContainer}>
                  <View style={styles.iconContainer2}>
                    <Entypo
                      name="shopping-cart"
                      size={15}
                      color="gainsboro"
                      style={{ marginTop: 7 }}
                    />
                  </View>
                  <View
                    style={{
                      ...styles.progressBarLine,
                      backgroundColor: "gainsboro",
                    }}
                  ></View>
                </View>

                <Text style={styles.progressBarText2}>Order Placed</Text>
              </View>
            )}

            {order.orderStatusScore >= 2 ? (
              <View style={styles.row}>
                <View style={{ marginRight: 25, marginTop: 5 }}>
                  <Text style={styles.text}>
                    {new Date(Number(order.date)).toLocaleDateString()}
                  </Text>
                  <Text style={styles.text}>
                    {new Date(Number(order.date)).toLocaleTimeString()}
                  </Text>
                </View>
                <View style={styles.iconProgressBarContainer}>
                  <View style={styles.iconContainer}>
                    <FontAwesome5
                      name="tasks"
                      size={15}
                      color="white"
                      style={{ marginTop: 7 }}
                    />
                  </View>
                  <View
                    style={{
                      ...styles.progressBarLine,
                      backgroundColor: "#23527c",
                    }}
                  ></View>
                </View>

                <Text style={styles.progressBarText}>
                  Processing {"\n"}
                  <Text style={{ color: "gray" }}>
                    We are processing your order.
                  </Text>
                </Text>
              </View>
            ) : (
              <View style={styles.row}>
                <View style={{ marginRight: 25, marginTop: 5 }}>
                  <Text style={{ ...styles.text, color: "white" }}>
                    {" "}
                    12/12/2023
                  </Text>
                  <Text style={{ ...styles.text, color: "white" }}>
                    03:00 PM
                  </Text>
                </View>
                <View style={styles.iconProgressBarContainer}>
                  <View style={styles.iconContainer2}>
                    <FontAwesome5
                      name="tasks"
                      size={15}
                      color="gainsboro"
                      style={{ marginTop: 7 }}
                    />
                  </View>
                  <View
                    style={{
                      ...styles.progressBarLine,
                      backgroundColor: "gainsboro",
                    }}
                  ></View>
                </View>

                <Text style={styles.progressBarText2}>Processing</Text>
              </View>
            )}

            {order.orderStatusScore >= 3 ? (
              <View style={styles.row}>
                <View style={{ marginRight: 25, marginTop: 5 }}>
                  <Text style={styles.text}>
                    {new Date(Number(order.confirmedDate)).toLocaleDateString()}
                  </Text>
                  <Text style={styles.text}>
                    {new Date(Number(order.confirmedDate)).toLocaleTimeString()}
                  </Text>
                </View>
                <View style={styles.iconProgressBarContainer}>
                  <View style={styles.iconContainer}>
                    <FontAwesome
                      name="check-square-o"
                      size={15}
                      color="white"
                      style={{ marginTop: 7 }}
                    />
                  </View>
                  <View
                    style={{
                      ...styles.progressBarLine,
                      backgroundColor: "#23527c",
                    }}
                  ></View>
                </View>

                <Text style={styles.progressBarText}>
                  Confirmed {"\n"}
                  <Text style={{ color: "gray" }}>
                    Your order is confirmed.
                  </Text>
                </Text>
              </View>
            ) : (
              <View style={styles.row}>
                <View style={{ marginRight: 25, marginTop: 5 }}>
                  <Text style={{ ...styles.text, color: "white" }}>
                    12/12/2023
                  </Text>
                  <Text style={{ ...styles.text, color: "white" }}>
                    03:00 PM
                  </Text>
                </View>
                <View style={styles.iconProgressBarContainer}>
                  <View style={styles.iconContainer2}>
                    <FontAwesome
                      name="check-square-o"
                      size={15}
                      color="gainsboro"
                      style={{ marginTop: 7 }}
                    />
                  </View>
                  <View
                    style={{
                      ...styles.progressBarLine,
                      backgroundColor: "gainsboro",
                    }}
                  ></View>
                </View>

                <Text style={styles.progressBarText2}>Confirmed</Text>
              </View>
            )}

            {order.orderStatusScore >= 4 ? (
              <View style={styles.row}>
                <View style={{ marginRight: 25, marginTop: 5 }}>
                  <Text style={styles.text}>
                    {new Date(Number(order.packingDate)).toLocaleDateString()}
                  </Text>
                  <Text style={styles.text}>
                    {new Date(Number(order.packingDate)).toLocaleTimeString()}
                  </Text>
                </View>
                <View style={styles.iconProgressBarContainer}>
                  <View style={styles.iconContainer}>
                    <FontAwesome5
                      name="box-open"
                      size={15}
                      color="white"
                      style={{ marginTop: 7 }}
                    />
                  </View>
                  <View
                    style={{
                      ...styles.progressBarLine,
                      backgroundColor: "#23527c",
                    }}
                  ></View>
                </View>

                <Text style={styles.progressBarText}>
                  Packing {"\n"}
                  <Text style={{ color: "gray" }}>
                    We are packing your order.
                  </Text>
                </Text>
              </View>
            ) : (
              <View style={styles.row}>
                <View style={{ marginRight: 25, marginTop: 5 }}>
                  <Text style={{ ...styles.text, color: "white" }}>
                    12/12/2023
                  </Text>
                  <Text style={{ ...styles.text, color: "white" }}>
                    03:00 PM
                  </Text>
                </View>
                <View style={styles.iconProgressBarContainer}>
                  <View style={styles.iconContainer2}>
                    <FontAwesome5
                      name="box-open"
                      size={15}
                      color="gainsboro"
                      style={{ marginTop: 7 }}
                    />
                  </View>
                  <View
                    style={{
                      ...styles.progressBarLine,
                      backgroundColor: "gainsboro",
                    }}
                  ></View>
                </View>

                <Text style={styles.progressBarText2}>Packing</Text>
              </View>
            )}
            {order.orderStatusScore >= 5 ? (
              <View style={styles.row}>
                <View style={{ marginRight: 25, marginTop: 5 }}>
                  <Text style={styles.text}>
                    {new Date(Number(order.deliveredDate)).toLocaleDateString()}
                  </Text>
                  <Text style={styles.text}>
                    {new Date(Number(order.deliveredDate)).toLocaleTimeString()}
                  </Text>
                </View>
                <View style={styles.iconProgressBarContainer}>
                  <View style={styles.iconContainer}>
                    <FontAwesome
                      name="check"
                      size={15}
                      color="white"
                      style={{ marginTop: 7 }}
                    />
                  </View>
                </View>

                <Text style={styles.progressBarText}>
                  Delivered {"\n"}
                  <Text style={{ color: "gray" }}>
                    Your order is delivered.
                  </Text>
                </Text>
              </View>
            ) : (
              <View style={styles.row}>
                <View style={{ marginRight: 25, marginTop: 5 }}>
                  <Text style={{ ...styles.text, color: "white" }}>
                    12/12/2023
                  </Text>
                  <Text style={{ ...styles.text, color: "white" }}>
                    03:00 PM
                  </Text>
                </View>
                <View style={styles.iconProgressBarContainer}>
                  <View style={styles.iconContainer2}>
                    <FontAwesome
                      name="check"
                      size={15}
                      color="gainsboro"
                      style={{ marginTop: 7 }}
                    />
                  </View>
                </View>

                <Text style={styles.progressBarText2}>Delivered</Text>
              </View>
            )}
          </>
        ) : (
          <>
            <View style={styles.row}>
              <View style={{ marginRight: 25, marginTop: 5 }}>
                <Text style={{ ...styles.text, color: "red" }}>
                  {new Date(Number(order.date)).toLocaleDateString()}
                </Text>
                <Text style={{ ...styles.text, color: "red" }}>
                  {new Date(Number(order.date)).toLocaleTimeString()}
                </Text>
              </View>
              <View
                style={{
                  ...styles.iconProgressBarContainer,
                }}
              >
                <View
                  style={{ ...styles.iconContainer, backgroundColor: "red" }}
                >
                  <Entypo
                    name="cross"
                    size={15}
                    color="white"
                    style={{ marginTop: 7 }}
                  />
                </View>
                <View
                  style={{
                    ...styles.progressBarLine,
                    backgroundColor: "red",
                  }}
                ></View>
              </View>

              <Text style={{ ...styles.progressBarText2, color: "red" }}>
                Order Placed
              </Text>
            </View>

            <View style={styles.row}>
              <View style={{ marginRight: 25, marginTop: 5 }}>
                <Text style={{ ...styles.text, color: "red" }}>
                  {new Date(Number(order.cancelledDate)).toLocaleDateString()}
                </Text>
                <Text style={{ ...styles.text, color: "red" }}>
                  {new Date(Number(order.cancelledDate)).toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.iconProgressBarContainer}>
                <View
                  style={{ ...styles.iconContainer, backgroundColor: "red" }}
                >
                  <Entypo
                    name="cross"
                    size={15}
                    color="white"
                    style={{ marginTop: 7 }}
                  />
                </View>
                <View
                  style={{
                    ...styles.progressBarLine,
                    backgroundColor: "red",
                  }}
                ></View>
              </View>

              <Text style={{ ...styles.progressBarText2, color: "red" }}>
                Processing
              </Text>
            </View>

            <View style={styles.row}>
              <View style={{ marginRight: 25, marginTop: 5 }}>
                <Text style={{ ...styles.text, color: "red" }}>
                  {new Date(Number(order.cancelledDate)).toLocaleDateString()}
                </Text>
                <Text style={{ ...styles.text, color: "red" }}>
                  {new Date(Number(order.cancelledDate)).toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.iconProgressBarContainer}>
                <View
                  style={{ ...styles.iconContainer2, backgroundColor: "red" }}
                >
                  <Entypo
                    name="cross"
                    size={15}
                    color="white"
                    style={{ marginTop: 7 }}
                  />
                </View>
                <View
                  style={{
                    ...styles.progressBarLine,
                    backgroundColor: "red",
                  }}
                ></View>
              </View>

              <Text style={{ ...styles.progressBarText2, color: "red" }}>
                Confirmed
              </Text>
            </View>

            <View style={styles.row}>
              <View style={{ marginRight: 25, marginTop: 5 }}>
                <Text style={{ ...styles.text, color: "red" }}>
                  {new Date(Number(order.cancelledDate)).toLocaleDateString()}
                </Text>
                <Text style={{ ...styles.text, color: "red" }}>
                  {new Date(Number(order.cancelledDate)).toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.iconProgressBarContainer}>
                <View
                  style={{ ...styles.iconContainer2, backgroundColor: "red" }}
                >
                  <Entypo
                    name="cross"
                    size={15}
                    color="white"
                    style={{ marginTop: 7 }}
                  />
                </View>
                <View
                  style={{
                    ...styles.progressBarLine,
                    backgroundColor: "red",
                  }}
                ></View>
              </View>

              <Text style={{ ...styles.progressBarText2, color: "red" }}>
                Packing
              </Text>
            </View>

            <View style={styles.row}>
              <View style={{ marginRight: 25, marginTop: 5 }}>
                <Text style={{ ...styles.text, color: "red" }}>
                  {new Date(Number(order.cancelledDate)).toLocaleDateString()}
                </Text>
                <Text style={{ ...styles.text, color: "red" }}>
                  {new Date(Number(order.cancelledDate)).toLocaleTimeString()}
                </Text>
              </View>
              <View
                style={{
                  ...styles.iconProgressBarContainer,
                }}
              >
                <View
                  style={{ ...styles.iconContainer2, backgroundColor: "red" }}
                >
                  <Entypo
                    name="cross"
                    size={15}
                    color="white"
                    style={{ marginTop: 7 }}
                  />
                </View>
              </View>

              <Text style={{ ...styles.progressBarText2, color: "red" }}>
                Cancelled
              </Text>
            </View>
          </>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderTrackingResult: null,
  };
};
export default connect(mapStateToProps)(OrderTrackingModalResult);

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
  },
  container: {
    // flex: 1,
    top: 0,
    bottom: 0,
    backgroundColor: "#23527c",
  },
  headerContainer: {
    flex: 1,
    backgroundColor: "#23527c",
    padding: 10,
    marginTop: Platform.OS === "ios" ? 40 : 0,
  },
  headerHeader: {
    paddingVertical: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  infoContainer: {
    marginTop: 10,
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    marginBottom: 30,
  },

  user: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  optioncontainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 2,
    justifyContent: "space-between",
    padding: 5,
  },
  option: {
    fontSize: 14,
    color: "white",
  },

  footerContainer: {
    backgroundColor: "white",
    backgroundColor: "white",
    marginTop: 15,
    paddingBottom: 20,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
  },
  iconProgressBarContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  iconContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#23527c",
    alignItems: "center",
  },
  iconContainer2: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gainsboro",
    alignItems: "center",
  },
  progressBarLine: {
    height: 30,
    width: 3,
    backgroundColor: "gainsboro",
    alignSelf: "center",
  },
  progressBarText: {
    color: "#23527c",
    fontSize: 10,
    paddingLeft: 10,
    fontWeight: "bold",
    marginTop: 5,
    maxWidth: "80%",
    width: "80%",
  },
  progressBarText2: {
    color: "gray",
    fontSize: 10,
    paddingLeft: 10,
    marginTop: 10,
  },
});
