import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import OtrixDivider from "../OtrixComponent/OtrixDivider";
import Fonts from "@helpers/Fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import MatIcon from "react-native-vector-icons/FontAwesome5";
import Pill from "./Pill";
import tk from "./tk.png";
import truck from "./truck.png";
import { borderStyle } from "styled-system";
function CartView(props) {
  let cartProduct = props.products;
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState("");
  const PriceQuantity = (price, quantity) => {
    let amt = parseFloat(price.replace("$", ""));
    let qty = parseInt(quantity);
    return "$" + amt;
  };
  return (
    <>
      <View style={styles.cartContent2}>
        <Text
          style={{
            color: "#444",
            marginBottom: 10,
          }}
        >
          Ordered Products
        </Text>
        {cartProduct.length > 0 &&
          cartProduct.map((item, index) => (
            <View
              style={{
                ...styles.cartContent,
                borderBottomWidth: index + 1 == cartProduct.length ? 0 : 1,
              }}
              key={item.id}
            >
              <View style={styles.cartBox}>
                <View style={styles.imageView}>
                  <Image source={item.image} style={styles.image}></Image>
                </View>
                <View style={styles.infromationView}>
                  <TouchableOpacity
                    style={{ padding: 4, paddingLeft: 0, paddingBottom: 0 }}
                    onPress={() =>
                      props.navigation.navigate("ProductDetailScreen", {
                        id: item.id,
                      })
                    }
                  >
                    <Text style={styles.name}>Beauty Glazed Lip Mud</Text>
                  </TouchableOpacity>
                  <Text style={styles.categoryText}>Eye shadow</Text>
                  <Text style={styles.categoryText}>Lip gloss</Text>
                  <View style={{ marginTop: 6 }}>
                    <Text style={styles.variantText}>Shades: White</Text>
                    <Text style={styles.variantText}>Color: Blue</Text>
                  </View>
                  <View>
                    <Text style={styles.variantText}>Total:৳ 3500 (10pc)</Text>
                  </View>
                </View>
              </View>
              <View style={styles.deleteIconContainer}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      color: "#ff8084",
                      fontSize: wp("3.2%"),
                      fontWeight: "bold",
                    }}
                  >
                    ৳ 350
                  </Text>
                  <Text
                    style={{
                      fontSize: wp("3.1%"),
                      textDecorationLine: "line-through",
                      color: "gray",
                      marginTop: 3,
                    }}
                  >
                    ৳ 450{" "}
                  </Text>
                </View>
              </View>
            </View>
          ))}
      </View>
      {props.bottomSheet ? null : (
        <View style={{ ...styles.cartContent2 }}>
          <View
            style={{
              padding: 15,
              backgroundColor: "#fffbfc",
              borderWidth: 1,
              borderColor: "#ff8084",
              borderStyle: "dashed",
              borderRadius: 5,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Image source={tk} style={styles.image2}></Image>
              <Text style={{ color: "#ff8084", fontSize: wp("3%") }}>
                {" "}
                You have saved{" "}
                <Text
                  style={{
                    color: "#ff8084",
                    fontWeight: "bold",
                    fontSize: wp("3%"),
                  }}
                >
                  Tk184432
                </Text>{" "}
                in this order.
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                marginTop: 7,
              }}
            >
              <Image source={tk} style={styles.image2}></Image>
              <Text style={{ color: "#ff8084", fontSize: wp("3%") }}>
                {" "}
                You will receive{" "}
                <Text
                  style={{
                    color: "#ff8084",
                    fontWeight: "bold",
                    fontSize: wp("3%"),
                  }}
                >
                  Tk100
                </Text>{" "}
                cashback after delivery.
              </Text>
            </View>
          </View>
          <OtrixDivider size={"sm"} />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
              marginTop: 5,
            }}
          >
            <Text style={{ color: "#444", fontSize: wp("3.2%") }}>
              Order ID
            </Text>
            <Text
              style={{
                color: "#666",
                fontWeight: "bold",
                fontSize: wp("2.8%"),
              }}
            >
              #345672
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
              marginTop: 5,
            }}
          >
            <Text style={{ color: "#444", fontSize: wp("3.2%") }}>
              Ordered at
            </Text>
            <Text
              style={{
                color: "#666",
                fontWeight: "bold",
                fontSize: wp("2.8%"),
              }}
            >
              26 Oct 2023, 03:00 PM
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
              marginTop: 5,
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
              Tk 6506660
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
              marginTop: 5,
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
              -Tk 6506660
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
              marginTop: 5,
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
              -Tk 0.85
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                color: "#666",
                fontWeight: "bold",
                fontSize: wp("3.4%"),
              }}
            >
              Amount Payable
            </Text>
            <Text
              style={{
                color: "#666",
                fontWeight: "bold",
                fontSize: wp("3.4%"),
              }}
            >
              Tk 17850
            </Text>
          </View>
        </View>
      )}
    </>
  );
}

export default CartView;
const styles = StyleSheet.create({
  categoryText: {
    fontSize: wp("2.4%"),
    color: "#444",
  },
  input: {
    height: 40,
    width: "75%",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fffbfc",
    paddingLeft: 20,
    borderColor: "#ff8084",
    borderStyle: "dashed",
    color: "#ff8084",
    borderRadius: 5,
  },
  input2: {
    height: 40,
    width: "25%",
    padding: 10,
    backgroundColor: "#ff8084",
    borderWidth: 1,
    borderColor: "#ff8084",
    borderStyle: "solid",
    color: "white",
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    alignItems: "center",
  },
  variantText: {
    fontSize: wp("2.5%"),
    color: "#555",
    fontWeight: "bold",
  },
  cartContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderBottomColor: "gainsboro",
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 12,
  },
  cartContent2: {
    backgroundColor: Colors.white,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    padding: 10,
    borderRadius: wp("3%"),
    margin: 4,
  },
  cartBox: {
    flexDirection: "row",
    flex: 0.7,
  },
  imageView: {
    flex: 0.25,
    backgroundColor: Colors.light_white,
    marginRight: wp("3%"),
    height: hp("7.5%"),
    borderRadius: wp("1.5%"),
    marginTop: 3,
  },
  image: {
    resizeMode: "cover",
    alignSelf: "center",
    height: undefined,
    aspectRatio: 1,
    width: wp("15.5%"),
  },
  image2: {
    resizeMode: "contain",
    alignSelf: "center",
    height: undefined,
    aspectRatio: 1,
    width: wp("4.5%"),
  },
  truck: {
    resizeMode: "contain",
    alignSelf: "center",
    height: undefined,
    aspectRatio: 1,
    width: wp("12%"),
  },
  infromationView: {
    flex: 0.75,
    alignItems: "flex-start",
  },
  name: {
    color: "#474747",
    fontSize: wp("3.2%"),
    fontFamily: Fonts.Font_Bold,
  },
  price: {
    color: Colors.link_color,
    fontSize: wp("3.5%"),
    fontFamily: Fonts.Font_Bold,
  },
  plusminus: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  plusminusTxt: {
    fontSize: wp("2.7%"),
    color: Colors.secondry_text_color,
    textAlign: "center",
  },
  quantityTxt: {
    fontSize: wp("3%"),
    color: Colors.text_color,
    marginHorizontal: wp("1%"),
    fontFamily: Fonts.Font_Bold,
    textAlign: "center",
  },
  deleteIconContainer: {
    flex: 0.3,
    alignItems: "flex-end",
    marginRight: 10,
    marginTop: 5,
  },

  delete: {
    fontSize: wp("3.6%"),
    color: "#777",
  },
});
