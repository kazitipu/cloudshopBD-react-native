import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  HomeSlider,
  HomeCategoryView,
  SearchBar,
  NewProduct,
  NewProduct2,
  TrendingProduct,
  LatestProducts,
} from "@component";
import { HomeSkeleton } from "@skeleton";
import { addToWishList } from "@actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, GlobalStyles } from "@helpers";
import { Avatar, Badge } from "native-base";
import {
  heart,
  offerBanner,
  avatarImg,
  avatarImg2,
  cloudshopBD,
} from "@common";
import Fonts from "@helpers/Fonts";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { _roundDimensions } from "@helpers/util";
import { _addToWishlist, logfunction } from "@helpers/FunctionHelper";
import { getAllHomeScreenCategoriesRedux } from "../redux/Action";
import { bottomCart, checkround2, close } from "@common";
function HomeScreen(props) {
  const [state, setState] = React.useState({
    notificationCount: 9,
    loading: true,
  });

  const addToWish = async (id) => {
    let wishlistData = await _addToWishlist(id);
    props.addToWishList(wishlistData);
  };

  useEffect(() => {
    let loadHomePage = setTimeout(
      () => setState({ ...state, loading: false }),
      300
    );
    return () => {
      clearTimeout(loadHomePage);
    };
  }, []);
  useEffect(() => {
    props.getAllHomeScreenCategoriesRedux();
  }, []);

  const { loading } = state;
  const {
    authStatus,
    wishlistData,
    wishlistCount,
    banners,
    homeCategories,
    cartData,
  } = props;
  const firstCategories = homeCategories
    .filter((category) => category.homePosition < 4)
    .sort((a, b) => Number(a.homePosition) - Number(b.homePosition));
  const secondCategories = homeCategories
    .filter((category) => category.homePosition > 3)
    .sort((a, b) => Number(a.homePosition) - Number(b.homePosition));
  return (
    <OtrixContainer customStyles={{ backgroundColor: Colors.white }}>
      {/* Header */}
      <OtrixHeader customStyles={{ backgroundColor: Colors.white }}>
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={() => {
            if (props.currentUser && props.currentUser.uid) {
              props.navigation.navigate("ProfileScreen");
            } else {
              props.navigation.navigate("LoginScreen");
            }
          }}
        >
          {props.currentUser && props.currentUser.uid ? (
            <Avatar
              ml="3"
              size="sm"
              style={styles.avatarImg}
              source={avatarImg2}
            ></Avatar>
          ) : (
            <View
              style={{
                borderWidth: 1,
                borderRadius: 7,
                borderStyle: "solid",
                paddingLeft: 6,
                paddingRight: 6,
                paddingTop: 4,
                paddingBottom: 4,
                borderColor: "red",
                marginLeft: 3,
              }}
            >
              <Text style={{ fontSize: wp("2.7%"), color: "red" }}>Login</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image source={cloudshopBD} style={styles.cloudshopBDIcon}></Image>
        </View>

        {!loading && (
          <View
            style={[
              GlobalStyles.headerRight,
              {
                zIndex: 999999999,
                flex: 0.3,
                backgroundColor: "transparent",
                alignItems: "flex-end",
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.FavCircle, { left: wp("8%"), top: 0 }]}
            >
              <FontAwesomeIcon
                name="heart"
                style={{ ...GlobalStyles.FavIcon, fontSize: wp("3.8%") }}
                color={Colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ alignSelf: "flex-end", marginBottom: -6 }}
              onPress={() => props.navigation.navigate("HomeCartScreen")}
            >
              <Image source={bottomCart} style={styles.menuImage} />

              <Badge
                style={[
                  GlobalStyles.badge,
                  {
                    left: wp("4.4%"),
                    top: hp(".5%"),
                    height: cartData.length > 9 ? 30 : 24,
                    width: cartData.length > 9 ? 30 : 24,
                    backgroundColor: "#ffe0e1",
                  },
                ]}
              >
                <Text
                  style={[
                    GlobalStyles.badgeText,
                    {
                      color: Colors.themeColor,
                      fontSize: cartData.length > 9 ? wp("2.5%") : wp("3%"),
                    },
                  ]}
                >
                  {cartData.length}
                </Text>
              </Badge>
            </TouchableOpacity>
          </View>
        )}
      </OtrixHeader>

      {loading ? (
        <HomeSkeleton />
      ) : (
        <OtrixContent>
          {/* SearchBar Component */}
          <SearchBar navigation={props.navigation} />

          {/* HomeCategoryView Component */}
          <HomeCategoryView navigation={props.navigation} />
          {/* HomeSlider Component */}
          <HomeSlider />
          <OtrixDivider size={"md"} />

          {/* NewProduct Component */}
          {firstCategories.map((category, index) => (
            <NewProduct2
              key={category.id}
              navigation={props.navigation}
              wishlistArr={wishlistData}
              addToWishlist={addToWish}
              category={category}
            />
          ))}

          {/* Banner Image */}
          {banners.length > 0 && banners.find((banner) => banner.secondBanner) && (
            <Image
              source={{
                uri: banners.find((banner) => banner.secondBanner).banner,
              }}
              style={styles.bannerStyle}
            />
          )}
          <OtrixDivider size={"sm"} />
          {secondCategories.map((category, index) => (
            <NewProduct2
              key={category.id}
              navigation={props.navigation}
              wishlistArr={wishlistData}
              addToWishlist={addToWish}
              category={category}
            />
          ))}

          {/*Latest Products Component */}
          <LatestProducts
            navigation={props.navigation}
            wishlistArr={wishlistData}
            addToWishlist={addToWish}
          />
          <OtrixDivider size={"sm"} />

          {/* TrendingProduct Component */}
        </OtrixContent>
      )}
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    authStatus: state.auth.authStatus,
    wishlistData: state.wishlist.wishlistData,
    wishlistCount: state.wishlist.wishlistCount,
    banners: state.mainScreenInit.banners,
    homeCategories: state.mainScreenInit.homeCategories,
    currentUser: state.auth.currentUser,
    cartData: state.cart.cartData,
  };
}

export default connect(mapStateToProps, {
  addToWishList,
  getAllHomeScreenCategoriesRedux,
})(HomeScreen);

const styles = StyleSheet.create({
  FavCircle: {
    backgroundColor: "#ffdcde",
    height: _roundDimensions()._height * 0.032,
    width: _roundDimensions()._height * 0.032,
    borderRadius: _roundDimensions()._borderRadius,
    position: "absolute",
    top: hp("1.2%"),
    left: wp("32%"),
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
    marginTop: 5,
  },
  menuImage: {
    width: wp("6%"),
    height: hp("6%"),
    resizeMode: "contain",
    tintColor: Colors.themeColor,
  },
  headerRight: {
    marginRight: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
  },
  heartIcon: {
    width: wp("6.5%"),
    height: hp("6.5%"),
    resizeMode: "contain",
    tintColor: Colors.custom_pink,
  },
  cloudshopBDIcon: {
    width: wp("65%"),
    height: wp("20%"),
    resizeMode: "cover",
    marginLeft: 20,
  },
  headerCenter: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 0.6,
    marginLeft: wp("18%"),
  },
  headingTxt: {
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("6.5%"),
    color: Colors.themeColor,
  },
  headerLeft: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 0.1,
    marginLeft: 10,
  },
  bannerStyle: {
    resizeMode: "contain",
    width: wp("100%"),
    height: hp("16%"),
    alignSelf: "center",
  },
  avatarImg: {
    height: wp("6%"),
    width: wp("6%"),
    resizeMode: "contain",
    borderColor: "red",
    borderWidth: 1,
  },
});
