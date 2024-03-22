import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { scale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../../helpers/Colors";
import { widthPercentageToDP } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray50,
    borderRadius: scale(4),
    marginTop: 5,
  },
  pill: {
    paddingVertical: scale(3),
    paddingHorizontal: scale(4),
    backgroundColor: "#ff8084",
  },
  left: {
    borderTopLeftRadius: scale(4),
    borderBottomLeftRadius: scale(4),
  },
  right: {
    borderTopRightRadius: scale(4),
    borderBottomRightRadius: scale(4),
  },
  value: {
    paddingVertical: scale(3),
    paddingHorizontal: scale(1),
    minWidth: widthPercentageToDP("7%"),
    maxWidth: widthPercentageToDP("7%"),
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray50,
  },
});

const Pill = ({
  sku,
  decrementQuantity,
  incrementQuantity,
  skus,
  quantity,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          decrementQuantity();
        }}
      >
        <View style={[styles.pill, styles.left]}>
          <Icon name="minus" color={"white"} style={{ fontWeight: "bold" }} />
        </View>
      </TouchableOpacity>
      <View style={styles.value}>
        <Text
          style={{
            fontSize: widthPercentageToDP("2.5%"),
            textAlign: "center",
            color: "black",
          }}
        >
          {quantity}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          incrementQuantity();
        }}
      >
        <View style={[styles.pill, styles.right]}>
          <Icon name="plus" color={"white"} style={{ fontWeight: "bold" }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

Pill.defaultProps = {
  initialValue: 0,
  min: -1,
  max: -1,
};

export default Pill;
