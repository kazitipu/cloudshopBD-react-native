import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { requestInit } from "@actions";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtirxBackButton,
  OtrixDivider,
} from "@component";
import { Input, Text, FormControl, Button, InfoOutlineIcon } from "native-base";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import { updateUserRedux, setSpinnerRedux } from "../redux/Action";
import Toast from "react-native-simple-toast";
function EditProfileScreen(props) {
  const [state, setData] = React.useState({
    displayName: "",
    email: "",
    mobileNumber: "",
    submited: false,
  });

  useEffect(() => {
    if (props.currentUser && props.currentUser.uid)
      setData({
        ...state,
        displayName: props.currentUser.displayName
          ? props.currentUser.displayName
          : "",
        email: props.currentUser.email ? props.currentUser.email : "",
        mobileNumber: props.currentUser.mobileNumber
          ? props.currentUser.mobileNumber
          : "",
      });
  }, [props.currentUser.uid]);

  const { first_name, displayName, email, mobileNumber, submited } = state;
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
            Edit Profile
          </Text>
        </View>
      </OtrixHeader>
      <OtrixDivider size={"md"} />
      {/* Content Start from here */}
      <OtrixContent>
        {/* Profile  Start from here */}

        <FormControl>
          <TextInput
            variant="outline"
            value={displayName}
            placeholder="Change Display Name"
            style={{
              ...GlobalStyles.textInputStyle,
              padding: 14,
              borderWidth: 1,
              borderColor: "gainsboro",
              borderRadius: 5,
              color: "#555",
            }}
            onChangeText={(value) => setData({ ...state, displayName: value })}
          />
          <FormControl.ErrorMessage leftIcon={<InfoOutlineIcon size="xs" />}>
            Display name is required!
          </FormControl.ErrorMessage>
        </FormControl>
        <OtrixDivider size={"md"} />

        <FormControl
          isRequired
          isInvalid={submited && email == "" ? true : false}
        >
          <TextInput
            variant="outline"
            value={email}
            keyboardType="email-address"
            placeholder="Email Address"
            style={{
              ...GlobalStyles.textInputStyle,
              padding: 14,
              borderWidth: 1,
              borderColor: "gainsboro",
              borderRadius: 5,
              color: "#555",
            }}
            onChangeText={(value) => setData({ ...state, email: value })}
          />
          <FormControl.ErrorMessage leftIcon={<InfoOutlineIcon size="xs" />}>
            Email is required
          </FormControl.ErrorMessage>
        </FormControl>
        <OtrixDivider size={"md"} />

        <FormControl
          isRequired
          isInvalid={submited && mobileNumber == "" ? true : false}
        >
          <TextInput
            variant="outline"
            value={mobileNumber}
            keyboardType="number-pad"
            placeholder="Change Mobile Number"
            style={{
              ...GlobalStyles.textInputStyle,
              padding: 14,
              borderWidth: 1,
              borderColor: "gainsboro",
              borderRadius: 5,
              color: "#555",
            }}
            onChangeText={(value) => setData({ ...state, mobileNumber: value })}
          />
          <FormControl.ErrorMessage leftIcon={<InfoOutlineIcon size="xs" />}>
            Mobile Number is required
          </FormControl.ErrorMessage>
        </FormControl>
        <OtrixDivider size={"md"} />
        <Button
          size="md"
          variant="solid"
          bg={Colors.themeColor}
          style={{ ...GlobalStyles.button, marginTop: 10 }}
          onPress={async () => {
            props.setSpinnerRedux(true);
            await props.updateUserRedux({ ...props.currentUser, ...state });
            props.setSpinnerRedux(false);
            Toast.show("User information updated!");
            props.navigation.navigate("MainScreen");
          }}
        >
          <Text style={GlobalStyles.buttonText}>Update</Text>
        </Button>
        <OtrixDivider size={"md"} />
      </OtrixContent>
    </OtrixContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, { updateUserRedux, setSpinnerRedux })(
  EditProfileScreen
);

const styles = StyleSheet.create({});
