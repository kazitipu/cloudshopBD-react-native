import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Fonts from "@helpers/Fonts";
import { checkaround } from "@common";
import { connect } from "react-redux";
import {
  getSingleCategoryProductsRedux,
  setSpinnerRedux,
  clearAllProductsRedux,
} from "../../redux/Action";
function FilterTags(props) {
  let selectedTag = false;
  if (props.selected.includes(props.tagID)) {
    selectedTag = true;
  }
  const onClick = async () => {
    let result = getAllChildCategories(props.category);
    const categories = [
      props.category.id,
      ...result.map((category) => category.id),
    ];
    props.setSpinnerRedux(true);
    props.clearAllProductsRedux();
    await props.getSingleCategoryProductsRedux(categories.slice(0, 10), null);
    props.setSpinnerRedux(false);
    props.onFilterPress(props.tagID);
  };

  const getAllChildCategories = (category) => {
    const categoriesById = new Map(
      props.categories.map((category) => [category.id, category])
    );
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

  return (
    <TouchableOpacity
      style={[
        styles.filterBox,
        selectedTag ? styles.borderBox : styles.unborderBox,
      ]}
      onPress={() => onClick()}
    >
      {selectedTag && <Image source={checkaround} style={styles.imageView} />}
      <Text style={styles.tagStyle}>{props.tagName}</Text>
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  };
};
export default connect(mapStateToProps, {
  getSingleCategoryProductsRedux,
  setSpinnerRedux,
  clearAllProductsRedux,
})(FilterTags);

const styles = StyleSheet.create({
  filterBox: {
    paddingHorizontal: wp("3.2%"),
    paddingVertical: hp("1.2%"),
    flexDirection: "row",
    marginHorizontal: wp("2%"),
    backgroundColor: Colors.white,
    justifyContent: "center",
    borderRadius: 5,
    borderColor: Colors.light_gray,
    borderWidth: 1,
    marginVertical: hp("0.5%"),
    alignItems: "center",
  },
  tagStyle: {
    color: Colors.black,
    fontFamily: Fonts.Font_Semibold,
    fontSize: wp("3%"),
  },
  borderBox: {
    borderColor: Colors.themeColor,
    borderWidth: 1,
  },
  unborderBox: {
    borderColor: "gainsboro",
    borderWidth: 1,
  },

  imageView: {
    height: hp("2%"),
    width: wp("4%"),
    borderRadius: 50,
    marginHorizontal: wp("1%"),
  },
});
