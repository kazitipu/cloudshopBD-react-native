import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { scale } from "react-native-size-matters";

import { connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
    marginBottom: scale(14),
  },
  shop: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {},
  viewMore: {
    marginVertical: scale(14),
    paddingVertical: scale(10),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: "center",
    borderColor: "gray",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  space: {
    marginTop: scale(14),
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "gainsboro",
    borderBottomWidth: 1,
    paddingTop: 0,
    paddingBottom: 14,
  },
  trackButton: {
    color: "white",
    backgroundColor: "#ff4c3b",
    borderRadius: 5,
    padding: 5,
  },
});

const STATUS_COLOR = Object.freeze({
  completed: "primary",
  "to pay": "blue",
  "to ship": "green",
  "to receive": "gray75",
  cancelled: "tertiary",
  refund: "primaryAlt",
});

const OrderItem = ({
  order,
  visibleProducts,
  navigation,
  orders,
  currency,
}) => {
  console.log(order);

  const getSingleShopTotal = (shop) => {
    let total = 0;
    shop.items.map((item) => {
      item.skus.map((sku) => {
        total +=
          parseInt(sku.price) *
          parseInt(sku.totalQuantity) *
          parseFloat(currency.taka);
      });
    });
    return total;
  };
  return <View>Order Item</View>;
};

const mapStateToProps = (state) => {
  return {
    currency: 0,
  };
};
export default connect(mapStateToProps, {})(OrderItem);
