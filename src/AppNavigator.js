import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Image, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import {
  SplashScreen,
  HomeScreen,
  SettingScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  CategoryScreen,
  HomeCartScreen,
  ProfileScreen,
  ProductListScreen,
  ProductDetailScreen,
  CheckoutScreen,
  EditProfileScreen,
  ChangePasswordScreen,
  ManageAddressScreen,
  AddAddressScreen,
  WishlistScreen,
  OrderScreen,
  OrderDetailScreen,
  LanguageScreen,
  TermsandconditionScreen,
  PrivacyPolicyScreen,
  NotificationScreen,
  SearchScreen,
} from "./screens/index";
import {
  bottomHome,
  bottomHomeFill,
  bottomCategory,
  bottomCategoryFill,
  bottomCart,
  bottomProfile,
  bottomProfileFill,
  bottomSetting,
  bottomSettingFill,
} from "@common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, GlobalStyles } from "@helpers";
import { Badge } from "native-base";
import Fonts from "./helpers/Fonts";
import { _roundDimensions } from "./helpers/util";
import {
  setCurrentUserRedux,
  setAdditionalDataRedux,
  setReduxCart,
  setReduxWishlist,
  setFreeShippingRedux,
  saveDeviceTokenRedux,
} from "./redux/Action";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  createUserProfileDocument,
  getFreeShipping,
} from "./firebase/firebase.utils";
import Spinner from "react-native-loading-spinner-overlay";
import messaging from "@react-native-firebase/messaging";
const SettingStack = createStackNavigator();
let cartCount = 0;

function SettingStackNavigation() {
  return (
    <SettingStack.Navigator initialRouteName="SettingScreen">
      <SettingStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </SettingStack.Navigator>
  );
}

//Auth Stack
const AuthStack = createStackNavigator();

