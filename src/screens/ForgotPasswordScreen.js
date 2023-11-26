import React from "react";
import { requestInit } from "@actions";
import { TouchableOpacity, View } from "react-native";
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

function ForgotPasswordScreen(props) {
  const [formData, setData] = React.useState({});

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
          <Input
            variant="outline"
            placeholder="Email Address"
            style={GlobalStyles.textInputStyle}
            onChangeText={(value) => setData({ ...formData, email: value })}
          />
          <FormControl.ErrorMessage _text={{ fontSize: "xs" }}>
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>
        <OtrixDivider size={"md"} />
        <Button
          size="md"
          variant="solid"
          bg={Colors.themeColor}
          style={GlobalStyles.button}
          onPress={() => props.navigation.navigate("LoginScreen")}
        >
          <Text style={GlobalStyles.buttonText}>Submit</Text>
        </Button>
        <OtrixDivider size={"md"} />
        <Button
          size="md"
          onPress={() => props.navigation.navigate("LoginScreen")}
          style={GlobalStyles.button}
        >
          <Text style={[GlobalStyles.buttonText, { color: "white" }]}>
            Back to login
          </Text>
        </Button>
      </OtrixContent>
    </OtrixContainer>
  );
}

function mapStateToProps({ params }) {
  return {};
}

export default connect(mapStateToProps, { requestInit })(ForgotPasswordScreen);
