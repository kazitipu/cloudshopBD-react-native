import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { requestInit } from '@actions';
import {
    OtrixContainer, OtrixHeader, OtrixContent, OtrixDivider, OtrixSocialContainer
} from '@component';
import { Input, Text, FormControl, Button } from "native-base"
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers'
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from "@helpers/Fonts";

function RegisterScreen(props) {
    const [formData, setData] = React.useState({});
    const [state, setDatapassword] = React.useState({ secureEntry: true });


    useEffect(() => {


    }, []);

    return (
        <OtrixContainer>

            {/* Header */}
            <OtrixHeader customStyles={GlobalStyles.authHeader}>
                <Text style={[GlobalStyles.authtabbarText]}>Register Account</Text>
                <Text style={GlobalStyles.authSubText}>Create account to continue shopping with otrixweb</Text>
            </OtrixHeader>
            <OtrixDivider size={'md'} />

            {/* Content Start from here */}
            <OtrixContent>

                {/* Registration Form Start from here */}
                <FormControl isRequired>
                    <Input variant="outline" placeholder="First Name" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setData({ ...formData, firstName: value })}
                    />
                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Name</FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'sm'} />
                <FormControl isRequired>
                    <Input variant="outline" placeholder="Last Name" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setData({ ...formData, lastName: value })}
                    />
                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Name</FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'sm'} />
                <FormControl isRequired>
                    <Input variant="outline" placeholder="Email Address" style={GlobalStyles.textInputStyle}
                        keyboardType="email-address"
                        onChangeText={(value) => setData({ ...formData, email: value })}
                    />
                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Name</FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'sm'} />
                <FormControl isRequired>
                    <Input variant="outline" keyboardType="number-pad" placeholder="Mobile Number" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setData({ ...formData, mobileNumber: value })}
                    />
                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Name</FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'sm'} />
                <FormControl isRequired>
                    <Input variant="outline" placeholder="Password" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setData({ ...formData, password: value })}
                        secureTextEntry={state.secureEntry}
                        InputRightElement={
                            <TouchableOpacity onPress={() => setDatapassword({ ...state, secureEntry: !state.secureEntry })} style={{ marginRight: wp('3%') }}>
                                <Icon name={state.secureEntry == true ? "eye" : "eye-off"} size={18} color={Colors.secondry_text_color} />
                            </TouchableOpacity>
                        }
                    />
                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Name</FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'sm'} />
                <FormControl isRequired>
                    <Input variant="outline" placeholder="Confirm Password" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setData({ ...formData, cpassword: value })}
                        secureTextEntry={state.secureEntry}
                        InputRightElement={
                            <TouchableOpacity onPress={() => setDatapassword({ ...state, secureEntry: !state.secureEntry })} style={{ marginRight: wp('3%') }}>
                                <Icon name={state.secureEntry == true ? "eye" : "eye-off"} size={18} color={Colors.secondry_text_color} />
                            </TouchableOpacity>
                        }
                    />
                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Name</FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'md'} />
                <Button
                    size="md"
                    variant="solid"
                    bg={Colors.themeColor}
                    style={GlobalStyles.button}
                    onPress={() => props.navigation.navigate('LoginScreen')}
                >
                    <Text style={GlobalStyles.buttonText}>Register Now</Text>
                </Button>
                <OtrixDivider size={'md'} />
                <View style={styles.registerView}>
                    <Text style={styles.registerTxt}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('LoginScreen')}>
                        <Text style={styles.signupTxt}> Sign In </Text>
                    </TouchableOpacity>
                </View>
                <OtrixDivider size={'md'} />

                {/* Social Container Component */}
                <OtrixSocialContainer />
            </OtrixContent>

        </OtrixContainer >
    )

}

function mapStateToProps({ params }) {
    return {}
}

export default connect(mapStateToProps, { requestInit })(RegisterScreen);

const styles = StyleSheet.create({
    registerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    registerTxt: {
        fontSize: wp('3.5%'),
        textAlign: 'center',
        fontFamily: Fonts.Font_Reguler,
        color: Colors.secondry_text_color
    },
    signupTxt: {
        fontSize: wp('3.5%'),
        textAlign: 'right',
        fontFamily: Fonts.Font_Semibold,
        color: Colors.link_color
    },
});