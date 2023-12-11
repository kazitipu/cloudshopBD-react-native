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
  let order = props.order;
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState("");
  const PriceQuantity = (price, quantity) => {
    let amt = parseFloat(price.replace("$", ""));
    let qty = parseInt(quantity);
    return "$" + amt;
  };
  const singleProductTotal = (product) => {
    let total = parseInt(getPrice2(product)) * product.quantity;
    return total;
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
      if (product.selectedVariation.salePrice == 0) {
        return "";
      } else {
        return `৳ ${product.selectedVariation.price}`;
      }
    } else {
      if (product.product) {
        if (product.product.salePrice == 0) {
          return "";
        } else {
          return `৳ ${product.product.price}`;
        }
      } else {
        return 0;
      }
    }
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
              key={
                item.selectedVariation && item.selectedVariation.id
                  ? item.selectedVariation.id
                  : item.productId
              }
            >
              <View style={styles.cartBox}>
                <View style={styles.imageView}>
                  <Image
                    source={{
                      uri:
                        item.selectedVariation &&
                        item.selectedVariation.id &&
                        item.selectedVariation.pictures &&
                        item.selectedVariation.pictures.length > 0
                          ? item.selectedVariation.pictures[0]
                          : item.product.pictures[0],
                    }}
                    style={styles.image}
                  ></Image>
                </View>
                <View style={styles.infromationView}>
                  <TouchableOpacity
                    style={{ padding: 4, paddingLeft: 0, paddingBottom: 0 }}
                    onPress={() =>
                      props.navigation.navigate("ProductDetailScreen", {
                        id: item.productId,
                      })
                    }
                  >
                    <Text style={styles.name}>
                      {item.product.name.slice(0, 25)}...
                    </Text>
                  </TouchableOpacity>
                  {item.product.selectedCategories &&
                    item.product.selectedCategories.length > 0 &&
                    item.product.selectedCategories
                      .slice(0, 2)
                      .map((cat, index) => (
                        <Text key={index} style={styles.categoryText}>
                          {cat.name}
                        </Text>
                      ))}

                  <View style={{ marginTop: 6 }}>
                    {item.selectedVariation &&
                      item.selectedVariation.id &&
                      item.selectedVariation.combination.map((comb, index) => (
                        <Text key={index} style={styles.variantText}>
                          {item.product.savedAttributes.find(
                            (attr) => attr.id == comb.parentId
                          )
                            ? item.product.savedAttributes.find(
                                (attr) => attr.id == comb.parentId
                              ).name
                            : ""}
                          : {comb.name}
                        </Text>
                      ))}
                  </View>
                  <View>
                    <Text style={styles.variantText}>
                      Total:৳ {singleProductTotal(item)} ({item.quantity}pc)
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.deleteIconContainer}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp("2.3%"),
                      textDecorationLine: "line-through",
                      color: "gray",
                      marginTop: 3,
                    }}
                  >
                    {getPrice3(item)}{" "}
                  </Text>
                  <Text
                    style={{
                      color: "#ff8084",
                      fontSize: wp("3.2%"),
                      fontWeight: "bold",
                    }}
                  >
                    ৳ {getPrice2(item)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
      </View>

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
                ৳ {props.actualOrder - props.sumAmount}
              </Text>{" "}
              in this order.
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
          <Text style={{ color: "#444", fontSize: wp("3.2%") }}>Order ID</Text>
          <Text
            style={{
              color: "#666",
              fontWeight: "bold",
              fontSize: wp("2.8%"),
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
            {new Date(Number(order.date)).toLocaleDateString()}{" "}
            {new Date(Number(order.date)).toLocaleTimeString()}
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
          <Text style={{ color: "#444", fontSize: wp("3.2%") }}>Subtotal</Text>
          <Text
            style={{
              color: "#666",
              fontWeight: "bold",
              fontSize: wp("2.8%"),
            }}
          >
            Tk {props.actualOrder}
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
            -Tk {order.discountApplied}
          </Text>
        </View>
        {order.couponApplied && (
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
              Coupon applied ({order.couponApplied.name})
            </Text>
            <Text
              style={{
                color: "#666",
                fontWeight: "bold",
                fontSize: wp("2.8%"),
              }}
            >
              -Tk {order.couponApplied.discount}
            </Text>
          </View>
        )}
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
            Delivery Charge
          </Text>
          <Text
            style={{
              color: "#666",
              fontWeight: "bold",
              fontSize: wp("2.8%"),
            }}
          >
            + Tk {order.deliveryCharge}
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
            -Tk 0
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
            Tk{" "}
            {order.subTotal +
              order.deliveryCharge -
              order.discountApplied -
              (order.couponApplied ? order.couponApplied.discount : 0)}
          </Text>
        </View>
      </View>
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
