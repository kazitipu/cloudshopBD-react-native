import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { scale } from "react-native-size-matters";
import OrderItem from "./OrderItem";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
    flexGrow: 1,
  },
  icon: {
    position: "absolute",
    right: 25,
    top: 18,
  },
});

const OrderList = ({
  orders,
  navigation,
  visibleProducts,
  getAllOrdersApiRedux,
  currentUser,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { width, height } = Dimensions.get("window");

  const onRefreseh = async () => {
    console.log("on refresh is getting called!");
    setRefreshing(true);

    setRefreshing(false);
  };
  let ordersToShow = orders;
  if (searchText) {
    ordersToShow = orders.filter(
      (booking) =>
        (booking.trackingNo &&
          booking.trackingNo
            .toLowerCase()
            .includes(searchText.toLowerCase())) ||
        (booking.orderedDate &&
          booking.orderedDate
            .toLowerCase()
            .includes(searchText.toLowerCase())) ||
        (booking.orderNumber &&
          booking.orderNumber.toLowerCase().includes(searchText.toLowerCase()))
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["blue", "red"]}
        style={{
          padding: 0,
          paddingBottom: 10,
        }}
      >
        <TextInput
          type="text"
          name="searchText"
          value={searchText}
          onChangeText={(value) => setSearchText(value)}
          style={{
            height: 45,
            margin: "auto",
            maxWidth: width / 1.1,
            minWidth: width / 1.1,
            padding: 5,
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: "gainsboro",
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: "white",
            color: searchText ? "black" : "gray",
            alignSelf: "center",
            paddingLeft: 10,
          }}
          placeholder="Search Order"
          placeholderTextColor={"gray"}
        />
        <TouchableOpacity style={styles.icon}>
          <Icon name={"magnify"} size={30} color={"darkorange"} />
        </TouchableOpacity>
      </LinearGradient>

      <FlatList
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreseh} />
        }
        data={ordersToShow}
        keyExtractor={(data, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <OrderItem
            navigation={navigation}
            visibleProducts={visibleProducts}
            order={item}
            orders={ordersToShow}
            key={index}
          />
        )}
        ListEmptyComponent={null}
      />
    </View>
  );
};

OrderList.defaultProps = {
  visibleProducts: 2,
  orders: [],
};

const mapStateToProps = (state) => {
  return {
    currentUser: {},
  };
};
export default connect(mapStateToProps, {})(OrderList);
