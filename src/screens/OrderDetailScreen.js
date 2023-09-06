import React, { useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet, ScrollView,
    Image
} from "react-native";
import { connect } from 'react-redux';
import {
    OtrixContainer, OtrixHeader, OtrixDivider, OtirxBackButton,
} from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import { _roundDimensions } from '@helpers/util';
import { proceedCheckout } from '@actions';
import Fonts from "@helpers/Fonts";

function OrderDetailScreen(props) {
    const { orderData } = props.route.params;

    return (
        <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>

            {/* Header */}
            <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
                <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.navigation.goBack()}>
                    <OtirxBackButton />
                </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
                    <Text style={GlobalStyles.headingTxt}> Orders Details </Text>
                </View>
            </OtrixHeader>

            {/* Orders Content start from here */}

            <View style={styles.addressContent}>
                <ScrollView style={styles.addressBox} showsHorizontalScrollIndicator={false} vertical={true}>

                    <OtrixDivider size={"md"} />
                    <Text style={styles.deliveryTitle}>View Orders Details</Text>
                    <OtrixDivider size={"sm"} />
                    <View style={styles.cartContent} >
                        <View style={styles.detailBox} >
                            <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={styles.leftTxt}>Order Date</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={styles.rightTxt}>{orderData.orderDate}</Text>
                                </View>
                            </View>
                            <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={styles.leftTxt}>Order</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={styles.rightTxt}>#{orderData.orderid}</Text>
                                </View>
                            </View>
                            <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={[styles.leftTxt]}>Order Total</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={styles.rightTxt}>{orderData.price}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <OtrixDivider size={"md"} />
                    <Text style={styles.deliveryTitle}>Product Details</Text>
                    <OtrixDivider size={"sm"} />

                    <View style={styles.cartContent} >
                        <View style={styles.cartBox} >
                            <View style={styles.imageView}>
                                <Image source={orderData.image} style={styles.image}
                                ></Image>
                            </View>
                            <View style={styles.infromationView}>
                                <View >
                                    <Text style={styles.name}>{orderData.name}</Text>
                                </View>
                                <Text style={styles.orderDate}>Quantity: {orderData.orderQty}</Text>
                                <Text style={styles.orderDate}>Order Status: <Text style={styles.orderStatuss}>{orderData.orderStatus}</Text></Text>
                            </View>
                        </View>
                        <View style={styles.priceView}>
                            <Text style={styles.price}>{orderData.price}</Text>
                        </View>
                    </View>

                    <OtrixDivider size={"md"} />
                    <Text style={styles.deliveryTitle}>Shipping Address</Text>
                    <OtrixDivider size={"sm"} />
                    <View style={styles.cartContent} >
                        <TouchableOpacity style={[styles.deliveryBox]}    >
                            <Text style={styles.addressTxt} numberOfLines={1}>{orderData.deliveryAddress.name}     </Text>
                            <Text style={styles.addressTxt} numberOfLines={2}>{orderData.deliveryAddress.address1}    </Text>
                            <Text style={styles.addressTxt} numberOfLines={2}>{orderData.deliveryAddress.address2}, {orderData.deliveryAddress.city}</Text>
                            <Text style={styles.addressTxt} numberOfLines={1}>{orderData.deliveryAddress.postcode}, {orderData.deliveryAddress.country}</Text>
                        </TouchableOpacity>
                    </View>


                    <OtrixDivider size={"md"} />
                    <Text style={styles.deliveryTitle}>Orders Summary</Text>
                    <OtrixDivider size={"sm"} />
                    <View style={styles.cartContent} >
                        <View style={[styles.detailBox, { height: hp('16%') }]} >
                            <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={styles.leftTxt}>Items</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={styles.rightTxt}>{orderData.price}</Text>
                                </View>
                            </View>
                            <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={styles.leftTxt}>Tax</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={styles.rightTxt}>{orderData.tax}</Text>
                                </View>
                            </View>
                            <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={styles.leftTxt}>Discount</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={styles.rightTxt}>{orderData.discount}</Text>
                                </View>
                            </View>
                            <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={[styles.leftTxt, { color: Colors.link_color, fontSize: wp('4.5%') }]}>Order Total</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={[styles.rightTxt, , { color: Colors.link_color, fontSize: wp('4.5%') }]}>{orderData.grand_total}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>



        </OtrixContainer >

    )
}

function mapStateToProps(state) {
    return {
        cartData: state.cart.cartData,

    }
}


export default connect(mapStateToProps, { proceedCheckout })(OrderDetailScreen);

const styles = StyleSheet.create({

    deliveryTitle: {
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('3.8%'),
        color: Colors.text_color,
        marginLeft: wp('2%')
    },
    addressBox: {
        marginLeft: wp('5%'),
        marginRight: wp('2.5%'),
        flex: 1,
        height: 'auto',
        borderRadius: wp('2%'),
    },
    deliveryBox: {
        marginHorizontal: wp('1.5%'),
        width: wp('88%'),
        marginVertical: hp('0.5%'),
        height: hp('14.5%'),
        borderRadius: wp('2%'),
        backgroundColor: Colors.white,
        padding: wp('2.5%')
    },
    addressTxt: {
        fontSize: wp('3.6%'),
        fontFamily: Fonts.Font_Reguler,
        color: Colors.text_color,
        textAlign: 'left',

    },
    deliveryAddressTxt: {
        textAlign: 'right',
        fontSize: wp('3.4%'),
        fontFamily: Fonts.Font_Reguler,
        color: Colors.link_color,
    },
    edit: {
        textAlign: 'right'
    },
    editView: { justifyContent: 'flex-start', },
    addressContent: {
        flexDirection: 'row',
    },

    cartContent: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        justifyContent: 'center',
        borderRadius: wp('2%'),
        marginLeft: wp('1%'),
    },
    cartBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('11%'),
        width: wp('90%'),
        flex: 0.85,
    },
    detailBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('11%'),
        flex: 1,
    },
    imageView: {
        flex: 0.30,
        backgroundColor: Colors.light_white,
        margin: wp('1%'),
        height: hp('8%'),
        borderRadius: wp('1.5%')
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: undefined,
        aspectRatio: 1,
        width: wp('15.5%')
    },
    infromationView: {
        flex: 0.70,
        marginBottom: hp('1.4%'),
        marginLeft: wp('1%'),
        marginTop: hp('1%'),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    name: {
        textAlign: 'center',
        color: Colors.text_color,
        fontSize: wp('3.8%'),
        fontFamily: Fonts.Font_Bold,
    },
    orderDate: {
        textAlign: 'center',
        color: Colors.secondry_text_color,
        lineHeight: hp('3%'),
        fontSize: wp('3.5%'),
        fontFamily: Fonts.Font_Regular,
    },
    orderStatuss: {
        fontFamily: Fonts.Font_Bold,
        fontSize: wp('3.5%'),
        color: Colors.text_color
    },
    priceView: {
        flex: 0.15,
        marginTop: hp('1%'),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: wp('2%')
    },
    price: {
        color: Colors.link_color,
        fontSize: wp('4%'),
        fontFamily: Fonts.Font_Semibold
    },
    leftView: {
        flex: 0.30,
        marginLeft: wp('3%'),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    rightView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 0.70
    },
    leftTxt: {
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('3.5%'),
        color: Colors.secondry_text_color
    },
    rightTxt: {
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('4%'),
        color: Colors.text_color
    },
    detailRow: {
        flexDirection: 'row',
        marginVertical: hp('0.4%')
    }
});