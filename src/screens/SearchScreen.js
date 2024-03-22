import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { Button } from "native-base";
import {
  OtrixContainer,
  SearchProductsViewComponent,
  OtirxBackButton,
  OtrixContent,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import Icon from "react-native-vector-icons/FontAwesome";
import Fonts from "@helpers/Fonts";
import { addToWishList } from "@actions";
import { _getWishlist, _addToWishlist } from "@helpers/FunctionHelper";
import MostSearchArr from "@component/items/MostSearchArr";
import SearchProductsArr from "@component/items/SearchProductsArr";
import { Input } from "native-base";
import { getAllSearchResult } from "../firebase/firebase.utils";

function SearchScreen(props) {
  const [state, setState] = React.useState({
    searchKeyword: "",
    showMost: true,
    showSuggestions: false,
    searchResults: [],
  });

  const getData = async (text) => {
    if (text.length > 2) {
      const searchResults = await getAllSearchResult(text);
      setState({
        ...state,
        showSuggestions: true,
        showMost: false,
        searchResults: searchResults,
      });
    } else {
      setState({
        ...state,
        showSuggestions: false,
        showMost: true,
        searchResults: [],
      });
    }
  };

  const search = () => {};

  useEffect(() => {}, []);

  const { searchKeyword, showMost, showSuggestions } = state;
  return (
    <OtrixContainer
      customStyles={{ backgroundColor: Colors.light_white }}
      statusBarColor={Colors.light_white}
    >
      <View style={[styles.headerView]}>
        <TouchableOpacity
          style={[
            GlobalStyles.headerLeft,
            { flex: 0.1, marginLeft: wp("0.5%"), marginRight: wp("1%") },
          ]}
          onPress={() => props.navigation.goBack()}
        >
          <OtirxBackButton />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Icon name="search" style={styles.searchIcon} />
          <View style={styles.verticalLine}></View>
          <TextInput
            autoFocus={true}
            placeholder="Search Products"
            style={[styles.textInputSearchStyle]}
            returnKeyType="search"
            onEndEditing={() => search()}
            onChangeText={(value) => {
              getData(value);
            }}
          ></TextInput>
        </View>
      </View>
      {/* 
      {showMost && (
        <View style={styles.mostSearchView}>
          <Text style={styles.title}>Most Searches</Text>
          <View style={styles.tagRow}>
            {MostSearchArr.map((item) => (
              <TouchableOpacity
                style={styles.tagStyle}
                key={item}
                onPress={() => {
                  getData(item);
                }}
              >
                <Text style={styles.tagText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )} */}

      {showSuggestions && state.searchResults.length > 0 && (
        <OtrixContent>
          <SearchProductsViewComponent
            navigation={props.navigation}
            products={state.searchResults}
          />
        </OtrixContent>
      )}
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
  };
}

export default connect(mapStateToProps, { addToWishList })(SearchScreen);

const styles = StyleSheet.create({
  headerView: {
    marginVertical: hp("2%"),
    marginHorizontal: wp("3%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchView: {
    height: hp("9%"),
    backgroundColor: Colors.white,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Colors.white,
    height: hp("6%"),
  },
  searchIcon: {
    color: Colors.secondry_text_color,
    alignSelf: "center",
    textAlign: "center",
    marginLeft: 10,
  },
  verticalLine: {
    height: hp("2.5%"),
    backgroundColor: Colors.link_color,
  },
  textInputSearchStyle: {
    fontFamily: Fonts.Font_Reguler,
    backgroundColor: Colors.white,
    fontSize: wp("3.5%"),
    borderRadius: 5,
    color: Colors.secondry_text_color,
    borderWidth: 0,
    marginHorizontal: wp("5%"),

    flex: 1,
  },
  noRecord: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: hp("25%"),
  },
  emptyTxt: {
    fontSize: wp("6%"),
    marginVertical: hp("1.5%"),
    fontFamily: Fonts.Font_Semibold,
    color: Colors.secondry_text_color,
  },
  mostSearchView: {
    backgroundColor: Colors.white,
    padding: hp("1.5%"),
    marginHorizontal: wp("4%"),
    borderRadius: wp("3%"),
  },
  title: {
    fontSize: wp("4%"),
    fontFamily: Fonts.Font_Semibold,
    color: Colors.text_color,
    textAlign: "left",
  },
  tagStyle: {
    justifyContent: "center",
    padding: hp("1.5%"),
    backgroundColor: Colors.light_white,
    borderRadius: wp("5%"),
    marginHorizontal: wp("2%"),
    marginVertical: hp("0.4%"),
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tagText: {
    fontSize: wp("3.5%"),
    fontFamily: Fonts.Font_Semibold,
    color: Colors.secondry_text_color,
  },
});
