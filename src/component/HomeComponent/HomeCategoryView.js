import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { GlobalStyles, Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CategoryDummy from "../items/CategoryDummy";
import OtrixDivider from "../OtrixComponent/OtrixDivider";
import Fonts from "@helpers/Fonts";
import { connect } from "react-redux";
import { getAllTopCategoriesRedux } from "../../redux/Action";

const HomeCategoryView = (props) => {
  useEffect(() => {
    const getAllTopCategories = async () => {
      await props.getAllTopCategoriesRedux();
    };
    getAllTopCategories();
    console.log(props.topCategories);
  }, []);
  loadImage = false;

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={styles.catHeading}>
        <Text style={{ ...GlobalStyles.boxHeading, flex: 0.7 }}>
          Top Categories
        </Text>
        <TouchableOpacity
          style={{ flex: 0.3 }}
          onPress={() => props.navigation.navigate("CategoryScreen")}
        >
          <Text style={GlobalStyles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <OtrixDivider size={"sm"} />
      <FlatList
        style={{ padding: wp("1%") }}
        data={props.topCategories}
        contentContainerStyle={{ paddingRight: wp("3%") }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={0.7}
        keyExtractor={(contact, index) => String(index)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.catBox}
            key={item.id}
            onPress={() =>
              props.navigation.navigate("ProductListScreen", {
                title: item.name,
                item: item,
              })
            }
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `${item.logo}` }}
                style={styles.imageView}
              ></Image>
            </View>
            <Text numberOfLines={2} style={styles.catName}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    topCategories: state.mainScreenInit.allTopCategories,
  };
};
export default connect(mapStateToProps, { getAllTopCategoriesRedux })(
  HomeCategoryView
);

const styles = StyleSheet.create({
  catHeading: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginTop: hp("1%"),
  },
  catBox: {
    marginHorizontal: wp("1%"),
    width: hp("7%"),
  },
  imageContainer: {
    backgroundColor: Colors.light_white,
    height: hp("7%"),
    width: hp("7%"),
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "gainsboro",
  },
  imageView: {
    resizeMode: "contain",
    alignSelf: "center",
    height: hp("6.5%"),
    width: "100%",
    height: "100%",
  },
  catName: {
    fontSize: wp("3%"),
    fontFamily: Fonts.Font_Reguler,
    textAlign: "center",
    color: Colors.text_color,
    marginTop: 3,
  },
});
