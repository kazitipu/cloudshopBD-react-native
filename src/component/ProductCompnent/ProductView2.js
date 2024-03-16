import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { GlobalStyles, Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Fonts from "@helpers/Fonts";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/FontAwesome";
import { _roundDimensions } from "@helpers/util";
import {
  addToWishlistRedux,
  removeFromWishlistRedux,
  setSpinnerRedux,
  updateSingleProductRedux,
} from "../../redux/Action";
import { connect } from "react-redux";
import Toast from "react-native-simple-toast";
function ProductView2(props) {
  const data = props.data;

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
    <TouchableOpacity
      style={styles.productBox}
      onPress={() => props.navToDetail(data)}
    >
      <View
        style={[
          styles.imageView,
          {
            backgroundColor: props.imageViewBg
              ? props.imageViewBg
              : Colors.light_white,
          },
        ]}
      >
        <Image
          source={{ uri: `${data.pictures[0]}` }}
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.infromationView}>
        {/* <View style={styles.starView}>
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
        </View> */}
        <Text style={styles.productName} numberOfLines={2}>
          {data.name.slice(0, 12)}...
        </Text>
        <View style={styles.priceView}>{getPrice(data)}</View>
      </View>
      {data.stockStatus == "Out of stock" && (
        <View style={styles.outstockview}>
          <Text style={styles.outofstockTxt}>Out of stock</Text>
        </View>
      )}
      {data.new && data.stockStatus != "Out of stock" && (
        <View style={styles.newtextView}>
          <Text style={styles.newTxt}>New</Text>
        </View>
      )}
      {props.wishlist &&
      props.wishlist.length > 0 &&
      props.wishlist.find((wish) => wish.id == data.id) ? (
        <TouchableOpacity
          style={styles.FavCircle}
          onPress={async () => {
            if (props.currentUser && props.currentUser.uid) {
              let wishlistObj = data;

              props.setSpinnerRedux(true);
              await props.removeFromWishlistRedux(
                wishlistObj,
                props.currentUser
              );
              await props.updateSingleProductRedux({
                ...data,
                wishlist: data.wishlist ? data.wishlist - 1 : 0,
              });
              props.setSpinnerRedux(false);
              Toast.show("item removed from wishlist.");
            } else {
              Toast.show("Please login first");
            }
          }}
        >
          <Icon name="heart" style={styles.unFavIcon} color={Colors.white} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.unFavCircle}
          onPress={async () => {
            if (props.currentUser && props.currentUser.uid) {
              let wishlistObj = data;

              props.setSpinnerRedux(true);
              await props.addToWishlistRedux(wishlistObj, props.currentUser);
              await props.updateSingleProductRedux({
                ...data,
                wishlist: data.wishlist ? data.wishlist + 1 : 1,
              });
              props.setSpinnerRedux(false);
              Toast.show("item added to wishlist.");
            } else {
              Toast.show("Please login first to add item into wishlist.");
            }
          }}
        >
          <Icon
            name="heart-o"
            style={styles.unFavIcon}
            color={Colors.secondry_text_color}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist.wishlist,
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps, {
  addToWishlistRedux,
  removeFromWishlistRedux,
  setSpinnerRedux,
  updateSingleProductRedux,
})(ProductView2);

const styles = StyleSheet.create({
  productBox: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
    maxWidth: wp("100%"),
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: "column",
  },
  imageView: {
    flex: 0.6,
    backgroundColor: Colors.light_white,

    width: wp("28.2%"),
    borderTopStartRadius: wp("2%"),
    borderTopEndRadius: wp("2%"),
  },
  image: {
    resizeMode: "contain",
    alignSelf: "center",
    height: hp("14%"),
    width: wp("20%"),
  },
  infromationView: {
    flex: 0.4,
    width: wp("25%"),
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
    fontSize: wp("3%"),
  },
  priceView: {
    flex: 1,
    marginTop: hp("0.6%"),
    flexDirection: "row",
  },
  price: {
    flex: 0.5,
    color: Colors.black,
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("3.2%"),
  },
  offerTxt: {
    textAlign: "right",
    color: Colors.link_color,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("2.5%"),
    textDecorationLine: "line-through",
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

  outstockview: {
    backgroundColor: Colors.red,
    padding: wp("0.5%"),
    width: wp("15%"),
    position: "absolute",
    top: hp("1%"),
    justifyContent: "center",
    alignItems: "center",
    left: wp("1.7%"),
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    borderRadius: wp("1%"),
    elevation: 3,
  },
  outofstockTxt: {
    color: Colors.white,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("2%"),
    textAlign: "center",
  },
  newtextView: {
    backgroundColor: Colors.white,
    padding: wp("0.6%"),
    width: wp("10%"),
    position: "absolute",
    top: hp("1%"),
    left: wp("1.7%"),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    borderRadius: wp("1%"),
    elevation: 3,
  },
  newTxt: {
    color: Colors.text_color,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("2.3%"),
    textAlign: "center",
  },

  unFavCircle: {
    backgroundColor: Colors.white,
    height: _roundDimensions()._height * 0.03,
    width: _roundDimensions()._height * 0.03,
    borderRadius: _roundDimensions()._borderRadius,
    position: "absolute",
    top: hp(".4%"),
    left: wp("20%"),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  FavCircle: {
    backgroundColor: Colors.themeColor,
    height: _roundDimensions()._height * 0.026,
    width: _roundDimensions()._height * 0.026,
    borderRadius: _roundDimensions()._borderRadius,
    position: "absolute",
    top: hp(".4%"),
    left: wp("20%"),
    justifyContent: "center",
    alignItems: "flex-end",
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  unFavIcon: {
    fontWeight: "600",
    fontSize: wp("3%"),
  },
});
