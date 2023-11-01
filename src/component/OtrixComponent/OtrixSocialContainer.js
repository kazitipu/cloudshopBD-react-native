import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { OtrixDivider } from "@component";
import { Text } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@helpers";
import Fonts from "@helpers/Fonts";
import { google, apple } from "@common";

function OtrixSocialContainer(props) {
  return (
    <>
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerTxt}>OR</Text>
      </View>

      <OtrixDivider size={"md"} />

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image
            square
            source={google}
            style={[
              {
                height: 40,
                width: 40,
              },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageContainer}>
          <Image
            square
            source={apple}
            style={[
              {
                height: 43,
                width: 35,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default OtrixSocialContainer;

const styles = StyleSheet.create({
  divider: {
    justifyContent: "center",
    flexDirection: "row",
  },
  dividerLine: {
    position: "absolute",
    width: "100%",
    height: wp("0.2%"),
    backgroundColor: Colors.dark_grey,
    alignSelf: "center",
  },
  dividerTxt: {
    alignSelf: "center",
    backgroundColor: Colors.light_white,
    paddingHorizontal: wp("3%"),
    fontSize: wp("3.4%"),
    fontFamily: Fonts.Font_Semibold,
    color: Colors.secondry_text_color,
  },
  socialContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    height: 60,
    width: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp("4%"),
  },
});
