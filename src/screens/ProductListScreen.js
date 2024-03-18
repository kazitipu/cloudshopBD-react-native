import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Modal,
  Image,
  Platform,
  Alert,
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
  clearAllProductsRedux,
  clearAllLatestProductsRedux,
} from "../redux/Action";
import { fontSize } from "styled-system";
import Toast from "react-native-simple-toast";

function ProductListScreen(props) {
  const { item } = props.route.params;
  const [result, setResult] = useState([]);

  const [state, setState] = React.useState({
    selectedFilters: [],
    wishlistArr: [],
    filterModelVisible: false,
    loading: true,
    categories: [],
  });
  const categoriesRef = useRef([]);
  const goingToDetail = useRef(false);

  useEffect(() => {
    let wishlistData = [];

    const getWishList = async () => {
      wishlistData = await _getWishlist();
      if (item == "Latest Products") {
        props.clearAllLatestProductsRedux();
        setState({ ...state, loading: true });
        await props.getAllLatestProductsRedux();
        setState({ ...state, loading: false });
        console.log("getting latest products");
      }
      props.getAllCategoriesRedux();
    };
    getWishList();
    // let loadPage = setTimeout(
    //   () => setState({ ...state, loading: false, wishlistArr: wishlistData }),
    //   500
    // );

    // return () => {
    //   clearTimeout(loadPage);
    // };
  }, []);

  useEffect(() => {
    if (goingToDetail.current == true || props.products.length > 0) {
      return;
    }

    const getProducts = async () => {
      if (item && result.length > 0) {
        let categories = result.map((cat) => cat.id);
        console.log(categories);
        categoriesRef.current = categories;
        if (item !== "Latest Products") {
          setState({ ...state, loading: true });
          props.clearAllProductsRedux();
          await props.getSingleCategoryProductsRedux(
            categories.slice(0, 10),
            null
          );
          setState({ ...state, loading: false });
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
  }, [props.categories, item]);

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
        if (c && c.id === targetId) {
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
      setState({
        ...state,
        selectedFilters: value,
      });
    } else {
      setState({
        ...state,
        selectedFilters: value,
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

  const fetchMorePost = async () => {
    console.log(props.lastProduct);
    if (item !== "Latest Products" && props.lastProduct) {
      await props.getSingleCategoryProductsRedux(
        categoriesRef.current.slice(0, 10),
        props.lastProduct
      );
      console.log("getting fetch more post.");
    } else if (item == "Latest Products" && props.lastProduct2) {
      await props.getAllLatestProductsRedux(props.lastProduct2);
    } else {
      // do nothing
    }
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
    <OtrixContainer
      customStyles={{ backgroundColor: Colors.light_white }}
      statusBarColor={Colors.light_white}
    >
      {/* Header */}
      <OtrixHeader
        customStyles={{
          backgroundColor: Colors.light_white,
          marginTop: Platform.OS == "ios" ? -15 : 0,
        }}
      >
        <TouchableOpacity
          style={GlobalStyles.headerLeft}
          onPress={() => {
            props.navigation.goBack();
            props.clearAllProductsRedux();
            goingToDetail.current = false;
          }}
        >
          <OtirxBackButton />
        </TouchableOpacity>
        <View style={[GlobalStyles.headerCenter]}>
          <Text style={{ ...GlobalStyles.headingTxt, fontSize: wp("4.5%") }}>
            {title}
          </Text>
        </View>
        {/* <TouchableOpacity
          style={GlobalStyles.headerRight}
          onPress={() => setState({ ...state, filterModelVisible: true })}
        >
          <Image source={filter} style={styles.filter} />
        </TouchableOpacity> */}
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
      {result.length > 1 && item !== "Latest Products" ? (
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
            onEndReachedThreshold={0.07}
            onEndReached={() => {
              fetchMorePost();
            }}
            scrollEventThrottle={150}
            showsVerticalScrollIndicator={false}
            keyExtractor={(contact, index) => String(index)}
            renderItem={({ item, index }) => (
              <ListProductView
                data={item}
                key={item.id.toString()}
                imageViewBg={Colors.white}
                navToDetail={() => {
                  goingToDetail.current = true;
                  props.navigation.navigate("ProductDetailScreen", {
                    id: item.id,
                  });
                }}
                addToWishlist={addToWishlist}
                wishlistArray={wishlistData}
              />
            )}
          ></FlatList>
        </View>
      )}
      {/* Fitler Model Start From Here */}
      {/* <Modal visible={filterModelVisible}>
        <FilterComponent
          selectedFilter={selectedFilters}
          onFilterPress={filterClick}
          closeFilter={closeFilterModel}
        />
      </Modal> */}
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    wishlistData: state.wishlist.wishlistData,
    products: state.products.products,
    lastProduct: state.products.lastProduct,
    lastProduct2: state.mainScreenInit.lastProduct,
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
  clearAllProductsRedux,
  clearAllLatestProductsRedux,
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
