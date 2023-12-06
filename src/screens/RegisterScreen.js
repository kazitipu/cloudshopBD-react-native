import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { requestInit } from "@actions";
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
import Fonts from "@helpers/Fonts";
import auth from "@react-native-firebase/auth";
import { setAdditionalDataRedux, setSpinnerRedux } from "../redux/Action";
import GradientButton from "../component/CartComponent/Button";
import Toast from "react-native-simple-toast";
function RegisterScreen(props) {
  const [formData, setData] = React.useState({});
  const [state, setDatapassword] = React.useState({ secureEntry: true });
  useEffect(() => {}, []);
  const { firstName, lastName, email, mobileNumber, password, cpassword } =
    formData;
  const createAccountWithEmailAndPassword = async () => {
    props.setAdditionalDataRedux({
      firstName,
      lastName,
      mobileNumber,
      password,
      displayName: firstName + " " + lastName,
    });

    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Toast.show("User account created & signed in!");
        setData({});
        props.navigation.goBack();
        props.navigation.goBack();
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Toast.show("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          Toast.show("That email address is invalid!");
        }

        console.error(error);
      });
  };
  return (
    <OtrixContainer>
      {/* Header */}
      <OtrixHeader
        customStyles={{
          backgroundColor: Colors.light_white,
          height: Platform.OS === "ios" ? wp("13%") : wp("10%"),
        }}
      >
        <TouchableOpacity
          style={{ ...GlobalStyles.headerLeft }}
          onPress={() => props.navigation.goBack()}
        >
          <OtirxBackButton />
        </TouchableOpacity>
        <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
          <Text style={{ ...GlobalStyles.headingTxt, fontSize: wp("4.5%") }}>
            {" "}
            Register Account
          </Text>
        </View>
      </OtrixHeader>
      <OtrixDivider size={"md"} />

      {/* Content Start from here */}
      <OtrixContent>
        <Text
          style={{
            fontSize: wp("3.6%"),
            fontWeight: "bold",
            color: "gray",
            marginBottom: 10,
            marginLeft: 5,
          }}
        >
          Register with your email and Password
        </Text>
        {/* Registration Form Start from here */}
        <FormControl
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
            placeholder="First Name"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...formData, firstName: value })}
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
            placeholder="Last Name"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...formData, lastName: value })}
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
            placeholder="Email Address"
            style={GlobalStyles.textInputStyle}
            keyboardType="email-address"
            onChangeText={(value) => setData({ ...formData, email: value })}
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
            keyboardType="number-pad"
            placeholder="Mobile Number"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) =>
              setData({ ...formData, mobileNumber: value })
            }
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
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...formData, password: value })}
            secureTextEntry={state.secureEntry}
            InputRightElement={
              <TouchableOpacity
                onPress={() =>
                  setDatapassword({ ...state, secureEntry: !state.secureEntry })
                }
                style={{ marginRight: wp("3%") }}
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
            placeholder="Confirm Password"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...formData, cpassword: value })}
            secureTextEntry={state.secureEntry}
            InputRightElement={
              <TouchableOpacity
                onPress={() =>
                  setDatapassword({ ...state, secureEntry: !state.secureEntry })
                }
                style={{ marginRight: wp("3%") }}
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
                Register Now
              </Text>
            </View>
          }
          onPress={async () => {
            props.setSpinnerRedux(true);
            await createAccountWithEmailAndPassword();
            props.setSpinnerRedux(false);
            // props.navigation.navigate("LoginScreen");
          }}
        />
        <OtrixDivider size={"md"} />
        <View style={styles.registerView}>
          <Text style={styles.registerTxt}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("LoginScreen")}
          >
            <Text style={styles.signupTxt}> Sign In </Text>
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

export default connect(mapStateToProps, {
  requestInit,
  setAdditionalDataRedux,
  setSpinnerRedux,
})(RegisterScreen);

const styles = StyleSheet.create({
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