const BottomTab = createBottomTabNavigator();
function MyTabs(props) {
  let cartCount = props.cartCounts;
  let authStatus = props.auth;
  console.log(props);
  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      backBehavior={"order"}
      screenOptions={{
        tabBarStyle: { position: "absolute" },
        unmountOnBlur: true,
        tabBarShowLabel: false,
        lazy: true,
        tabBarStyle: styles.tabbarStyle,
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forScaleFromCenterAndroid,
          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              square
              source={focused ? bottomHomeFill : bottomHome}
              style={[styles.bottomTabIcon]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              square
              source={focused ? bottomCategoryFill : bottomCategory}
              style={[styles.bottomTabIcon]}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              square
              source={focused ? bottomProfileFill : bottomProfile}
              style={[styles.bottomTabIcon]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="SettingScreen"
        component={SettingStackNavigation}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              square
              source={focused ? bottomSettingFill : bottomSetting}
              style={[styles.bottomTabIcon]}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const Stack = createStackNavigator();
function AppNavigator(props) {
  const { cartCount, authStatus, currentUser } = props;
  const [initializing, setInitializing] = useState(true);

  const [user, setUser] = useState();
  console.log(props.additionalData);
  // Handle user state changes
  const additionalData = props.additionalData;
  const onAuthStateChanged = async (user) => {
    console.log(additionalData);
    let data = await getFreeShipping();
    props.setFreeShippingRedux(data.value);
    if (user) {
      const userRef = await createUserProfileDocument(user, additionalData);

      if (userRef) {
        userRef.onSnapshot(async (snapShot) => {
          await props.setCurrentUserRedux({
            id: snapShot.id,
            ...snapShot.data(),
          });
          // props.setAdditionalDataRedux({});
          requestUserPermission({ id: snapShot.id, ...snapShot.data() });
        });
        const cartRef = firestore().doc(`carts/${user.uid}`);
        cartRef.onSnapshot((snapShot) => {
          if (snapShot.exists) {
            props.setReduxCart(snapShot.data().cart);
          }
        });
        // const favouriteRef = firestore.doc(`favourites/${userAuth.uid}`);
        // favouriteRef.onSnapshot((snapShot) => {
        //   if (snapShot.exists) {
        //     setReduxFavourite(snapShot.data().favourite);
        //   }
        // });
        // const footPrintRef = firestore.doc(`footPrints/${userAuth.uid}`);
        // footPrintRef.onSnapshot((snapShot) => {
        //   if (snapShot.exists) {
        //     setReduxFootPrint(snapShot.data().footPrint);
        //   }
        // });
        const wishlistRef = firestore().doc(`wishlists/${user.uid}`);
        wishlistRef.onSnapshot((snapShot) => {
          if (snapShot.exists) {
            props.setReduxWishlist(snapShot.data().wishlist);
          }
        });
        // await getAllMessagesRedux(userAuth.uid);
      }
    } else {
      props.setCurrentUserRedux({ displayName: "", email: "" });
      // props.setAdditionalDataRedux({});
      setReduxCart([]);
      // setReduxFavourite([]);
      // setReduxFootPrint([]);
      props.setReduxWishlist([]);
    }

    if (initializing) setInitializing(false);
  };

  const requestUserPermission = async (user) => {
    if (Platform.OS === "ios") {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
        getDeviceToken(user);
      }
    } else {
      getDeviceToken(user);
    }
  };

  const getDeviceToken = async (user) => {
    let token = await messaging().getToken();
    if (token && user && user.id) {
      props.saveDeviceTokenRedux(user, token);
    }
    console.log(token);
  };

  let isLoggedIn = false;
  if (currentUser) {
    isLoggedIn = currentUser.id ? true : false;
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);
  const { spinner } = props;

  return (
    <>
      <Spinner
        visible={spinner}
        cancelable={true}
        color="white"
        overlayColor={"#00000077"}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            {...props}
            name="MainScreen"
            options={{ headerShown: false }}
          >
            {(props) => (
              <MyTabs
                cartCounts={cartCount}
                auth={authStatus}
                currentUser={currentUser}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="ProductListScreen"
            component={ProductListScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="HomeCartScreen"
            component={HomeCartScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="CheckoutScreen"
            component={CheckoutScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="ManageAddressScreen"
            component={ManageAddressScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="AddAddressScreen"
            component={AddAddressScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="WishlistScreen"
            component={WishlistScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="OrderScreen"
            component={OrderScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="OrderDetailScreen"
            component={OrderDetailScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="LanguageScreen"
            component={LanguageScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="TermsandconditionScreen"
            component={TermsandconditionScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="PrivacyPolicyScreen"
            component={PrivacyPolicyScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function mapStateToProps(state) {
  return {
    cartCount: state.cart.cartCount ? state.cart.cartCount : null,
    authStatus: state.auth.authStatus,
    currentUser: state.auth.currentUser,
    spinner: state.auth.spinner,
    additionalData: state.auth.additionalData,
  };
}

export default connect(mapStateToProps, {
  setCurrentUserRedux,
  setAdditionalDataRedux,
  setReduxCart,
  setReduxWishlist,
  setFreeShippingRedux,
  saveDeviceTokenRedux,
})(AppNavigator);

const styles = StyleSheet.create({
  bottomTabIcon: {
    height: wp("6%"),
    width: wp("6%"),
  },
  spinnerTextStyle: {
    color: "red",
  },
  tabbarStyle: {
    backgroundColor: Colors.white,
    height: Platform.isPad === true ? wp("10%") : wp("16%"),
    paddingTop: Platform.isPad == true ? 0 : wp("3%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 20,
  },
  cartIconView: {
    backgroundColor: Colors.light_white,
    height: _roundDimensions()._height * 0.068,
    width: _roundDimensions()._height * 0.068,
    borderRadius: _roundDimensions()._borderRadius,
    justifyContent: "center",
    alignItems: "center",
    bottom: hp("2.5%"),
  },
  count: {
    backgroundColor: Colors.white,
  },
  countText: {
    color: Colors.link_color,
    fontFamily: Fonts.Font_Bold,
  },
  spinnerTextStyle: {
    color: "#fff",
  },
});
