import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {
    OtrixContainer, OtrixHeader, OtrixContent, OtrixDivider, OtrixSocialContainer
} from '@component';
import { Input, Text, FormControl, Button } from "native-base"
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers'
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from "../helpers/Fonts";
import { doLogin } from '@actions';

function LoginScreen(props) {


    const [formData, setData] = React.useState({ email: "", password: "" });
    const [state, setDatapassword] = React.useState({ secureEntry: true });

    useEffect(() => {
    }, [
        props.navigation.navigate('ProfileScreen')
    ]);

    const { email, password } = formData;
    return (
        <OtrixContainer>

            {/* Header */}
            <OtrixHeader customStyles={GlobalStyles.authHeader}>
                <Text style={[GlobalStyles.authtabbarText]}>Login Account</Text>
                <Text style={GlobalStyles.authSubText}>Enter your email and password to login</Text>
            </OtrixHeader>
            <OtrixDivider size={'md'} />

            {/* Content Start from here */}
            <OtrixContent>

                {/* Login Form Start from here */}
                <FormControl isRequired>
                    <Input variant="outline" placeholder="Email Address" style={[GlobalStyles.textInputStyle]}
                        onChangeText={(value) => setData({ ...formData, email: value })}
                    />
                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Name</FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'sm'} />
                <FormControl isRequired style={{ backgroundColor: Colors.white }}>
                    <Input variant="outline" placeholder="Password" style={[GlobalStyles.textInputStyle,]}
                        onChangeText={(value) => setData({ ...formData, password: value })}
                        secureTextEntry={state.secureEntry}
                        InputRightElement={
                            <TouchableOpacity onPress={() => setDatapassword({ ...state, secureEntry: !state.secureEntry })} style={[{ marginRight: wp('3%'), padding: 3 }]}>
                                <Icon name={state.secureEntry == true ? "eye" : "eye-off"} size={18} color={Colors.secondry_text_color} />
                            </TouchableOpacity>
                        }
                    />
                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Error Name</FormControl.ErrorMessage>
                </FormControl>
                <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                <OtrixDivider size={'md'} />
                <Button
                    size="md"
                    variant="solid"
                    bg={Colors.themeColor}
                    style={GlobalStyles.button}
                    onPress={() => props.doLogin({ email: email, password: password })}
                >
                    <Text style={GlobalStyles.buttonText}>Login Now</Text>
                </Button>
                <OtrixDivider size={'md'} />
                <View style={styles.registerView}>
                    <Text style={styles.registerTxt}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('RegisterScreen')}>
                        <Text style={styles.signupTxt}> Sign Up </Text>
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

export default connect(mapStateToProps, { doLogin })(LoginScreen);

const styles = StyleSheet.create({
    forgotPassword: {
        fontSize: wp('3%'),
        textAlign: 'right',
        fontFamily: Fonts.Font_Reguler,
        color: Colors.link_color,
        padding: 5
    },
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