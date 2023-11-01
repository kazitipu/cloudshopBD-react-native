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
          Your wishlist (12)
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
                    ৳ 450{" "}
                  </Text>
                  <Text
                    style={{
                      color: "#ff8084",
                      fontSize: wp("3.2%"),
                      fontWeight: "bold",
                    }}
                  >
                    ৳ 350
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => props.deleteItem(item.id)}
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

export default CartView;
const styles = StyleSheet.create({
  categoryText: {
    fontSize: wp("2.4%"),
    color: "#444",
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
    margin: 2,
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
