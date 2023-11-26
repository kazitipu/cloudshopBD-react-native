import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import { Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CategoryDummy from "./items/CategoryDummy";
import OtrixDivider from "./OtrixComponent/OtrixDivider";
import Fonts from "@helpers/Fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { getAllCategoriesRedux } from "../redux/Action";
function CategoryView(props) {
  useEffect(() => {
    props.getAllCategoriesRedux();
  }, []);
  let renderableCategories = [];
  let mainCategories = [];
  if (props.categories && props.categories.length > 0) {
    mainCategories = props.categories
      .filter((category) => category.parentCategory == "")
      .filter((cat) => cat.name != "offer");
  }
  const getAllChildCategories = (category) => {
    if (props.categories && props.categories.length > 0) {
      let childCategories = props.categories.filter(
        (cat) => cat.parentCategory && cat.parentCategory == category.id
      );
      return [category, ...childCategories];
    } else {
      return [];
    }
  };

  return (
    <>
      {mainCategories.length > 0 &&
        mainCategories.map((cat) => (
          <View key={cat.id}>
            <View style={{ padding: wp("0.4%"), marginLeft: 10 }}>
              <Text style={styles.categoryName2}>{cat.name}</Text>
            </View>
            <View
              style={{
                width: "94%",
                height: 2,
                backgroundColor: "black",
                padding: wp("0.3%"),
                marginLeft: 10,
                marginTop: 3,
                marginBottom: 3,
              }}
            ></View>
            <OtrixDivider size={"sm"} />
            <FlatList
              style={{ padding: wp("0.4%") }}
              data={getAllChildCategories(cat)}
              scrollEnabled={false}
              contentContainerStyle={{
                flex: 1,
              }}
              horizontal={false}
              numColumns={4}
              onEndReachedThreshold={0.7}
              showsVerticalScrollIndicator={false}
              keyExtractor={(contact, index) => String(index)}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.categoryBox}
                  onPress={() =>
                    props.navigation.navigate("ProductListScreen", {
                      title: item.name,
                      item: item,
                    })
                  }
                >
                  <View style={styles.imageView}>
                    {item.logo ? (
                      <Image
                        source={{ uri: `${item.logo}` }}
                        style={styles.image}
                      ></Image>
                    ) : null}
                  </View>
                  <View style={styles.infromationView}>
                    <Text style={styles.categoryName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            ></FlatList>
          </View>
        ))}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.mainScreenInit.categories,
  };
};
export default connect(mapStateToProps, { getAllCategoriesRedux })(
  CategoryView
);

const styles = StyleSheet.create({
  categoryBox: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("18%"),
    maxWidth: wp("19%"),
    marginHorizontal: wp("1.8%"),
    flex: 0.5,
    backgroundColor: Colors.white,
    marginBottom: wp("3%"),
    borderRadius: wp("2%"),
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    flexDirection: "column",
  },
  imageView: {
    flex: 0.8,
    backgroundColor: Colors.ligth_white,

    width: wp("13.5%"),
    height: wp("13.5%"),
    borderTopStartRadius: wp("2%"),
    borderTopEndRadius: wp("2%"),
    marginTop: hp("1.4%"),
    marginBottom: hp("1%"),
  },
  image: {
    resizeMode: "contain",
    alignSelf: "center",
    width: wp("13.5%"),
    height: wp("13.5%"),
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 5,
  },
  infromationView: {
    flex: 0.2,
    width: wp("15.5%"),
    marginTop: -4,
    paddingBottom: 4,
  },
  categoryName: {
    textAlign: "center",
    fontSize: wp("2.4%"),
    fontFamily: Fonts.Font_Bold,
  },
  categoryName2: {
    textAlign: "left",
    fontSize: wp("3.2%"),
    fontFamily: Fonts.Font_Bold,
  },
});
