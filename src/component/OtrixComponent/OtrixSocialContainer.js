import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { OtrixDivider } from "@component";
import { Text } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@helpers";
import Fonts from "@helpers/Fonts";
import { google, apple } from "@common";
import { connect } from "react-redux";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import Toast from "react-native-simple-toast";
import { setAdditionalDataRedux } from "../../redux/Action";
import auth from "@react-native-firebase/auth";
import { appleAuth } from "@invertase/react-native-apple-authentication";
function OtrixSocialContainer(props) {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "65158771737-t16114kjqgie041v951j37jifan4345i.apps.googleusercontent.com",
    });
  }, []);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setInfo(userInfo);
      props.setAdditionalDataRedux({
        displayName: userInfo.user.name,
        email: userInfo.user.email,
        imageUrl: userInfo.user.photo,
      });

      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );

      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);
      Toast.show("Signed in successfully!");
      props.navigation.goBack();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Toast.show("user cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        Toast.show("operation is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Toast.show("play services not available or outdated");
      } else {
        // some other error happened
        Toast.show("An error occurred. Please try again later.");
      }
    }
  };
  const appleSignIn = async () => {
    // 1). start a apple sign-in request
    console.log("start apple sing-in request");
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      console.log("this part is completed!");
      if (!appleAuthRequestResponse.identityToken) {
        return Toast.show("Apple Sign-In failed - no identify token returned");
      }

      // 2). if the request was successful, extract the token and nonce
      const { identityToken, nonce } = appleAuthRequestResponse;
      console.log(identityToken);
      // can be null in some scenarios
      if (identityToken) {
        // 3). create a Firebase `AppleAuthProvider` credential
        const appleCredential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce
        );
        console.log(appleCredential);

        // 4). use the created `AppleAuthProvider` credential to start a Firebase auth request,
        //     in this example `signInWithCredential` is used, but you could also call `linkWithCredential`
        //     to link the account to an existing user
        const userCredential = await auth().signInWithCredential(
          appleCredential
        );
        console.log(userCredential);
        Toast.show("signed in successfully!");
        props.navigation.goBack();
      } else {
        return Toast.show("Something went wrong!. Try Again later");
      }
    } catch (error) {
      return Toast.show("An error occurred! Please try again later.");
    }
  };
  return (
    <>
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerTxt}>OR</Text>
      </View>

      <OtrixDivider size={"md"} />

      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            googleSignIn();
          }}
        >
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

        {Platform.OS === "ios" && (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              appleSignIn();
            }}
          >
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
        )}
      </View>
    </>
  );
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { setAdditionalDataRedux })(
  OtrixSocialContainer
);

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
