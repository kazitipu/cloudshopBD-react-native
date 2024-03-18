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

import {
  _addToWishlist,
  _getWishlist,
  logfunction,
} from "@helpers/FunctionHelper";
import { ProductListSkeleton } from "@skeleton";
import {
  getSingleBrandProductsRedux,
  getAllCategoriesRedux,
  setSpinnerRedux,
  clearAllBrandProductsRedux,
} from "../redux/Action";

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
      setState({ ...state, loading: true });
      props.clearAllBrandProductsRedux();
      await props.getSingleBrandProductsRedux(item);
      console.log("getting product in useEffect");
      setState({ ...state, loading: false });
    };
    getWishList();
  }, []);

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

  const fetchMorePost = async () => {
    if (props.lastProduct && props.products.length > 9) {
      await props.getSingleBrandProductsRedux(item, props.lastProduct);
      console.log("getting product in fetchmore post.");
    }
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
          onPress={() => {
            props.clearAllBrandProductsRedux();
            props.navigation.goBack();
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
    products: state.products.brandProducts,
    lastProduct: state.products.lastProductBrand,
    categories: state.mainScreenInit.categories,
  };
}

export default connect(mapStateToProps, {
  getSingleBrandProductsRedux,
  getAllCategoriesRedux,
  setSpinnerRedux,
  clearAllBrandProductsRedux,
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
