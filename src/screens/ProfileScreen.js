import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
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
  updateUserRedux,
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
import ModalPoup from "./successModal";
import { uploadImageD2dExpressProduct } from "../firebase/firebase.utils";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Facebook from "../assets/social/facebook.png";
import Instagram from "../assets/social/instagram.png";
import Tiktok from "../assets/social/tiktok.png";
import Youtube from "../assets/social/youtube.png";
function ProfileScreen(props) {
  const [state, setState] = React.useState({
    image: require("../assets/images/plus.jpeg"),
    visible: false,
    imageUrl: "",
    imageLoading: false,
  });
  const focused = useIsFocused();
  useEffect(() => {
    if (props.currentUser && !props.currentUser.uid) {
      Toast.show("Please login first to access your account.");
    }
  }, []);

  const imageGalleryLaunch = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchImageLibrary(options, async (res) => {
      console.log("Response = ", res);
      if (res.didCancel) {
        setState({ ...state, visible: false });
        console.log("User cancelled image picker");
      } else if (res.error) {
        setState({ ...state, visible: false });
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        setState({ ...state, visible: false });
        console.log("User tapped custom button: ", res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.assets[0].uri };
        setState({
          ...state,
          image: source,
          fileName: res.assets[0].fileName,
          visible: false,
        });
        console.log(source);
        if (source.uri) {
          setState({ ...state, imageLoading: true });

          let response = await fetch(source.uri);
          let blob = await response.blob();
          let fileName2 = `${res.assets[0].fileName}${Date.now()}`;
          let imgUrl = await uploadImageD2dExpressProduct(blob, fileName2);
          console.log(imgUrl);
          setState({
            ...state,
            imageUrl: imgUrl,
            imageLoading: false,
            image: source,
            visible: false,
          });
          props.updateUserRedux({ ...props.currentUser, imageUrl: imgUrl });
        }
      }
    });
  };

  return (
    <>
      {props.currentUser && props.currentUser.uid ? (
        <OtrixContainer
          customStyles={{ backgroundColor: "#ec345b" }}
          statusBarColor={"#ec345b"}
          barStyle={"light-content"}
        >
          <ModalPoup visible={state.visible}>
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => setState({ ...state, visible: false })}
                >
                  <Image
                    source={require("../assets/images/x.png")}
                    style={{ height: 20, width: 20 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableWithoutFeedback
              onPress={() => {
                imageGalleryLaunch();
              }}
            >
              <View
                style={{
                  paddingVertical: 10,

                  alignItems: "center",
                  borderColor: "gainsboro",
                  borderTopWidth: 1,
                }}
              >
                <Text>Choose from Photos</Text>
              </View>
            </TouchableWithoutFeedback>
          </ModalPoup>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                if (state.imageLoading) {
                  return;
                }
                setState({ ...state, visible: true });
              }}
            >
              {props.currentUser.imageUrl ? (
                <View
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 40,
                  }}
                >
                  <Image
                    source={{ uri: props.currentUser.imageUrl }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 40,
                    }}
                  ></Image>
                </View>
              ) : (
                <Image source={avatarImg2} style={styles.image}></Image>
              )}
            </TouchableOpacity>
            <OtrixDivider size={"sm"} />
            <Text style={styles.username}>
              {props.currentUser ? props.currentUser.displayName : null}
            </Text>
            {props.currentUser && props.currentUser.email ? (
              <Text style={styles.email}>{props.currentUser.email}</Text>
            ) : null}
            {props.currentUser && props.currentUser.mobileNumber ? (
              <Text style={styles.email}>{props.currentUser.mobileNumber}</Text>
            ) : null}
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
          <View
            style={{
              position: "absolute",
              bottom: 5,
              left: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{ color: "black", fontSize: 11, fontWeight: "bold" }}
              >
                find us on
              </Text>
            </View>
            <View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={async () => {
                    let link = "https://www.facebook.com/cloudshopbdfb";
                    const supported = await Linking.canOpenURL(link);
                    console.log(supported);
                    // if (supported) {
                    await Linking.openURL(link);
                    // } else {
                    //   Toast.show("facebook not installed!");
                    // }
                  }}
                >
                  <Image
                    source={require("../assets/social/facebook.png")}
                    style={{
                      height: 32,
                      width: 32,
                      marginLeft: -5,
                    }}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    let link = "https://www.youtube.com/@cloudshopbd35/videos";
                    const supported = await Linking.canOpenURL(link);
                    console.log(supported);
                    // if (supported) {
                    await Linking.openURL(link);
                    // } else {
                    //   Toast.show("facebook not installed!");
                    // }
                  }}
                >
                  <Image
                    source={require("../assets/social/youtube.png")}
                    style={{
                      height: 30,
                      width: 30,
                      marginLeft: 5,
                    }}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    let link = "https://www.tiktok.com/@cloudshopbd.com";
                    const supported = await Linking.canOpenURL(link);
                    console.log(supported);
                    // if (supported) {
                    await Linking.openURL(link);
                    // } else {
                    //   Toast.show("facebook not installed!");
                    // }
                  }}
                >
                  <Image
                    source={require("../assets/social/tiktok.png")}
                    style={{
                      height: 30,
                      width: 30,
                      marginLeft: 5,
                    }}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    let link = "https://www.instagram.com/cloud_shop_bd";
                    const supported = await Linking.canOpenURL(link);
                    console.log(supported);
                    // if (supported) {
                    await Linking.openURL(link);
                    // } else {
                    //   Toast.show("facebook not installed!");
                    // }
                  }}
                >
                  <Image
                    source={require("../assets/social/instagram.png")}
                    style={{
                      height: 30,
                      width: 30,
                      marginLeft: 5,
                    }}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  updateUserRedux,
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
