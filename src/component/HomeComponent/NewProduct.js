import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { GlobalStyles, Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NewProductDummy from "../items/NewProductDummy";
import OtrixDivider from "../OtrixComponent/OtrixDivider";
import ProductView from "../ProductCompnent/ProductView2";
import { logfunction } from "@helpers/FunctionHelper";
const { width: screenWidth } = Dimensions.get("window");
function NewProduct(props) {
  const navigateToDetailPage = (data) => {
    props.navigation.navigate("ProductDetailScreen", { id: data.id });
  };

  const addToWishlist = async (id) => {
    props.addToWishlist(id);
    // logfunction(" wishlist Data ", wishlistData)
  };

  const { wishlistArr } = props;

  const renderCard = (item) => {
    return (
      <View style={styles.productBox} key={item.id.toString()}>
        <ProductView
          data={item}
          key={item.id}
          navToDetail={navigateToDetailPage}
          addToWishlist={addToWishlist}
          wishlistArray={wishlistArr}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.catHeading}>
        <Text style={GlobalStyles.boxHeading}>New Products</Text>
        <TouchableOpacity
          style={{ flex: 0.5 }}
          onPress={() =>
            props.navigation.navigate("ProductListScreen", {
              title: "New Products",
            })
          }
        >
          <Text style={GlobalStyles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <OtrixDivider size={"sm"} />
      <FlatList
        style={{ padding: wp("1%"), flexDirection: "row", flexWrap: "wrap" }}
        data={NewProductDummy}
        contentContainerStyle={{ paddingRight: wp("3%") }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={1}
        keyExtractor={(contact, index) => String(index)}
        renderItem={({ item, index }) => renderCard(item)}
      ></FlatList>
      {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {NewProductDummy.map((item, index) => {
                    return renderCard(item);
                })}
            </View> */}
    </>
  );
}

export default NewProduct;

const styles = StyleSheet.create({
  catHeading: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginTop: hp("1%"),
  },
  catBox: {
    height: hp("12.5%"),
    width: wp("15%"),
    marginHorizontal: wp("1%"),
    borderRadius: 5,
  },
  productBox: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.white,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    width: wp("28%"),
    height: "auto",
    marginBottom: wp("3%"),
    borderRadius: wp("2%"),
    marginHorizontal: wp("1.5%"),
    paddingBottom: hp("1%"),
  },
});
