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
} from "../../redux/Action/general";
import Toast from "react-native-simple-toast";
function CartView(props) {
  let cartProduct = props.products;
  let sumAmount = props.sumAmount;
  let freeShipping = props.freeShipping;
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

                  <View>
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
    padding: 10,
    margin: 4,
    paddingTop: 0,
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
    marginTop: -5,
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
    marginTop: -5,
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
  },

  delete: {
    fontSize: wp("3.6%"),
    color: "#777",
  },
});
