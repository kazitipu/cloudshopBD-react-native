import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";

import { scale } from "react-native-size-matters";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "./Button";

const styles = StyleSheet.create({
  footer: {
    padding: scale(14),
  },
});

const BottomSheet = ({
  children,
  sheetRef,
  buttonText,
  onPress,
  height,
  ...otherProps
}) => {
  const onButtonPress = () => {
    sheetRef.current.close();
    if (onPress) {
      onPress();
    }
  };

  return (
    <RBSheet
      closeOnDragDown={false}
      height={height}
      ref={sheetRef}
      {...otherProps}
    >
      {children}
    
    </RBSheet>
  );
};

BottomSheet.defaultProps = {
  buttonText: null,
  onPress: null,
  height: hp("60%"),
};

export default BottomSheet;
