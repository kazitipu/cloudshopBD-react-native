import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../helpers/Colors";
import { scale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    padding: scale(12),
    alignItems: "center",
    borderRadius: scale(100),
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "100%",
  },
  ghost: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray25,
  },
  disabled: {
    backgroundColor: Colors.gray10,
    borderColor: Colors.gray10,
  },
  tiny: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
  },
});

const Button = ({
  children,
  label,
  variant,
  textColor,
  color,
  onPress,
  size,
}) => (
  <TouchableOpacity disabled={variant === "disabled"} onPress={onPress}>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#ff6d71", "#EC345B", "#ea0031"]}
      style={StyleSheet.flatten([styles.container])}
    >
      {children && children}
      {!children && label && (
        <Text style={{ color: "white", fontWeight: "bold" }}>{label}</Text>
      )}
    </LinearGradient>
  </TouchableOpacity>
);

export default Button;
