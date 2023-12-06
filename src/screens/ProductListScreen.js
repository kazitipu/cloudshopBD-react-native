import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Modal,
  Image,
} from "react-native";
import { connect } from "react-redux";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  ListProductView,
  OtirxBackButton,
  FilterTags,
  FilterComponent,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import FilterTagsDummy from "@component/items/FilterTagsDummy";
import { addToWishList } from "@actions";
import ProductListDummy from "@component/items/ProductListDummy";
import { filter } from "@common";
import {
  _addToWishlist,
  _getWishlist,
  logfunction,
} from "@helpers/FunctionHelper";
import { ProductListSkeleton } from "@skeleton";
import {
  getSingleCategoryProductsRedux,
  getAllCategoriesRedux,
  getAllLatestProductsRedux,
  setSpinnerRedux,
} from "../redux/Action";
import { fontSize } from "styled-system";

function ProductListScreen(props) {
  const { item } = props.route.params;
  const [result, setResult] = useState([]);
  const [state, setState] = React.useState({
    selectedFilters: [],
    wishlistArr: [],
    filterModelVisible: false,
    loading: true,
  });

  useEffect(() => {
    let wishlistData = [];

    const getWishList = async () => {
      wishlistData = await _getWishlist();
      if (item == "Latest Products") {
        props.setSpinnerRedux(true);
        await props.getAllLatestProductsRedux();
        props.setSpinnerRedux(false);
        console.log("getting latest products");
      }
      props.getAllCategoriesRedux();
    };
    getWishList();
    let loadPage = setTimeout(
      () => setState({ ...state, loading: false, wishlistArr: wishlistData }),
      500
    );

    return () => {
      clearTimeout(loadPage);
    };
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      if (item && result.length > 0) {
        let categories = result.map((cat) => cat.id);
        console.log(categories);
        if (item !== "Latest Products") {
          props.setSpinnerRedux(true);
          await props.getSingleCategoryProductsRedux(categories.slice(0, 10));
          props.setSpinnerRedux(false);
          console.log("getting category products");
        }
      }
    };
    getProducts();
  }, [result]);

  useEffect(() => {
    if (props.categories.length > 0 && item) {
      let results = getAllChildCategories(item);
      setResult([item, ...results]);
      console.log(results);
    }
  }, [props.categories]);

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

  //when filter tag clicked
  const filterClick = (value) => {
    const { selectedFilters } = state;
    if (selectedFilters.includes(value)) {
      const index = selectedFilters.indexOf(value);
      if (index > -1) {
        selectedFilters.splice(index, 1);
      }
      setState({
        ...state,
        selectedFilters: selectedFilters,
      });
    } else {
      setState({
        ...state,
        selectedFilters: [...selectedFilters, value],
      });
    }
  };

  const closeFilterModel = () => {
    setState({
      ...state,
      filterModelVisible: false,
    });
  };

  const addToWishlist = async (id) => {
    let wishlistData = await _addToWishlist(id);
    props.addToWishList(wishlistData);
  };

  const { title } = props.route.params;
  const { selectedFilters, loading, filterModelVisible } = state;
  const { wishlistData } = props;
  let renderableProducts = [];
  if (item == "Latest Products") {
    renderableProducts = props.latestProducts;
  } else {
    renderableProducts = props.products;
  }
  return (
    <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>
      {/* Header */}
      <OtrixHeader
        customStyles={{ backgroundColor: Colors.light_white, marginTop: -15 }}
      >
        <TouchableOpacity
          style={GlobalStyles.headerLeft}
          onPress={() => props.navigation.goBack()}
        >
          <OtirxBackButton />
        </TouchableOpacity>
        <View style={[GlobalStyles.headerCenter]}>
          <Text style={{ ...GlobalStyles.headingTxt, fontSize: wp("4.5%") }}>
            {title}
          </Text>
        </View>
        <TouchableOpacity
          style={GlobalStyles.headerRight}
          onPress={() => setState({ ...state, filterModelVisible: true })}
        >
          <Image source={filter} style={styles.filter} />
        </TouchableOpacity>
      </OtrixHeader>
      {/* <OtrixHeader
        customStyles={{
          backgroundColor: Colors.light_white,
          height: Platform.OS === "ios" ? wp("13%") : wp("10%"),
        }}
      >
        <TouchableOpacity
          style={{ ...GlobalStyles.headerLeft }}
          onPress={() => props.navigation.goBack()}
        >
          <OtirxBackButton />
        </TouchableOpacity>
        <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
          <Text style={{ ...GlobalStyles.headingTxt, fontSize: wp("4.5%") }}>
            {" "}
            {title}
          </Text>
        </View>
      </OtrixHeader> */}

      {/* Filter */}
      {result.length > 0 && item !== "Latest Products" ? (
        <View style={{ height: hp("6%"), marginTop: -15 }}>
          <ScrollView
            style={{ flexDirection: "row", marginHorizontal: wp("1%") }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {result.map((item, index) => (
              <FilterTags
                tagName={item.name}
                tagID={item.id}
                key={item.id}
                selected={selectedFilters}
                onFilterPress={filterClick}
                categories={result}
                category={item}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <></>
      )}

      <OtrixDivider size={"sm"} />
      {/* Content Start from here */}
      {loading ? (
        <ProductListSkeleton />
      ) : (
        <View style={styles.content}>
          <FlatList
            style={{ padding: wp("1%") }}
            data={renderableProducts}
            scrollEnabled={true}
            horizontal={false}
            numColumns={2}
            onEndReachedThreshold={0.7}
            showsVerticalScrollIndicator={false}
            keyExtractor={(contact, index) => String(index)}
            renderItem={({ item, index }) => (
              <ListProductView
                data={item}
                key={item.id.toString()}
                imageViewBg={Colors.white}
                navToDetail={() =>
                  props.navigation.navigate("ProductDetailScreen", {
                    id: item.id,
                  })
                }
                addToWishlist={addToWishlist}
                wishlistArray={wishlistData}
              />
            )}
          ></FlatList>
        </View>
      )}
      {/* Fitler Model Start From Here */}
      <Modal visible={filterModelVisible}>
        <FilterComponent
          selectedFilter={selectedFilters}
          onFilterPress={filterClick}
          closeFilter={closeFilterModel}
        />
      </Modal>
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    wishlistData: state.wishlist.wishlistData,
    products: state.products.products,
    latestProducts: state.mainScreenInit.latestProducts,
    categories: state.mainScreenInit.categories,
  };
}

export default connect(mapStateToProps, {
  addToWishList,
  getSingleCategoryProductsRedux,
  getAllCategoriesRedux,
  getAllLatestProductsRedux,
  setSpinnerRedux,
})(ProductListScreen);

const styles = StyleSheet.create({
  content: { flex: 1, marginHorizontal: wp("3%") },
  menuImage: {
    width: wp("5%"),
    height: hp("4%"),
    tintColor: Colors.secondry_text_color,
  },

  filter: {
    height: _roundDimensions()._height * 0.024,
    width: _roundDimensions()._height * 0.024,
  },
  bannerStyle: {
    resizeMode: "contain",
    width: wp("100%"),
    height: hp("16%"),
    alignSelf: "center",
  },
  modelView: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: Colors.light_white,
  },
});
