import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  OtrixSocialContainer,
  OtirxBackButton,
} from "@component";
import { Input, Text, FormControl, Button } from "native-base";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import Icon from "react-native-vector-icons/Ionicons";
import Fonts from "../helpers/Fonts";
import { doLogin } from "@actions";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-simple-toast";
import GradientButton from "../component/CartComponent/Button";
import { setSpinnerRedux } from "../redux/Action";
function LoginScreen(props) {
  const [formData, setData] = React.useState({ email: "", password: "" });
  const [state, setDatapassword] = React.useState({ secureEntry: true });
  const { email, password } = formData;

  const signInWithEmailAndPassword = async () => {
    props.setSpinnerRedux(true);
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Toast.show("Signed in successfully!");
        setData({});
        props.navigation.goBack();
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Toast.show("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          Toast.show("That email address is invalid!");
        }

        Toast.show("Something went wrong,Please try again later.");
      });
    props.setSpinnerRedux(false);
  };
  return (
    <OtrixContainer statusBarColor={Colors.light_white}>
      {/* Header */}
      <OtrixHeader
        customStyles={{
          backgroundColor: Colors.light_white,
          height: Platform.OS === "ios" ? wp("13%") : wp("10%"),
        }}
      >
        <TouchableOpacity
          style={{ ...GlobalStyles.headerLeft }}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <OtirxBackButton />
        </TouchableOpacity>
        <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
          <Text style={{ ...GlobalStyles.headingTxt, fontSize: wp("4.5%") }}>
            {" "}
            Login Account
          </Text>
        </View>
      </OtrixHeader>

      <OtrixDivider size={"md"} />

      {/* Content Start from here */}
      <OtrixContent>
        {/* Login Form Start from here */}
        <Text
          style={{
            fontSize: wp("3.6%"),
            fontWeight: "bold",
            color: "gray",
            marginBottom: 10,
            marginLeft: 5,
          }}
        >
          Enter your email and Password to login
        </Text>
        <FormControl
          isRequired
          style={{
            backgroundColor: Colors.white,
            padding: 10,
            borderWidth: 1,
            borderColor: "gainsboro",
            borderRadius: 10,
          }}
        >
          <Input
            placeholder="Email Address"
            variant="unstyled"
            onChangeText={(value) => setData({ ...formData, email: value })}
            style={{ borderWidth: 1, borderColor: "red" }}
          />
          <FormControl.ErrorMessage _text={{ fontSize: "xs" }}>
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>
        <OtrixDivider size={"sm"} />
        <FormControl
          isRequired
          style={{
            backgroundColor: Colors.white,
            padding: 10,
            borderWidth: 1,
            borderColor: "gainsboro",
            borderRadius: 10,
          }}
        >
          <Input
            variant="unstyled"
            placeholder="Password"
            onChangeText={(value) => setData({ ...formData, password: value })}
            // secureTextEntry={state.secureEntry}

            InputRightElement={
              <TouchableOpacity
                onPress={() =>
                  setDatapassword({ ...state, secureEntry: !state.secureEntry })
                }
                style={[{ marginRight: wp("3%"), padding: 3 }]}
              >
                <Icon
                  name={state.secureEntry == true ? "eye" : "eye-off"}
                  size={18}
                  color={Colors.secondry_text_color}
                />
              </TouchableOpacity>
            }
          />
          <FormControl.ErrorMessage _text={{ fontSize: "xs" }}>
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <OtrixDivider size={"md"} />

        <GradientButton
          children={
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: wp("3.1%"),
                }}
              >
                Login Now
              </Text>
            </View>
          }
          onPress={async () => {
            signInWithEmailAndPassword();
            // props.navigation.navigate("LoginScreen");
          }}
        />
        <OtrixDivider size={"md"} />
        <View style={styles.registerView}>
          <Text style={styles.registerTxt}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.signupTxt}> Sign Up </Text>
          </TouchableOpacity>
        </View>
        <OtrixDivider size={"md"} />
        {/* Social Container Component */}
        <OtrixSocialContainer navigation={props.navigation} />
      </OtrixContent>
    </OtrixContainer>
  );
}

function mapStateToProps({ params }) {
  return {};
}

export default connect(mapStateToProps, { doLogin, setSpinnerRedux })(
  LoginScreen
);

const styles = StyleSheet.create({
  forgotPassword: {
    fontSize: wp("3%"),
    textAlign: "right",
    fontFamily: Fonts.Font_Reguler,
    color: Colors.link_color,
    padding: 5,
  },
  registerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerTxt: {
    fontSize: wp("3.5%"),
    textAlign: "center",
    fontFamily: Fonts.Font_Reguler,
    color: Colors.secondry_text_color,
  },
  signupTxt: {
    fontSize: wp("3.5%"),
    textAlign: "right",
    fontFamily: Fonts.Font_Semibold,
    color: Colors.link_color,
  },
});
