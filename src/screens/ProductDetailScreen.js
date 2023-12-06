import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import {
  OtrixContainer,
  OtrixContent,
  OtrixDivider,
  OtirxBackButton,
  OtrixLoader,
  SimilarProduct,
  SizeContainerComponent,
  RatingComponent,
  CartView,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RenderHtml from "react-native-render-html";
import { GlobalStyles, Colors } from "@helpers";
import { _roundDimensions } from "@helpers/util";
import ProductListDummy from "@component/items/ProductListDummy";
import { bottomCart, checkround2, close } from "@common";
import { SliderBox } from "react-native-image-slider-box";
import { Badge, ScrollView, Button } from "native-base";
import Fonts from "../helpers/Fonts";
import { addToCart } from "@actions";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import ImageViewer from "react-native-image-zoom-viewer";
import Stars from "react-native-stars";
import {
  getSingleProductRedux,
  addToCartRedux,
  addToWishlistRedux,
  removeFromWishlistRedux,
  setSpinnerRedux,
} from "../redux/Action";
import BottomSheet from "../component/CartComponent/BottomSheet";
import GradientButton from "../component/CartComponent/Button";
import cloudshopBD from "./cloudshopBd.png";

import Pill from "./Pill";
import { scale } from "react-native-size-matters";
import Toast from "react-native-simple-toast";
const COLORS = ["#3ad35c", Colors.themeColor, "#efcd19", "#ff1e1a"];

function ProductDetailScreen(props) {
  const { width } = useWindowDimensions();

  const [state, setState] = React.useState({
    loading: true,
    productCount: 1,
    fetchCart: false,
    selectedColor: 1,
    showZoom: false,
    zoomImages: [],
    msg: "",
    render: false,
    variation: null,
    quantity: 1,
    loader: true,
  });
  const sheetRef = useRef(null);
  const { loading, selectedColor, productCount, zoomImages, showZoom, msg } =
    state;
  const { cartData, product } = props;

  useEffect(() => {
    const { id } = props.route.params;

    const getProduct = async () => {
      console.log("getting product");
      if (product && product.id) {
        // do nothing if product is availbale
      } else {
        await props.getSingleProductRedux(id);
      }

      console.log("getting product finished");
    };
    getProduct();
  }, []);

  useEffect(() => {
    const { id } = props.route.params;
    const { product } = props;
    let obj = {};
    const getProduct = async () => {
      await props.getSingleProductRedux(id);

      if (
        product &&
        product.id &&
        product.savedAttributes &&
        product.savedAttributes.length > 0
      ) {
        console.log(product);
        product.savedAttributes.map((attribute, index) => {
          if (attribute.selectedTerms.length > 0) {
            obj["selectedTerm" + index] = attribute.selectedTerms[0];
          }
        });
      }
      let variation = getVariation(obj);
      setState({
        ...state,
        ...obj,
        variation,
        loading: false,
      });
    };
    getProduct();
  }, [product.id]);

  useEffect(() => {
    const { product } = props;
    let obj = {};
    if (
      state.render &&
      product &&
      product.id &&
      product.savedAttributes &&
      product.savedAttributes.length > 0
    ) {
      console.log(product);
      for (var key of Object.keys(state)) {
        if (key.includes("selectedTerm")) {
          obj[key] = state[key];
        }
      }
      let variation = getVariation(obj);

      setState({
        ...state,
        ...obj,
        variation,
        render: false,
        loading: false,
      });
    }
  }, [state.render]);

  const getVariation = (obj) => {
    const { product } = props;
    let selectedVariation = {};
    if (product && product.id && product.displayedVariations.length > 0) {
      product.displayedVariations.map((vari) => {
        let combinationIdArray = vari.combination.map((combination) => {
          return combination.id;
        });
        let ids = [];
        for (var key of Object.keys(obj)) {
          ids.push(obj[key].id);
        }

        if (combinationIdArray.sort().join(",") === ids.sort().join(",")) {
          selectedVariation = vari;
        }
      });
    }
    return selectedVariation;
  };

  let source = {};
  if (product && product.id) {
    source = {
      html: `${product.description}`,
    };
  }

  let images = [];
  if (product && product.id) {
    if (product.pictures.length > 0 && product.pictures2.length > 0) {
      const filteredPictures2 = product.pictures2.filter(
        (pic) => pic !== "/static/media/addProduct.3dff302b.png"
      );
      images = [...product.pictures, ...filteredPictures2];
    } else {
      images = [...product.pictures];
    }
  }

  const getPrice = (product) => {
    if (state.variation && state.variation.id) {
      if (state.variation.salePrice == 0) {
        return (
          <View style={styles.productPrice}>
            <Text style={styles.productPrice}>৳ {state.variation.price}</Text>
            <Text
              style={{
                ...styles.productPrice,
                textDecorationLine: "line-through",
                color: "white",
                fontSize: wp("3.7%"),
              }}
            >
              ৳ {state.variation.price}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={styles.productPrice}>
            <Text style={styles.productPrice}>
              ৳ {state.variation.salePrice}
            </Text>
            <Text
              style={{
                ...styles.productPrice,
                textDecorationLine: "line-through",
                color: "gray",
                fontSize: wp("3.7%"),
              }}
            >
              ৳ {state.variation.price}
            </Text>
          </View>
        );
      }
    } else {
      if (product.salePrice == 0) {
        return (
          <View style={styles.productPrice}>
            <Text style={styles.productPrice}> ৳ {product.price}</Text>
            <Text
              style={{
                ...styles.productPrice,
                textDecorationLine: "line-through",
                color: "white",
                fontSize: wp("3.7%"),
              }}
            >
              ৳ {product.price}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={styles.productPrice}>
            <Text style={styles.productPrice}> ৳ {product.salePrice}</Text>
            <Text
              style={{
                ...styles.productPrice,
                textDecorationLine: "line-through",
                color: "gray",
                fontSize: wp("3.7%"),
              }}
            >
              ৳ {product.price}
            </Text>
          </View>
        );
      }
    }
  };
  const getPrice2 = (product) => {
    if (state.variation && state.variation.id) {
      if (state.variation.salePrice == 0) {
        return state.variation.price;
      } else {
        return state.variation.salePrice;
      }
    } else {
      if (product && product.id) {
        if (product.salePrice == 0) {
          return product.price;
        } else {
          return product.salePrice;
        }
      } else {
        return 0;
      }
    }
  };

  const getTimeRemaining = () => {
    const date = new Date();
    const endtime = `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getDate()} ${date.getFullYear()} 23:59:59 GMT+0600`;

    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return (
      <View style={{ maxWidth: "95%", width: "95%" }}>
        <Text
          style={{
            color: "#292929",
            marginLeft: 5,
            fontSize: wp("3.2%"),
          }}
        >
          Order in The Next{" "}
          <Text
            style={{
              textDecorationLine: "underline",
              color: "#ff8084",
              fontWeight: "bold",
              fontSize: wp("3.2%"),
            }}
          >
            {hours} hours {minutes} minutes
          </Text>{" "}
          to get it by{" "}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: wp("3.2%"),
            }}
          >
            {date.toLocaleString("default", { month: "long" })}{" "}
            {date.getDate() + 2}, {date.getFullYear()}
          </Text>
          .
        </Text>
      </View>
    );
  };

  const calculateCart = () => {
    let cartProducts = props.cartData;
    let sumAmount = 0;

    //find and create array
    cartProducts &&
      cartProducts.length > 0 &&
      cartProducts.forEach(function (item, index) {
        let price = getPrice3(item);
        sumAmount += parseInt(price) * item.quantity;
      });

    return sumAmount;
  };
  const getPrice3 = (product) => {
    if (product.selectedVariation.id) {
      if (product.selectedVariation.salePrice == 0) {
        return product.selectedVariation.price;
      } else {
        return product.selectedVariation.salePrice;
      }
    } else {
      if (product.product) {
        if (product.product.salePrice == 0) {
          return product.product.price;
        } else {
          return product.product.salePrice;
        }
      } else {
        return 0;
      }
    }
  };

  console.log(state);

  return (
    <OtrixContainer customStyles={{ backgroundColor: "white" }}>
      {loading ? (
        <OtrixLoader />
      ) : product && product.id ? (
        <>
          {/* Product Detail View */}

          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              backgroundColor: "white",
              zIndex: 9999999,
              paddingBottom: 10,
            }}
          >
            <TouchableOpacity
              style={[
                GlobalStyles.headerLeft,
                { zIndex: 999999999, flex: 0.7, alignItems: "flex-start" },
              ]}
              onPress={() => {
                props.navigation.goBack();
                // props.emptyProductObjRedux(null)
              }}
            >
              <OtirxBackButton />
            </TouchableOpacity>
            <View
              style={[
                GlobalStyles.headerRight,
                {
                  zIndex: 999999999,
                  flex: 0.3,
                  backgroundColor: "transparent",
                  alignItems: "flex-end",
                },
              ]}
            >
              {props.wishlist &&
              props.wishlist.length > 0 &&
              props.wishlist.find((wish) => wish.id == product.id) ? (
                <TouchableOpacity
                  style={[styles.FavCircle, { left: wp("8%"), top: 0 }]}
                  onPress={async () => {
                    if (props.currentUser && props.currentUser.uid) {
                      let wishlistObj = product;
                      props.setSpinnerRedux(true);
                      await props.removeFromWishlistRedux(
                        wishlistObj,
                        props.currentUser
                      );
                      props.setSpinnerRedux(false);
                      Toast.show("item removed from wishlist.");
                    } else {
                      Toast.show("Please login first");
                    }
                  }}
                >
                  <FontAwesomeIcon
                    name="heart"
                    style={{ ...GlobalStyles.FavIcon, fontSize: wp("3.8%") }}
                    color={Colors.white}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.unFavCircle, { left: wp("8%"), top: 0 }]}
                  onPress={async () => {
                    if (props.currentUser && props.currentUser.uid) {
                      let wishlistObj = product;

                      props.setSpinnerRedux(true);
                      await props.addToWishlistRedux(
                        wishlistObj,
                        props.currentUser
                      );
                      props.setSpinnerRedux(false);
                      Toast.show("item added to wishlist.");
                    } else {
                      Toast.show(
                        "Please login first to add item into wishlist."
                      );
                    }
                  }}
                >
                  <FontAwesomeIcon
                    name="heart-o"
                    style={[GlobalStyles.unFavIcon, { fontSize: wp("3.8%") }]}
                    color={Colors.secondry_text_color}
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={() => props.navigation.navigate("HomeCartScreen")}
              >
                <Image source={bottomCart} style={styles.menuImage} />

                <Badge
                  style={[
                    GlobalStyles.badge,
                    {
                      left: wp("4.4%"),
                      top: hp("1.1%"),
                      height: cartData.length > 9 ? 30 : 24,
                      width: cartData.length > 9 ? 30 : 24,
                      backgroundColor: "#ffe0e1",
                    },
                  ]}
                >
                  <Text
                    style={[
                      GlobalStyles.badgeText,
                      {
                        color: Colors.themeColor,
                        fontSize: cartData.length > 9 ? wp("2.5%") : wp("3%"),
                      },
                    ]}
                  >
                    {cartData.length}
                  </Text>
                </Badge>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              marginTop: hp("3%"),
              marginLeft: wp("75%"),
              zIndex: 9999999,
            }}
          ></View>
          {/* Content Start from here */}

          <OtrixDivider size={"md"} />
          <ScrollView
            style={styles.childView}
            showsVerticalScrollIndicator={false}
          >
            {product.pictures.length > 0 && (
              <View style={{ paddingTop: 10, marginTop: 10 }}>
                <SliderBox
                  images={images}
                  onCurrentImagePressed={(index) =>
                    setState({ ...state, showZoom: true })
                  }
                  dotColor={Colors.themeColor}
                  inactiveDotColor="#90A4AE"
                  sliderBoxHeight={hp("45%")}
                  paginationBoxVerticalPadding={20}
                  autoplay={true}
                  ImageComponentStyle={{
                    width: "100%",
                  }}
                  circleLoop={true}
                  resizeMode={"cover"}
                  dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 15,
                    marginHorizontal: 0,
                    padding: 0,
                    margin: 0,
                  }}
                />
              </View>
            )}
            <OtrixContent customStyles={styles.productDetailView}>
              <View style={{ ...styles.subContainer, marginTop: 10 }}>
                <Text style={styles.headingTxt}>{product.name}</Text>
                <Text
                  style={[
                    styles.stock,
                    {
                      color:
                        product.stockStatus == "In stock"
                          ? "#5ddb79"
                          : "#fe151b",
                    },
                    { marginTop: hp(".3%") },
                  ]}
                >
                  {product.stockStatus}
                </Text>
              </View>
              <View style={{ marginTop: 2 }}>
                {product.selectedCategories.map((cat) => (
                  <Text style={{ color: "gray", fontSize: wp("3%") }}>
                    {cat.name},
                  </Text>
                ))}
              </View>
              <OtrixDivider size={"sm"} />
              {/* Price Container*/}
              <View style={styles.subContainer}>
                {getPrice(product)}
                <View style={styles.starView}>
                  <Stars
                    default={0}
                    count={5}
                    half={true}
                    starSize={45}
                    fullStar={
                      <FontAwesomeIcon
                        name={"star"}
                        size={wp("3.5%")}
                        style={[styles.myStarStyle]}
                      />
                    }
                    emptyStar={
                      <FontAwesomeIcon
                        name={"star-o"}
                        size={wp("3.5%")}
                        style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                      />
                    }
                    halfStar={
                      <FontAwesomeIcon
                        name={"star-half-empty"}
                        size={wp("3.5%")}
                        style={[styles.myStarStyle]}
                      />
                    }
                    disabled={true}
                  />
                  <Text style={styles.reviewTxt}>(0 Reviews)</Text>
                </View>
              </View>
              <OtrixDivider size={"sm"} />
              <View>
                <TouchableWithoutFeedback>
                  {product.selectedBrands.length > 0 &&
                  product.selectedBrands[0].logo &&
                  product.selectedBrands[0].logo !=
                    "/static/media/plus image.3dff302b.jpeg" ? (
                    <Image
                      source={{
                        uri: product.selectedBrands[0].logo,
                      }}
                      style={{
                        width: wp("18%"),
                        height: wp("18%"),
                        borderColor: "gainsboro",
                        borderWidth: 2,
                        borderRadius: 5,
                      }}
                    />
                  ) : (
                    <Image
                      source={cloudshopBD}
                      style={{
                        width: wp("20%"),
                        height: wp("18%"),
                        borderColor: "gainsboro",
                        borderWidth: 2,
                        borderRadius: 5,
                      }}
                    />
                  )}
                </TouchableWithoutFeedback>
              </View>
              <OtrixDivider size={"md"} />
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#ff8084",
                  borderRadius: 5,
                  borderStyle: "dashed",
                  padding: 10,
                  paddingVertical: 13,
                  backgroundColor: "#fffbfc",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text>
                    {" "}
                    <FontAwesomeIcon
                      name={"clock-o"}
                      style={[styles.myStarStyle2]}
                    />
                  </Text>
                  {getTimeRemaining()}
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginTop: 5,
                  }}
                >
                  <Text>
                    {" "}
                    <FontAwesomeIcon
                      name={"truck"}
                      style={[styles.myStarStyle2]}
                    />
                  </Text>
                  <Text
                    style={{
                      color: "#292929",
                      marginLeft: 5,
                      fontSize: wp("3.2%"),
                    }}
                  >
                    Spend{" "}
                    <Text
                      style={{
                        color: "#ff8084",
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                        fontSize: wp("3.2%"),
                      }}
                    >
                      Tk {props.freeShipping}{" "}
                    </Text>
                    to get Free Shipping.
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 7,
                  }}
                >
                  <Text
                    style={{
                      paddingTop: scale(10),
                      fontSize: wp("3.2%"),
                      color: "gray",
                      fontWeight: "bold",
                    }}
                  >
                    {getPrice2(product)} * {state.quantity}
                  </Text>
                  <Pill
                    decrementQuantity={() => {
                      setState({
                        ...state,
                        quantity: state.quantity == 1 ? 1 : state.quantity - 1,
                      });
                    }}
                    incrementQuantity={() => {
                      setState({
                        ...state,
                        quantity: state.quantity + 1,
                      });
                    }}
                    quantity={state.quantity}
                  />
                </View>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: wp("3.2%"),
                    marginTop: -5,
                  }}
                >
                  Total: ৳ {parseFloat(getPrice2(product)) * state.quantity}
                </Text>
              </View>
              {/* Color */}
              <OtrixDivider size={"md"} />
              <View style={GlobalStyles.horizontalLine}></View>
              {product.savedAttributes.length > 0 &&
                product.savedAttributes.map((attribute, index) => (
                  <>
                    <OtrixDivider size={"sm"} />
                    <View>
                      <Text
                        style={[styles.headingTxt, { fontSize: wp("3.2%") }]}
                      >
                        Choose {attribute.name}
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          flexWrap: "wrap",
                          width: "100%",
                          alignItems: "flex-start",
                        }}
                      >
                        {attribute.selectedTerms.map((term) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                setState({
                                  ...state,
                                  ["selectedTerm" + index]: term,
                                  render: true,
                                });
                              }}
                            >
                              <View
                                style={{
                                  padding: wp("3%"),
                                  borderColor:
                                    state["selectedTerm" + index] &&
                                    state["selectedTerm" + index].id == term.id
                                      ? "#EC345B"
                                      : "gray",
                                  borderWidth: 1,
                                  borderRadius: 5,
                                  margin: 7,
                                  marginLeft: 0,
                                }}
                              >
                                <Text
                                  style={{
                                    color:
                                      state["selectedTerm" + index] &&
                                      state["selectedTerm" + index].id ==
                                        term.id
                                        ? "#EC345B"
                                        : "gray",
                                    fontSize: wp("3%"),
                                  }}
                                >
                                  {term.name}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  </>
                ))}
              {product.savedAttributes.length > 0 && (
                <>
                  <OtrixDivider size={"md"} />
                  <View style={GlobalStyles.horizontalLine}></View>
                </>
              )}

              <View style={GlobalStyles.horizontalLine}></View>
              <OtrixDivider size={"md"} />

              {/* Sizes Container*/}
              {/* <SizeContainerComponent productData={productDetail} /> */}

              {/* Description Container*/}
              <Text style={[styles.headingTxt, { fontSize: wp("3.8%") }]}>
                Description
              </Text>
              <OtrixDivider size={"sm"} />
              <RenderHtml contentWidth={width} source={source} />
              <OtrixDivider size={"md"} />
              <View style={GlobalStyles.horizontalLine}></View>

              {/* Rating Container*/}
              {/* <RatingComponent productData={productDetail} /> */}

              {/* Similar Product Component */}
              <SimilarProduct
                navigation={props.navigation}
                item={product.selectedCategories[0]}
              />
              <View style={{ marginBottom: 60 }}></View>
            </OtrixContent>
          </ScrollView>

          {/* Zoom image */}
          <Modal visible={showZoom} transparent={true}>
            <ImageViewer
              imageUrls={zoomImages}
              saveToLocalByLongPress={false}
              backgroundColor={Colors.light_white}
              renderIndicator={(currentIndex, allSize) => {
                return (
                  <View style={styles.pageindexview}>
                    <TouchableOpacity
                      onPress={() => setState({ ...state, showZoom: false })}
                      style={{ padding: 8 }}
                    >
                      <Image square source={close} style={styles.cancleIcon} />
                    </TouchableOpacity>
                    <Text style={styles.pageindextext}>
                      {currentIndex} / {allSize}
                    </Text>
                  </View>
                );
              }}
            />
          </Modal>

          {/* Bottom View */}

          <View
            style={{
              position: "absolute",
              bottom: -10,
              padding: 10,
              backgroundColor: "white",
              display: "flex",
              flexDirection: "row",

              minWidth: "100%",
            }}
          >
            {props.currentUser && props.currentUser.id ? (
              <GradientButton
                // label={"ADD TO CART ->"}
                onPress={async () => {
                  let cartObj = {
                    quantity: state.quantity,
                    productId: props.product.id,
                    product: props.product,
                    selectedVariation: state.variation ? state.variation : null,
                  };

                  sheetRef.current.open();
                  setState({
                    ...state,
                    loader: true,
                  });
                  Toast.show("item added to cart.");
                  await props.addToCartRedux(cartObj, props.currentUser);
                  setState({
                    ...state,
                    loader: false,
                  });
                }}
                children={
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: wp("3.1%"),
                      }}
                    >
                      Total ৳ {parseFloat(getPrice2(product)) * state.quantity}
                    </Text>
                    <View
                      style={{
                        height: "100%",
                        width: 2,
                        backgroundColor: "white",
                      }}
                    ></View>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: wp("3.1%"),
                      }}
                    >
                      Add to cart{" "}
                      <Text style={{ marginTop: -5 }}>
                        <FontAwesomeIcon name={"arrow-right"} />
                      </Text>
                    </Text>
                  </View>
                }
              />
            ) : (
              <GradientButton
                // label={"ADD TO CART ->"}
                onPress={() => {
                  props.navigation.navigate("LoginScreen");
                  Toast.show("Please login or create account to order.");
                }}
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
                      Please Login or Create account to order{" "}
                      <Text style={{ marginTop: -5 }}>
                        <FontAwesomeIcon name={"arrow-right"} />
                      </Text>
                    </Text>
                  </View>
                }
              />
            )}
          </View>
        </>
      ) : null}
      {msg != "" && (
        <Text
          style={{
            textAlign: "center",
            backgroundColor: "red",
            color: "white",
            padding: 10,
          }}
        >
          {msg}
        </Text>
      )}

      <BottomSheet sheetRef={sheetRef} buttonText="Confirm" height={hp("80%")}>
        {state.loader ? (
          <View
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <View style={[styles.container2, styles.horizontal]}>
              <ActivityIndicator size="small" color="gray" />
            </View>
          </View>
        ) : (
          <>
            <View style={styles.sheet}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  paddingBottom: 15,
                }}
              >
                <Text weight="medium" style={styles.select}>
                  YOUR SHOPPING CART
                </Text>

                <TouchableOpacity
                  style={[
                    GlobalStyles.headerLeft,
                    { zIndex: 999999999, flex: 0.9, alignItems: "flex-end" },
                  ]}
                  onPress={() => sheetRef.current.close()}
                >
                  <MaterialIconsIcon name="close" style={styles.close} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ marginBottom: 35 }}>
                <CartView
                  navigation={props.navigation}
                  products={cartData}
                  bottomSheet={true}
                  sumAmount={calculateCart()}
                />
              </ScrollView>
            </View>

            <View
              style={{
                position: "absolute",
                bottom: 20,
                padding: 10,
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                minWidth: "100%",
              }}
            >
              <GradientButton
                onPress={() => {
                  sheetRef.current.close();
                  setTimeout(() => {
                    props.navigation.navigate("HomeCartScreen");
                  }, 400);
                }}
                children={
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: wp("3.1%"),
                      }}
                    >
                      Total ৳ {calculateCart()}
                    </Text>
                    <View
                      style={{
                        height: "100%",
                        width: 2,
                        backgroundColor: "white",
                      }}
                    ></View>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: wp("3.1%"),
                      }}
                    >
                      View cart{" "}
                      <Text style={{ marginTop: -5 }}>
                        <FontAwesomeIcon name={"arrow-right"} />
                      </Text>
                    </Text>
                  </View>
                }
              />
            </View>
          </>
        )}
      </BottomSheet>
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
    product: state.products.productObj
      ? state.products.productObj
      : { id: null },
    currentUser: state.auth.currentUser,
    freeShipping: state.cart.freeShipping,
    wishlist: state.wishlist.wishlist,
  };
}

