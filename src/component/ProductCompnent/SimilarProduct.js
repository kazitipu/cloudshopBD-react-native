import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { GlobalStyles, Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SimilarDummy from "../items/SimilarDummy";
import OtrixDivider from "../OtrixComponent/OtrixDivider";
import Fonts from "@helpers/Fonts";
import ProductView2 from "./ProductView2";
import {
  getSimilarCategoryProductsRedux,
  getAllCategoriesRedux,
} from "../../redux/Action";
import { StackActions } from "@react-navigation/native";
import { connect } from "react-redux";
function SimilarProduct(props) {
  const { item, wishlistArr } = props;

  const [result, setResult] = useState([]);

  useEffect(() => {
    props.getAllCategoriesRedux();
  }, []);

  useEffect(() => {
    if (item && result.length > 0) {
      let categories = result.map((cat) => cat.id);

      props.getSimilarCategoryProductsRedux(categories.slice(0, 10));
    }
  }, [result]);

  useEffect(() => {
    if (props.categories.length > 0 && item) {
      let results = getAllChildCategories(item);
      setResult([item, ...results]);
    }
  }, [props.categories, item]);
  const navigateToDetailPage = (data) => {
    props.navigation.dispatch(
      StackActions.replace("ProductDetailScreen", { id: data.id })
    );
    // props.navigation.push("ProductDetailScreen", { id: data.id });
  };
  const addToWishlist = async (id) => {
    props.addToWishlist(id);
    // logfunction(" wishlist Data ", wishlistData)
  };

  const categoriesById = new Map(
    props.categories.map((category) => [category.id, category])
  );
  const getAllChildCategories = (category) => {
    const targetId = category.id;
    const results = [];
    for (const cat of props.categories) {
      let c = cat;
      while (c && c.parentCategory) {
        c = c.parentCategory && categoriesById.get(c.parentCategory);
        if (c.id === targetId) {
          results.push(cat);
          break;
        }
      }
    }
    return results;
  };

  return (
    <>
      <View style={styles.catHeading}>
        <Text style={GlobalStyles.boxHeading}>Similar Products</Text>
      </View>
      <OtrixDivider size={"sm"} />
      <FlatList
        style={{ padding: wp("1%") }}
        data={props.products}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{
          paddingTop: wp("2.5%"),
        }}
        onEndReachedThreshold={0.7}
        keyExtractor={(contact, index) => String(index)}
        renderItem={({ item, index }) => (
          <View style={styles.productBox} key={item.id.toString()}>
            {item && (
              <ProductView2
                data={item}
                key={item.id}
                navToDetail={navigateToDetailPage}
                addToWishlist={addToWishlist}
                wishlistArray={wishlistArr}
              />
            )}
          </View>
        )}
      ></FlatList>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products.similarProducts,
    categories: state.mainScreenInit.categories,
  };
};
export default connect(mapStateToProps, {
  getSimilarCategoryProductsRedux,
  getAllCategoriesRedux,
})(SimilarProduct);

const styles = StyleSheet.create({
  catHeading: {
    justifyContent: "flex-start",
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
  imageView: {
    flex: 0.63,
    backgroundColor: Colors.light_white,
    width: wp("42.2%"),
    borderTopStartRadius: wp("2%"),
    borderTopEndRadius: wp("2%"),
  },
  image: {
    resizeMode: "contain",
    alignSelf: "center",
    height: hp("16%"),
    width: wp("30%"),
  },
  infromationView: {
    flex: 0.37,
    width: wp("35%"),
  },
  starView: {
    alignItems: "flex-start",
    marginVertical: hp("0.6%"),
  },
  myStarStyle: {
    color: "#ffd12d",
    backgroundColor: "transparent",
    marginHorizontal: 1,
    textShadowRadius: 1,
  },
  myEmptyStarStyle: {
    color: "gray",
  },
  productName: {
    color: Colors.secondry_text_color,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3.5%"),
  },
  priceView: {
    flex: 1,
    marginTop: hp("0.6%"),
    flexDirection: "row",
  },
  price: {
    flex: 0.3,
    color: Colors.black,
    fontFamily: Fonts.Font_Bold,
    fontSize: wp("4%"),
  },
  offerTxt: {
    flex: 0.7,
    textAlign: "right",
    color: Colors.link_color,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("2.8%"),
    textTransform: "uppercase",
  },
});
