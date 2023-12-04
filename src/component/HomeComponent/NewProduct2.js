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
import ProductView2 from "../ProductCompnent/ProductView2";
import { logfunction } from "@helpers/FunctionHelper";
import { connect } from "react-redux";
import { getAllHomeScreenProductsRedux } from "../../redux/Action";
const { width: screenWidth } = Dimensions.get("window");
function NewProduct2(props) {
  useEffect(() => {
    props.getAllHomeScreenProductsRedux(props.category.id);
  }, []);
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
    );
  };

  let renderableProducts = [];
  if (props.homeProducts && props.homeProducts.length > 0) {
    let products = props.homeProducts.find(
      (product) => product.categoryId == props.category.id
    );
    if (products) {
      renderableProducts = products.products;
    }
  }

  return (
    <>
      {renderableProducts.length > 0 && (
        <>
          <View style={styles.catHeading}>
            <Text style={{ ...GlobalStyles.boxHeading, flex: 0.7 }}>
              {props.category.name}
            </Text>
            <TouchableOpacity
              style={{ flex: 0.3 }}
              onPress={() =>
                props.navigation.navigate("ProductListScreen", {
                  title: props.category.name,
                  item: props.category,
                })
              }
            >
              <Text style={GlobalStyles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <OtrixDivider size={"sm"} />
          <FlatList
            style={{
              padding: wp("1%"),
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            data={renderableProducts.length > 0 ? renderableProducts : []}
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
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    homeProducts: state.mainScreenInit.homeProducts,
  };
};
export default connect(mapStateToProps, {
  getAllHomeScreenProductsRedux,
})(NewProduct2);

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