export default connect(mapStateToProps, {
  addToCart,
  getSingleProductRedux,
  addToCartRedux,
  addToWishlistRedux,
  removeFromWishlistRedux,
  setSpinnerRedux,
})(ProductDetailScreen);

const styles = StyleSheet.create({
  productDetailView: {
    backgroundColor: Colors.white,
    marginHorizontal: wp("5%"),
  },
  sheet: {
    padding: 10,
    marginBottom: hp("10%"),
  },
  select: {
    fontSize: wp("3.8%"),
    color: "#ec345b",
    fontWeight: "bold",
  },
  close: {
    fontSize: wp("6%"),
    color: "#ec345b",
    fontWeight: "bold",
    marginRight: 5,
    marginTop: -4,
  },
  container: {
    height: hp("40%"),

    backgroundColor: Colors.light_white,
    zIndex: 99,
  },
  childView: {
    paddingBottom: hp("1.8%"),
  },
  menuImage: {
    width: wp("7%"),
    height: hp("7%"),
    resizeMode: "contain",
    tintColor: Colors.themeColor,
  },
  colorView: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  colorContainer: {
    flex: 0.75,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTxt: {
    fontSize: wp("4%"),
    fontFamily: Fonts.Font_Reguler,
    color: Colors.secondry_text_color,
  },
  box: {
    height: hp("3.5%"),
    width: wp("8%"),
    flexDirection: "row",
    marginHorizontal: wp("2%"),
    backgroundColor: Colors.white,
    justifyContent: "center",
    borderRadius: 5,
    borderColor: Colors.light_gray,
    borderWidth: 1,
    alignItems: "center",
  },
  borderBox: {
    borderColor: Colors.themeColor,
    borderWidth: 1,
  },
  colorimageView: {
    height: hp("2%"),
    width: wp("4%"),
    borderRadius: 50,
    marginHorizontal: wp("1%"),
  },
  arrowRight: {
    fontSize: wp("3.5%"),
    textAlign: "center",
    textAlignVertical: "center",
    color: Colors.text_color,
  },
  heartIconView: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
  },
  headingTxt: {
    fontSize: wp("4.5%"),
    fontFamily: Fonts.Font_Bold,
    textAlignVertical: "center",
    color: "#4d5156",
    flex: 0.8,
  },
  subContainer: {
    flexDirection: "row",
  },
  stock: {
    flex: 0.2,
    fontSize: wp("3.5%"),
    textAlignVertical: "center",
    fontFamily: Fonts.Font_Semibold,
    textAlign: "right",
  },
  productPrice: {
    fontSize: wp("5.5%"),
    fontFamily: Fonts.Font_Bold,
    textAlignVertical: "center",
    color: Colors.themeColor,
    flex: 0.8,
  },
  starView: {
    flex: 0.2,
  },
  myStarStyle: {
    color: "#ffd12d",
    backgroundColor: "transparent",
    marginHorizontal: 1,
    textShadowRadius: 1,
  },
  myStarStyle2: {
    color: "black",
    marginHorizontal: 1,
    fontSize: wp("5%"),
    fontWeight: "bold",
  },
  myEmptyStarStyle: {
    color: "gray",
  },
  reviewTxt: {
    fontFamily: Fonts.Font_Reguler,
    fontSize: wp("2.5%"),
    marginTop: hp("0.3%"),
    textAlign: "center",
    color: Colors.secondry_text_color,
  },
  description: {
    fontSize: wp("3.5%"),
    fontFamily: Fonts.Font_Reguler,
    lineHeight: hp("2.4%"),
    color: Colors.secondry_text_color,
  },

  footerView: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    height: hp("7.5%"),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    borderTopColor: Colors.light_gray,
    borderTopWidth: 1,
  },
  countBox: {
    backgroundColor: Colors.light_white,
    flexDirection: "row",
    flex: 0.2,
    height: hp("4.8%"),
    marginHorizontal: wp("1%"),
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    borderRadius: 5,
    justifyContent: "center",
  },
  unFavCircle: {
    backgroundColor: "#ffdcde",
    height: _roundDimensions()._height * 0.037,
    width: _roundDimensions()._height * 0.037,
    borderRadius: _roundDimensions()._borderRadius,
    position: "absolute",
    top: hp("1.2%"),
    left: wp("32%"),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  FavCircle: {
    backgroundColor: "#ec345b",
    height: _roundDimensions()._height * 0.037,
    width: _roundDimensions()._height * 0.037,
    borderRadius: _roundDimensions()._borderRadius,
    position: "absolute",
    top: hp("1.2%"),
    left: wp("32%"),
    justifyContent: "center",
    alignItems: "flex-end",
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  countTxt: {
    fontSize: wp("4.5%"),
    flex: 0.6,
    textAlign: "center",
    textAlignVertical: "center",
    color: Colors.text_color,
    fontFamily: Fonts.Font_Semibold,
    alignSelf: "center",
  },
  arrowContainer: {
    flex: 0.4,
    flexDirection: "column",
    borderLeftColor: "gainsboro",
    borderLeftWidth: 1,
    paddingLeft: 5,
  },
  plusminusArrow: {
    fontSize: wp("5.2%"),
  },
  cancleIcon: {
    marginLeft: wp("3%"),
    height: wp("6%"),
    width: wp("6%"),
    tintColor: Colors.black,
  },
  pageindexview: {
    position: "absolute",
    marginTop: wp("4.5%"),
    flexDirection: "row",
  },
  pageindextext: {
    width: wp("15%"),
    textAlign: "center",
    fontSize: wp("4.5%"),
    color: Colors.black_text,
    marginHorizontal: wp("34%"),
  },
  container2: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
