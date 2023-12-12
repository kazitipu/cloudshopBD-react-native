import React from "react";
import { requestInit } from "@actions";
import { TouchableOpacity, View, TextInput } from "react-native";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  OtirxBackButton,
} from "@component";
import { Input, Text, FormControl, Button } from "native-base";
import { connect } from "react-redux";
import { GlobalStyles, Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-simple-toast";
import GradientButton from "../component/CartComponent/Button";
import GradientButton2 from "../component/CartComponent/Button2";
import auth from "@react-native-firebase/auth";
import { setSpinnerRedux } from "../redux/Action";
function ForgotPasswordScreen(props) {
  const [formData, setData] = React.useState({ email: "" });

  const handleSubmit = async () => {
    var emailAddress = formData.email;
    console.log(emailAddress);

    await auth()
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        setData({
          ...formData,
          email: "",
        });

        alert(
          "Password reset email has been sent to your email address.Please check your email"
        );
        props.navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        setData({
          ...formData,
          email: "",
        });
        console.log(error);
        // return alert("An error occurred. Please try again later.");
        alert(error);
      });
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
          onPress={() => props.navigation.goBack()}
        >
          <OtirxBackButton />
        </TouchableOpacity>
        <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
          <Text style={{ ...GlobalStyles.headingTxt, fontSize: wp("4.5%") }}>
            {" "}
            Forgot Password
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
          Submit the email to reset your password
        </Text>
        {/* Forgot password form Start from here */}
        <FormControl isRequired>
          <TextInput
            variant="outline"
            placeholder="Email Address"
            style={{
              ...GlobalStyles.textInputStyle,
              padding: 14,
              borderColor: "gainsboro",
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "white",
            }}
            onChangeText={(value) => setData({ ...formData, email: value })}
            value={formData.email}
          />
          <FormControl.ErrorMessage _text={{ fontSize: "xs" }}>
            Error Email Address
          </FormControl.ErrorMessage>
        </FormControl>

        <View
          style={{
            backgroundColor: Colors.light_white,
            display: "flex",
            flexDirection: "row",
            minWidth: "100%",
            marginTop: 20,
          }}
        >
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
                  Submit
                </Text>
              </View>
            }
            onPress={async () => {
              props.setSpinnerRedux(true);
              await handleSubmit();
              props.setSpinnerRedux(false);
              // props.navigation.navigate("LoginScreen");
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: Colors.light_white,
            display: "flex",
            flexDirection: "row",
            minWidth: "100%",
            marginTop: 10,
          }}
        >
          <GradientButton2
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
                  Back to login
                </Text>
              </View>
            }
            onPress={() => {
              props.navigation.navigate("LoginScreen");
            }}
          />
        </View>
      </OtrixContent>
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { requestInit, setSpinnerRedux })(
  ForgotPasswordScreen
);
