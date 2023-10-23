import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { GlobalStyles, Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Fonts from "@helpers/Fonts";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/FontAwesome";

function DealsProductView(props) {
  const data = props.data;
  const wishlistArr = props.wishlistArray ? props.wishlistArray : null;

  const getPrice = (product) => {
    if (product.displayedVariations.length > 0) {
      if (product.displayedVariations[0].salePrice == 0) {
        return (
          <>
            <Text style={styles.price}>
              ৳{product.displayedVariations[0].price}
            </Text>
            <View
              style={{
                flex: 0.5,
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ ...styles.offerTxt, color: "white" }}>৳0</Text>
              <View
                style={{
                  ...styles.offertxt2Container,
                  backgroundColor: "white",
                }}
              >
                <Text style={{ ...styles.offerTxt2 }}>0% Off</Text>
              </View>
            </View>
          </>
        );
      } else {
        return (
          <>
            <Text style={styles.price}>
              ৳{product.displayedVariations[0].salePrice}
            </Text>
            <View
              style={{
                flex: 0.5,
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Text style={styles.offerTxt}>
                ৳{product.displayedVariations[0].price}
              </Text>
              <View style={styles.offertxt2Container}>
                <Text style={styles.offerTxt2}>
                  {parseInt(
                    100 -
                      (product.displayedVariations[0].salePrice /
                        product.displayedVariations[0].price) *
                        100
                  )}
                  % Off
                </Text>
              </View>
            </View>
          </>
        );
      }
    } else {
      if (product.salePrice == 0) {
        return (
          <>
            <Text style={styles.price}>৳{product.price}</Text>
            <View
              style={{
                flex: 0.5,
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ ...styles.offerTxt, color: "white" }}>
                ৳{product.price}
              </Text>
              <View
                style={{
                  ...styles.offertxt2Container,
                  backgroundColor: "white",
                }}
              >
                <Text style={styles.offerTxt2}>0% Off</Text>
              </View>
            </View>
          </>
        );
      } else {
        return (
          <>
            <Text style={styles.price}>৳{product.salePrice}</Text>
            <View
              style={{
                flex: 0.5,
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ ...styles.offerTxt }}>৳{product.price}</Text>
              <View style={styles.offertxt2Container}>
                <Text style={styles.offerTxt2}>
                  {parseInt(100 - (product.salePrice / product.price) * 100)}%
                  Off
                </Text>
              </View>
            </View>
          </>
        );
      }
    }
  };
  return (
    <>
      {data && (
        <TouchableOpacity
          style={styles.productBox}
          onPress={() => props.navToDetail(data)}
        >
          <View style={styles.imageView}>
            <Image
              source={{ uri: `${data.pictures[0]}` }}
              style={styles.image}
            ></Image>
          </View>
          <View style={styles.infromationView}>
            <View style={styles.starView}>
              <Stars
                default={data.rating}
                count={5}
                half={true}
                starSize={45}
                fullStar={
                  <Icon name={"star"} size={11} style={[styles.myStarStyle]} />
                }
                emptyStar={
                  <Icon
                    name={"star-o"}
                    size={11}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  />
                }
                halfStar={
                  <Icon
                    name={"star-half-empty"}
                    size={11}
                    style={[styles.myStarStyle]}
                  />
                }
                disabled={true}
              />
            </View>
            <Text style={styles.productName} numberOfLines={2}>
              {data.name.slice(0, 15)}..
            </Text>
            <View style={styles.priceView}>{getPrice(data)}</View>
          </View>

          {data.new && data.stockStatus != "Out of stock" && (
            <View style={GlobalStyles.newtextView}>
              <Text style={GlobalStyles.newTxt}>New</Text>
            </View>
          )}
          {wishlistArr &&
          wishlistArr.length > 0 &&
          wishlistArr.includes(data.id) ? (
            <TouchableOpacity
              style={GlobalStyles.FavCircle}
              onPress={() => props.addToWishlist(data.id)}
            >
              <Icon
                name="heart"
                style={GlobalStyles.FavIcon}
                color={Colors.white}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={GlobalStyles.unFavCircle}
              onPress={() => props.addToWishlist(data.id)}
            >
              <Icon
                name="heart-o"
                style={GlobalStyles.unFavIcon}
                color={Colors.secondry_text_color}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}
    </>
  );
}

export default DealsProductView;

const styles = StyleSheet.create({
  productBox: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: wp("100%"),
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: "column",
  },
  imageView: {
    flex: 0.6,
    backgroundColor: Colors.light_white,
    width: wp("42.2%"),
    borderTopStartRadius: wp("2%"),
    borderTopEndRadius: wp("2%"),
  },
  image: {
    resizeMode: "contain",
    alignSelf: "center",
    height: hp("16%"),
    width: wp("30%"),
  },
  infromationView: {
    flex: 0.4,
    width: wp("35%"),
  },
  starView: {
    alignItems: "flex-start",
    marginVertical: hp("0.6%"),
  },
  myStarStyle: {
    color: "#ffd12d",
    backgroundColor: "transparent",
    marginHorizontal: 1,
    textShadowRadius: 1,
  },
  myEmptyStarStyle: {
    color: "gray",
  },
  productName: {
    color: Colors.secondry_text_color,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.5%"),
  },
  priceView: {
    flex: 1,
    marginTop: hp("0.6%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SpcialView: {
    flex: 0.3,
    flexDirection: "row",
  },
  price: {
    color: Colors.black,
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("4%"),
  },
  originalPrice: {
    color: Colors.secondry_text_color,
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("3%"),
    textDecorationLine: "line-through",
  },
  offerTxt: {
    flex: 0.7,
    textAlign: "right",
    color: Colors.link_color,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("2.8%"),
    textTransform: "uppercase",
  },

  offerTxt2: {
    textAlign: "right",
    color: "white",
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("2%"),
  },
  offertxt2Container: {
    padding: 3,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: "#ff8084",
    borderRadius: 5,
  },
});
