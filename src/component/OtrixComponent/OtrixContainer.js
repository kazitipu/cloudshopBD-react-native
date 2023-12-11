import React from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { GlobalStyles, Colors } from "@helpers";

function OtrixContainer(props) {
  return (
    <>
      <StatusBar
        backgroundColor={props.statusBarColor ? props.statusBarColor : "white"}
        barStyle={props.barStyle ? props.barStyle : "dark-content"}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.light_white,
          ...props.customStyles,
        }}
      >
        <View style={[GlobalStyles.mainView, props.customStyles]}>
          {props.children}
        </View>
      </SafeAreaView>
    </>
  );
}

export default OtrixContainer;
