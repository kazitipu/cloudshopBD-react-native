import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { OtrixContainer, OtrixContent, OtrixDivider } from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import {
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  doLogout,
  setSpinnerRedux,
} from "@actions";
import { avatarImg } from "@common";
import Fonts from "@helpers/Fonts";
import Icon from "react-native-vector-icons/FontAwesome5";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Toast from "react-native-simple-toast";
import auth from "@react-native-firebase/auth";
import { avatarImg2 } from "../common/config";
import LoginScreen from "./LoginScreen";
import { useIsFocused } from "@react-navigation/native";

function ProfileScreen(props) {
  const [state, setState] = React.useState({ profileImage: "" });
  const focused = useIsFocused();
  useEffect(() => {
    if (props.currentUser && !props.currentUser.uid) {
      Toast.show("Please login to account to access.");
    }
  }, []);

  const openImagePicker = async (res) => {
    setState({
      ...state,
      profileImage: res.assets[0]["uri"],
    });
  };

  const { profileImage } = state;
  console.log("RES ", profileImage);

  return (
    <>
      {props.currentUser && props.currentUser.uid ? (
        <OtrixContainer customStyles={{ backgroundColor: "#ec345b" }}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.imageView} onPress={() => {}}>
              {profileImage != "" ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.image}
                ></Image>
              ) : (
                <Image source={avatarImg2} style={styles.image}></Image>
              )}
            </TouchableOpacity>
            <OtrixDivider size={"sm"} />
            <Text style={styles.username}>
              {props.currentUser && props.currentUser.displayName}
            </Text>
            {props.currentUser && props.currentUser.email && (
              <Text style={styles.email}>{props.currentUser.email}</Text>
            )}
            {props.currentUser && props.currentUser.mobileNumber && (
              <Text style={styles.email}>{props.currentUser.mobileNumber}</Text>
            )}
          </View>

          {/* Header */}

          {/* Content Start from here */}
          <OtrixContent customStyles={styles.contentView}>
            <OtrixDivider size={"lg"} />

            <TouchableOpacity
              style={styles.listView}
              onPress={() => props.navigation.navigate("EditProfileScreen")}
            >
              <View style={[styles.leftSide, { left: wp("1%") }]}>
                <Icon name="user-edit" style={styles.icon} />
              </View>
              <View style={styles.center}>
                <Text style={styles.listTitle}>Edit Profile</Text>
              </View>
              <View style={styles.rightSide}>
                <MatIcon name="arrow-forward-ios" style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listView}
              onPress={() => props.navigation.navigate("ManageAddressScreen")}
            >
              <View style={styles.leftSide}>
                <Icon
                  name="address-book"
                  style={[styles.icon, { fontSize: wp("5.4%") }]}
                />
              </View>
              <View style={styles.center}>
                <Text style={styles.listTitle}>Manage Address</Text>
              </View>
              <View style={styles.rightSide}>
                <MatIcon name="arrow-forward-ios" style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listView}
              onPress={() => props.navigation.navigate("WishlistScreen")}
            >
              <View style={styles.leftSide}>
                <Fontisto name="heart" style={styles.icon} />
              </View>
              <View style={styles.center}>
                <Text style={styles.listTitle}>Wishlist</Text>
              </View>
              <View style={styles.rightSide}>
                <MatIcon name="arrow-forward-ios" style={styles.rightIcon} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listView}
              onPress={() => props.navigation.navigate("OrderScreen")}
            >
              <View style={styles.leftSide}>
                <Fontisto
                  name="shopping-bag-1"
                  style={[styles.icon, { fontSize: wp("5.4%") }]}
                />
              </View>
              <View style={styles.center}>
                <Text style={styles.listTitle}>My Orders</Text>
              </View>
              <View style={styles.rightSide}>
                <MatIcon name="arrow-forward-ios" style={styles.rightIcon} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listView}
              onPress={async () => {
                props.setSpinnerRedux(true);
                await auth()
                  .signOut()
                  .then(() => {
                    Toast.show("Successfully Loggged out!"),
                      props.navigation.navigate("HomeScreen");
                  });
                props.setSpinnerRedux(false);
              }}
            >
              <View style={styles.leftSide}>
                <AntDesign name="logout" style={styles.icon} />
              </View>
              <View style={styles.center}>
                <Text style={styles.listTitle}>Logout</Text>
              </View>
              <View style={styles.rightSide}>
                <MatIcon name="arrow-forward-ios" style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
          </OtrixContent>
        </OtrixContainer>
      ) : (
        <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{ color: "gray", fontSize: wp("3.7%"), marginBottom: 10 }}
            >
              Please Login to account first
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "#ec345b",
                borderRadius: 5,
              }}
              onPress={() => {
                props.navigation.navigate("LoginScreen");
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Login now
              </Text>
            </TouchableOpacity>
          </View>
        </OtrixContainer>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
    currentUser: state.auth.currentUser,
  };
}

export default connect(mapStateToProps, {
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  doLogout,
  setSpinnerRedux,
})(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    height: hp("25%"),
    position: "relative",
    backgroundColor: "#ec345b",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 99,
    marginBottom: hp("4%"),
  },
  imageView: {
    justifyContent: "center",
    backgroundColor: "#ec345b",
    alignItems: "center",
    height: hp("11%"),
    width: wp("23%"),
  },

  image: {
    resizeMode: "contain",
    height: undefined,
    aspectRatio: 1,
    width: wp("20%"),
    alignSelf: "center",
  },
  username: {
    color: "white",
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("4%"),
  },
  email: {
    color: "white",
    fontFamily: Fonts.Font_Regular,
    fontSize: wp("3.5%"),
    marginTop: hp("0.5%"),
  },
  contentView: {
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    borderTopRightRadius: wp("13%"),
    borderTopLeftRadius: wp("13%"),
  },
  listView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp("1%"),
  },
  leftSide: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp("2%"),
    flex: 0.1,
  },
  center: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 0.8,
    padding: 10,
    marginHorizontal: wp("3%"),
  },
  rightSide: {
    flex: 0.1,
  },
  listTitle: {
    color: Colors.text_color,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.8%"),
  },
  icon: {
    fontSize: wp("5.5%"),
    color: Colors.secondry_text_color,
  },
  rightIcon: {
    fontSize: wp("3.5%"),
    color: Colors.secondry_text_color,
  },
});
