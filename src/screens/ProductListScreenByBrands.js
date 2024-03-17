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
  getSingleBrandProductsRedux,
  getAllCategoriesRedux,
  getAllLatestProductsRedux,
  setSpinnerRedux,
} from "../redux/Action";
import { fontSize } from "styled-system";
import Toast from "react-native-simple-toast";

function ProductListScreenByBrands(props) {
  const { item } = props.route.params;
  const [result, setResult] = useState([]);
  const [state, setState] = React.useState({
    selectedFilters: [],
    filterModelVisible: false,
    loading: true,
  });

  useEffect(() => {
    const getWishList = async () => {
      await props.getSingleBrandProductsRedux(item);
    };
    getWishList();
    let loadPage = setTimeout(
      () => setState({ ...state, loading: false }),
      500
    );
    return () => {
      clearTimeout(loadPage);
    };
  }, []);

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

  const { title } = props.route.params;
  const { selectedFilters, loading, filterModelVisible } = state;

  let renderableProducts = [];

  renderableProducts = props.products;

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
          onPress={() => props.navigation.goBack()}
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

      {/* Filter */}

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
    products: state.products.products,
    latestProducts: state.mainScreenInit.latestProducts,
    categories: state.mainScreenInit.categories,
  };
}

export default connect(mapStateToProps, {
  addToWishList,
  getSingleCategoryProductsRedux,
  getSingleBrandProductsRedux,
  getAllCategoriesRedux,
  getAllLatestProductsRedux,
  setSpinnerRedux,
})(ProductListScreenByBrands);

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
