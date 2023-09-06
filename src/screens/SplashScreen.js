import React, { useEffect } from "react";
import {
  View,
  Animated,
  Easing,
  LogBox,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import { requestInit } from "@actions";
import { splashlogo } from "@common";
import { OtrixContainer } from "@component";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, GlobalStyles } from "@helpers";

const animatedValue = new Animated.Value(0);

function SplashScreen(props) {
  const navigateToMain = () => {
    let navTo = setTimeout(
      () =>
        props.loadApplication &&
        props.navigation.reset({
          index: 0,
          routes: [{ name: props.navScreen }],
        }),
      300
    );

    return () => {
      clearTimeout(navTo);
    };
  };

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true, // Add this line
    }).start();

    let loadApp = setTimeout(() => props.requestInit(), 1500);

    return () => {
      clearTimeout(loadApp);
    };
  }, [navigateToMain()]);

  return (
    <>
      <StatusBar backgroundColor={"#ED365A"} barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ED365A" }}>
        <View style={[GlobalStyles.mainView]}>
          <View style={{ backgroundColor: "#ED365A", flex: 1 }}>
            <Image
              source={splashlogo}
              resizeMode="contain"
              style={{
                position: "absolute",
                left: wp("25%"),
                top: hp("20%"),
                height: hp("50%"),
                width: wp("50%"),
                // transform: [
                //   {
                //     translateX: animatedValue.interpolate({
                //       inputRange: [0, 1],
                //       outputRange: [0, 32],
                //     }),
                //   },
                //   {
                //     translateY: animatedValue.interpolate({
                //       inputRange: [0, 1],
                //       outputRange: [0, 150],
                //     }),
                //   },
                //   {
                //     scaleX: animatedValue.interpolate({
                //       inputRange: [0, 1],
                //       outputRange: [1, 8],
                //     }),
                //   },
                //   {
                //     scaleY: animatedValue.interpolate({
                //       inputRange: [0, 1],
                //       outputRange: [1, 10],
                //     }),
                //   },
                // ],
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const mapStateToProps = (state) => ({
  loadApplication: state.mainScreenInit.loadApplication,
  navScreen: state.mainScreenInit.navScreen,
});

export default connect(mapStateToProps, { requestInit })(SplashScreen);
