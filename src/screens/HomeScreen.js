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
import { _roundDimensions } from "@helpers/util";
import { _addToWishlist, logfunction } from "@helpers/FunctionHelper";
import { getAllHomeScreenCategoriesRedux } from "../redux/Action";

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
  const { authStatus, wishlistData, wishlistCount, banners, homeCategories } =
    props;
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
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 4,
                paddingBottom: 4,
                borderColor: "red",
              }}
            >
              <Text style={{ fontSize: wp("3%"), color: "red" }}>Login</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image source={cloudshopBD} style={styles.cloudshopBDIcon}></Image>
        </View>

        {!loading && (
          <TouchableOpacity
            style={styles.headerRight}
            onPress={() => props.navigation.navigate("WishlistScreen")}
          >
            <Image source={heart} style={styles.heartIcon}></Image>
            {wishlistCount > 0 && (
              <Badge
                style={[
                  GlobalStyles.badge,
                  {
                    height:
                      wishlistCount > 9
                        ? _roundDimensions()._height * 0.038
                        : _roundDimensions()._height * 0.032,
                    width:
                      wishlistCount > 9
                        ? _roundDimensions()._height * 0.038
                        : _roundDimensions()._height * 0.032,
                    borderRadius: _roundDimensions()._borderRadius,
                    right: wishlistCount > 9 ? -wp("0.6%") : wp("0.2%"),
                    top: wishlistCount > 9 ? -hp("0.5%") : hp("0.1%"),
                  },
                ]}
              >
                <Text
                  style={[
                    GlobalStyles.badgeText,
                    styles.countText,
                    { fontSize: wishlistCount > 9 ? wp("2.2%") : wp("3%") },
                  ]}
                >
                  {wishlistCount}
                </Text>
              </Badge>
            )}
          </TouchableOpacity>
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
  };
}

export default connect(mapStateToProps, {
  addToWishList,
  getAllHomeScreenCategoriesRedux,
})(HomeScreen);

const styles = StyleSheet.create({
  headerRight: {
    flex: 0.15,
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
    height: hp("6.5%"),
    resizeMode: "cover",
    marginLeft: 20,
  },
  headerCenter: {
    flex: 0.75,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  headingTxt: {
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("6.5%"),
    color: Colors.themeColor,
  },
  headerLeft: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  bannerStyle: {
    resizeMode: "contain",
    width: wp("100%"),
    height: hp("16%"),
    alignSelf: "center",
  },
  avatarImg: {
    height: hp("7%"),
    width: wp("7%"),
    resizeMode: "contain",
    borderColor: "red",
    borderWidth: 1,
  },
});
