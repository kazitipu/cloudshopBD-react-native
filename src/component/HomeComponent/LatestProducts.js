import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { GlobalStyles, Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DealProductDummy from "../items/DealProductDummy";
import OtrixDivider from "../OtrixComponent/OtrixDivider";
import DealsProductView from "./DealsProductView";
import Fonts from "@helpers/Fonts";
import { logfunction } from "@helpers/FunctionHelper";
import { connect } from "react-redux";
import { getAllLatestProductsRedux } from "../../redux/Action";
function LatestProducts(props) {
  useEffect(() => {
    props.getAllLatestProductsRedux();
  }, []);
  const navigateToDetailPage = (data) => {
    props.navigation.navigate("ProductDetailScreen", { id: data.id });
  };

  const addToWishlist = async (id) => {
    props.addToWishlist(id);
    // logfunction(" wishlist Data ", wishlistData)
  };

  const renderCard = (item) => {
    return (
      <View style={styles.productBox} key={item.id.toString()}>
        <DealsProductView
          data={item}
          key={item.id}
          navToDetail={navigateToDetailPage}
          addToWishlist={addToWishlist}
          wishlistArray={wishlistArr}
        />
      </View>
    );
  };

  const { wishlistArr, latestProducts } = props;
  console.log(latestProducts);
  return (
    <>
      <View style={styles.catHeading}>
        <Text style={GlobalStyles.boxHeading}>Latest Products</Text>
        <TouchableOpacity
          style={{ flex: 0.5 }}
          onPress={() =>
            props.navigation.navigate("ProductListScreen", {
              title: "Latest Products",
              item: "Latest Products",
            })
          }
        >
          <Text style={GlobalStyles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <OtrixDivider size={"sm"} />
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {latestProducts.map((item, index) => {
          return renderCard(item);
        })}
      </View>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    latestProducts: state.mainScreenInit.latestProducts,
  };
};
export default connect(mapStateToProps, {
  getAllLatestProductsRedux,
})(LatestProducts);

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
  catName: {
    fontSize: wp("3.3%"),
    fontFamily: Fonts.Font_Reguler,
    textAlign: "center",
    color: Colors.text_color,
  },
  productBox: {
    flexDirection: "column",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.white,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    width: "46%",
    height: "auto",
    marginBottom: wp("3%"),
    borderRadius: wp("2%"),
    marginHorizontal: wp("1.5%"),
    paddingBottom: hp("1%"),
  },
});
