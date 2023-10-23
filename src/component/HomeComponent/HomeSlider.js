import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  homeSlider1,
  homeSlider2,
  homeSlider3,
  homeSlider4,
  homeSlider5,
} from "@common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { connect } from "react-redux";
import { getAllBannersRedux } from "../../redux/Action";

const { width: screenWidth } = Dimensions.get("window");

function HomeSlider(props) {
  useEffect(() => {
    const getAllBanners = async () => {
      await props.getAllBannersRedux();
    };
    getAllBanners();
  }, []);

  let images = [];
  if (props.banners.length > 0) {
    images = props.banners
      .filter((banner) => !banner.secondBanner)
      .map((banner) => banner.banner);
  }

  const _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.0}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View>
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - screenWidth / 21}
        data={images}
        inactiveSlideOpacity={0.5}
        inactiveSlideScale={1}
        renderItem={_renderItem}
        firstItem={1}
        loop={true}
        autoplayDelay={2500}
        autoplay={true}
        activeAnimationType={"spring"}
        activeSlideAlignment={"center"}
        hasParallaxImages={true}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    banners: state.mainScreenInit.banners,
  };
};
export default connect(mapStateToProps, { getAllBannersRedux })(HomeSlider);
const styles = StyleSheet.create({
  item: {
    width: screenWidth - screenWidth / 18,
    height: screenWidth - 220,
    right: wp("3.5%"),
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: wp("1.5%"),
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});
