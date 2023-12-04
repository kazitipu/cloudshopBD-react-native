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
import { connect } from "react-redux";
import { borderStyle } from "styled-system";
import {
  incrementQuantityRedux,
  decrementQuantityRedux,
  removeFromCartRedux,
  setTotalRedux,
  setCouponRedux,
} from "../../redux/Action/general";
import Toast from "react-native-simple-toast";
import { matchCoupon } from "../../firebase/firebase.utils";
function CartView(props) {
  let cartProduct = props.products;
  let sumAmount = props.sumAmount;
  let actualOrder = props.actualOrder;
  let freeShipping = props.freeShipping;
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState("");
  const [showCoupon, setShowCoupon] = React.useState(false);
  const [coupon, setCoupon] = React.useState(null);

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
  const getTotal = (sumAmount) => {
    let total = 0;
    if (coupon) {
      if (sumAmount < freeShipping) {
        total =
          coupon.discountType == "cash"
            ? sumAmount + 70 - coupon.discountAmount
            : sumAmount +
              70 -
              parseInt(sumAmount * (coupon.discountAmount / 100));
        props.setTotalRedux(total);
        return total;
      } else {
        total =
          coupon.discountType == "cash"
            ? sumAmount - coupon.discountAmount
            : sumAmount - parseInt(sumAmount * (coupon.discountAmount / 100));
        props.setTotalRedux(total);
        return total;
      }
    } else {
      if (sumAmount < freeShipping) {
        total = sumAmount + 70;
        props.setTotalRedux(total);
        return total;
      } else {
        total = sumAmount;
        props.setTotalRedux(total);
        return total;
      }
    }
  };

  let { currentUser } = props;
  return (
    <>
      <View style={{ ...styles.cartContent2 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            backgroundColor: "",
          }}
        >
          <Image source={truck} style={styles.truck}></Image>
          <Text
            style={{
              color: "#ff8084",
              fontSize: wp("3.4%"),
              marginTop: wp("3.5%"),
              fontWeight: "bold",
            }}
          >
            {sumAmount > freeShipping
              ? "You will get free shipping."
              : `spend ৳ ${
                  parseInt(freeShipping) - parseInt(sumAmount)
                } more to get Free Shipping.`}
          </Text>
        </View>
      </View>
      {props.bottomSheet ? null : (
        <View style={{ ...styles.cartContent2 }}>
          <TouchableOpacity
            onPress={() => {
              setShowCoupon(!showCoupon);
            }}
          >
            <Text
              style={{
                marginTop: 10,
                color: "#666",
                textDecorationLine: "underline",
                marginBottom: 7,
                fontSize: wp("3.3%"),
              }}
            >
              Have coupon code?
            </Text>
          </TouchableOpacity>
          {showCoupon && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",

                marginBottom: 12,
              }}
            >
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Enter coupon code"
                placeholderTextColor={"#ff8084"}
              />

              <View style={styles.input2}>
                <TouchableOpacity
                  onPress={async () => {
                    let matchedCoupon = await matchCoupon(number);
                    if (matchedCoupon) {
                      if (
                        Date.parse(matchedCoupon.expirationDate) <
                        Date.parse(new Date().toDateString())
                      ) {
                        props.setCouponRedux(null);
                        setCoupon(null);
                        return Toast.show(
                          `${number} Coupon code was expired at ${matchedCoupon.expirationDate}`
                        );
                      }
                      if (
                        currentUser &&
                        currentUser.coupons &&
                        currentUser.coupons.length > 0 &&
                        currentUser.coupons.find(
                          (coupon) => coupon.id == matchedCoupon.id
                        ) &&
                        currentUser.coupons.find(
                          (coupon) => coupon.id == matchedCoupon.id
                        ).usageLimit >= matchedCoupon.usageLimit
                      ) {
                        props.setCouponRedux(null);
                        setCoupon(null);
                        return Toast.show(
                          `you've reaced the maximum usage limit of coupon ${number}.`
                        );
                      }
                      if (matchedCoupon.minimumOrder > sumAmount) {
                        props.setCouponRedux(null);
                        setCoupon(null);
                        return Toast.show(
                          `Please Order at least ${matchedCoupon.minimumOrder}Tk to use this Coupon ${number} `
                        );
                      }

                      props.setCouponRedux(matchedCoupon);
                      setCoupon(matchedCoupon);
                      return Toast.show(
                        `Coupon code ${number} has been applied to your order.`
                      );
                    } else {
                      props.setCouponRedux(null);
                      setCoupon(null);
                      return Toast.show(
                        `${number} is not a valid coupon code.`
                      );
                    }
                  }}
                >
                  <Text style={{ color: "white" }}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View
            style={{
              padding: 9,
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
              <Text style={{ color: "#ff8084", fontSize: wp("3.4%") }}>
                You are saving{" "}
                <Text
                  style={{
                    color: "#ff8084",
                    fontWeight: "bold",
                    fontSize: wp("3%"),
                  }}
                >
                  ৳ {actualOrder - sumAmount}
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
          <OtrixDivider size={"sm"} />
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
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: wp("3%"),
                  color: "white",
                  fontWeight: "bold",
                  padding: 3,
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: "#ff8084",
                }}
              >
                Regular Delivery
              </Text>
              <Text
                style={{
                  fontSize: wp("3.6%"),
                  color: "#ff8084",
                  fontWeight: "bold",
                }}
              >
                {sumAmount > freeShipping ? "Free" : "৳ 70"}
              </Text>
            </View>
            <Text style={{ color: "#555", fontSize: wp("2.9%"), marginTop: 4 }}>
              12-48 hours delivery (Inside Dhaka)
            </Text>
            <Text style={{ color: "#555", fontSize: wp("2.9%") }}>
              1-5 days delivery (Outside Dhaka)
            </Text>
            <Text
              style={{
                marginTop: 10,
                alignSelf: "flex-start",
                color: "white",
                fontWeight: "bold",
                fontSize: wp("2.6%"),
                backgroundColor: "cadetblue",
                padding: 10,
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 4,
              }}
            >
              ! Order above ৳ {freeShipping} to get free delivery.
            </Text>
          </View>
          <OtrixDivider size={"sm"} />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: "#e67a7d",
                fontWeight: "bold",
                fontSize: wp("3.4%"),
              }}
            >
              Amount Payable
            </Text>
            <Text
              style={{
                color: "#e67a7d",
                fontWeight: "bold",
                fontSize: wp("3.4%"),
              }}
            >
              ৳ {getTotal(sumAmount)}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.cartContent2}>
        <Text
          style={{
            color: "#444",
            marginBottom: 10,
          }}
        >
          Your total cart products ({cartProduct.length})
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

                <Pill
                  decrementQuantity={() => {
                    props.decrementQuantityRedux(item);
                  }}
                  incrementQuantity={() => {
                    props.incrementQuantityRedux(item);
                  }}
                  quantity={item.quantity}
                />
                <TouchableOpacity
                  onPress={() => {
                    props.removeFromCartRedux(item, props.currentUser);
                    Toast.show("Removed from cart.");
                  }}
                  style={{ marginTop: 60 }}
                >
                  <MatIcon name="trash" style={styles.delete} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    freeShipping: state.cart.freeShipping,
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, {
  incrementQuantityRedux,
  decrementQuantityRedux,
  removeFromCartRedux,
  setTotalRedux,
  setCouponRedux,
})(CartView);
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
