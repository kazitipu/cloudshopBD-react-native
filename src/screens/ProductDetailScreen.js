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
  TextInput,
  Platform,
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
import { avatarImg2 } from "@common";
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
import { Badge, ScrollView, Button, Avatar } from "native-base";
import Fonts from "../helpers/Fonts";
import { addToCart } from "@actions";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import ImageViewer from "react-native-image-zoom-viewer";
import Stars from "react-native-stars";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  getSingleProductRedux,
  addToCartRedux,
  addToWishlistRedux,
  removeFromWishlistRedux,
  setSpinnerRedux,
  updateSingleProductRedux,
} from "../redux/Action";
import BottomSheet from "../component/CartComponent/BottomSheet";
import GradientButton from "../component/CartComponent/Button";
import cloudshopBD from "./cloudshopBd.png";
import Pill from "./Pill";
import { scale } from "react-native-size-matters";
import Toast from "react-native-simple-toast";
import ModalPoup from "./successModal";
import { uploadImageD2dExpressProduct } from "../firebase/firebase.utils";
const COLORS = ["#3ad35c", Colors.themeColor, "#efcd19", "#ff1e1a"];

function ProductDetailScreen(props) {
  const { width } = useWindowDimensions();
  const [option, setOption] = React.useState("Description");
  const [review, setReview] = React.useState("");
  const [star, setStar] = React.useState(0);
  const [state, setState] = React.useState({
    loading: true,
    productCount: 1,
    fetchCart: false,
    selectedColor: 1,
    showZoom: false,
    zoomImages: [],
    msg: "",
    render: false,
    getPicture: false,
    variation: null,
    quantity: 1,
    loader: true,
    image: require("../assets/images/plus.jpeg"),
    visible: false,
    imageUrl: "",
    imageLoading: false,
    productFetched: false,
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
    console.log(product.name);
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
        productFetched: true,
      });
    };
    if (!state.productFetched) {
      getProduct();
    }
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
      console.log(variation);
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

  const imageGalleryLaunch = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchImageLibrary(options, async (res) => {
      console.log("Response = ", res);
      if (res.didCancel) {
        setState({ ...state, visible: false });
        console.log("User cancelled image picker");
      } else if (res.error) {
        setState({ ...state, visible: false });
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        setState({ ...state, visible: false });
        console.log("User tapped custom button: ", res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.assets[0].uri };
        setState({
          ...state,
          image: source,
          fileName: res.assets[0].fileName,
          visible: false,
        });
        console.log(source);
        if (source.uri) {
          setState({ ...state, imageLoading: true });

          let response = await fetch(source.uri);
          let blob = await response.blob();
          let fileName2 = `${res.assets[0].fileName}${Date.now()}`;
          let imgUrl = await uploadImageD2dExpressProduct(blob, fileName2);
          console.log(imgUrl);
          setState({
            ...state,
            imageUrl: imgUrl,
            imageLoading: false,
            image: source,
            visible: false,
          });
        }
      }
    });
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
            {hours ? hours : "6"} hours {minutes ? minutes : "00"} minutes
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

  const getStar = (product) => {
    if (product.reviews && product.reviews.length > 0) {
      let averageStar = 0;
      product.reviews.map((review) => {
        averageStar += parseInt(review.star);
      });
      return averageStar / product.reviews.length;
    } else {
      return 0;
    }
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
  if (props.product) {
    console.log(props.product.name);
  }

  return (
    <OtrixContainer customStyles={{ backgroundColor: "white" }}>
      <ModalPoup visible={state.visible}>
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setState({ ...state, visible: false })}
            >
              <Image
                source={require("../assets/images/x.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            imageGalleryLaunch();
          }}
        >
          <View
            style={{
              paddingVertical: 10,

              alignItems: "center",
              borderColor: "gainsboro",
              borderTopWidth: 1,
            }}
          >
            <Text>Choose from Photos</Text>
          </View>
        </TouchableWithoutFeedback>
      </ModalPoup>
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
                      await props.updateSingleProductRedux({
                        ...product,
                        wishlist: product.wishlist ? product.wishlist - 1 : 0,
                      });
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
                      await props.updateSingleProductRedux({
                        ...product,
                        wishlist: product.wishlist ? product.wishlist + 1 : 1,
                      });
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
                  images={
                    state.getPicture &&
                    state.variation &&
                    state.variation.id &&
                    state.variation.pictures &&
                    state.variation.pictures.length > 0
                      ? state.variation.pictures
                      : images
                  }
                  onCurrentImagePressed={(index) =>
                    setState({
                      ...state,
                      showZoom: true,
                      zoomImages:
                        state.getPicture &&
                        state.variation &&
                        state.variation.id &&
                        state.variation.pictures &&
                        state.variation.pictures.length > 0
                          ? state.variation.pictures
                          : images,
                    })
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

              {/* Price Container*/}
              <Text
                style={{
                  ...styles.reviewTxt,
                  textAlign: "left",
                  fontSize: wp("2.7%"),
                }}
              >
                Total Sold:{product.totalSold ? product.totalSold : 0}
              </Text>
              <Text
                style={{
                  ...styles.reviewTxt,
                  textAlign: "left",
                  fontSize: wp("2.7%"),
                }}
              >
                Wishlist:{product.wishlist ? product.wishlist : 0}
              </Text>
              <OtrixDivider size={"sm"} />
              <View style={styles.subContainer}>
                {getPrice(product)}
                <View style={styles.starView}>
                  <Stars
                    default={getStar(product)}
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
                  <Text style={styles.reviewTxt}>
                    ({product.reviews ? product.reviews.length : 0} Reviews)
                  </Text>
                </View>
              </View>
              <OtrixDivider size={"sm"} />

              {product.selectedBrands && product.selectedBrands.length > 0 ? (
                <TouchableWithoutFeedback
                  onPress={() =>
                    props.navigation.replace("ProductListScreenByBrands", {
                      title: product.selectedBrands[0].name,
                      item: product.selectedBrands[0],
                    })
                  }
                >
                  <View>
                    <Text
                      style={{
                        color: "#ff8084",
                        textDecorationLine: "underline",
                      }}
                    >
                      {product.selectedBrands && product.selectedBrands[0].name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ) : null}

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
                    to get Free Delivery.
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
                <TouchableOpacity
                  onPress={async () => {
                    let cartObj = {
                      quantity: state.quantity,
                      productId: props.product.id,
                      product: props.product,
                      selectedVariation: state.variation
                        ? state.variation
                        : null,
                    };

                    props.setSpinnerRedux(true);
                    await props.addToCartRedux(cartObj, props.currentUser);
                    props.setSpinnerRedux(false);
                    props.navigation.navigate("HomeCartScreen");
                  }}
                >
                  <View
                    style={{
                      padding: 8,
                      paddingLeft: 22,
                      paddingRight: 22,
                      backgroundColor: "orange",
                      alignSelf: "flex-end",
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      <FontAwesomeIcon
                        name={"shopping-bag"}
                        style={{ color: "white" }}
                      />
                      {"  "}Buy Now
                    </Text>
                  </View>
                </TouchableOpacity>
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
                                  getPicture: true,
                                });
                              }}
                            >
                              <View
                                style={{
                                  padding: wp("3%"),
                                  borderColor:
                                    state["selectedTerm" + index] &&
                                    state["selectedTerm" + index].id == term.id
                                      ? "#ec345b"
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

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 10,
                    paddingTop: 0,
                    borderBottomWidth: 1,
                    borderBottomColor:
                      option == "Description" ? "#ec345b" : "white",
                  }}
                  onPress={() => {
                    setOption("Description");
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp("3.8%"),
                      color: option == "Description" ? "#ec345b" : "#555",
                    }}
                  >
                    Description
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    paddingTop: 0,
                    borderBottomWidth: 1,
                    borderBottomColor:
                      option == "Reviews" ? "#ec345b" : "white",
                  }}
                  onPress={() => {
                    setOption("Reviews");
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp("3.8%"),
                      color: option == "Reviews" ? "#ec345b" : "#555",
                    }}
                  >
                    Reviews
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    paddingTop: 0,
                    borderBottomWidth: 1,
                    borderBottomColor:
                      option == "Add Review" ? "#ec345b" : "white",
                  }}
                  onPress={() => {
                    setOption("Add Review");
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp("3.8%"),
                      color: option == "Add Review" ? "#ec345b" : "#555",
                    }}
                  >
                    Add Review
                  </Text>
                </TouchableOpacity>
              </View>
              <OtrixDivider size={"sm"} />
              {option === "Description" && (
                <RenderHtml contentWidth={width} source={source} />
              )}
              {option === "Add Review" && (
                <>
                  {props.currentUser && props.currentUser.uid ? (
                    <>
                      {product.reviews &&
                      product.reviews.length > 0 &&
                      product.reviews.find(
                        (review) => review.id == props.currentUser.uid
                      ) ? (
                        <Text
                          style={{
                            textAlign: "center",
                            marginTop: 10,
                            marginBottom: 130,
                            color: "#666",
                            fontWeight: "bold",
                            fontSize: wp("3.7%"),
                          }}
                        >
                          You have already added a review for this product.
                        </Text>
                      ) : (
                        <View
                          style={{
                            padding: 20,
                            borderWidth: 1,
                            borderColor: "gainsboro",
                            borderRadius: 10,
                            paddingBottom: 40,
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              fontWeight: "bold",
                              marginBottom: 15,
                              color: "#444",
                            }}
                          >
                            Rate the Product
                          </Text>

                          <Stars
                            default={parseInt(star)}
                            count={5}
                            half={false}
                            fullStar={
                              <FontAwesomeIcon
                                name={"star"}
                                size={wp("10%")}
                                style={[styles.myStarStyle]}
                              />
                            }
                            emptyStar={
                              <FontAwesomeIcon
                                name={"star-o"}
                                size={wp("10%")}
                                style={[
                                  styles.myStarStyle,
                                  styles.myEmptyStarStyle,
                                  { color: "gainsboro" },
                                ]}
                              />
                            }
                            halfStar={
                              <FontAwesomeIcon
                                name={"star-half-empty"}
                                size={wp("10%")}
                                style={[styles.myStarStyle]}
                              />
                            }
                            disabled={false}
                            update={(value) => {
                              console.log(value);
                              setStar(value);
                            }}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontWeight: "bold",
                              marginTop: 20,
                              color: "#444",
                            }}
                          >
                            Please share your opinion about the product
                          </Text>
                          <TextInput
                            value={review}
                            placeholder="Write your review here"
                            style={{
                              ...GlobalStyles.textInputStyle,
                              borderWidth: 1,
                              borderColor: "gainsboro",
                              borderRadius: 5,
                              color: "#555",
                              marginTop: 15,
                              backgroundColor: "white",
                              height: hp("20%"),
                              marginBottom: 10,
                              textAlignVertical: "top",
                            }}
                            onChangeText={(value) => setReview(value)}
                            multiline={true}
                          />
                          <View
                            style={{
                              marginTop: 5,
                            }}
                          >
                            <Text
                              style={{
                                color: "#555",
                                fontSize: 13,
                                marginBottom: 5,
                              }}
                            >
                              Product Image (optional)
                            </Text>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                if (state.imageLoading) {
                                  return;
                                }
                                setState({ ...state, visible: true });
                              }}
                            >
                              <View
                                style={{
                                  borderColor: "gainsboro",
                                  borderWidth: 1,
                                  height: 155,
                                  width: 155,
                                  borderRadius: 10,
                                  marginBottom: 20,
                                  justifyContent: "center",
                                }}
                              >
                                {state.imageLoading ? (
                                  <ActivityIndicator
                                    size="small"
                                    color="#ec345b"
                                  />
                                ) : (
                                  <Image
                                    source={state.image}
                                    style={{
                                      height: "100%",
                                      width: "100%",
                                      borderRadius: 10,
                                    }}
                                  />
                                )}
                              </View>
                            </TouchableWithoutFeedback>
                          </View>
                          <GradientButton
                            // label={"ADD TO CART ->"}
                            onPress={async () => {
                              if (state.imageLoading) {
                                Toast.show(
                                  "Image still uploading. Please wait"
                                );
                                return;
                              }
                              props.setSpinnerRedux(true);
                              let date = new Date();
                              await props.updateSingleProductRedux({
                                ...product,
                                reviews:
                                  product.reviews && product.reviews.length > 0
                                    ? [
                                        {
                                          user: props.currentUser,
                                          id: props.currentUser.uid,
                                          reviewText: review,
                                          star: star,
                                          date: date.toLocaleDateString(
                                            "en-GB"
                                          ),
                                          imageUrl: state.imageUrl,
                                          time: date.getTime().toString(),
                                        },
                                        ...product.reviews,
                                      ]
                                    : [
                                        {
                                          user: props.currentUser,
                                          id: props.currentUser.uid,
                                          reviewText: review,
                                          star: star,
                                          date: date.toLocaleDateString(
                                            "en-GB"
                                          ),
                                          imageUrl: state.imageUrl,
                                          time: date.getTime().toString(),
                                        },
                                      ],
                              });
                              setReview("");
                              setStar(0);
                              setOption("Reviews");
                              props.setSpinnerRedux(false);
                              Toast.show("Review added.");
                              setState({
                                ...state,
                                imageLoading: false,
                              });
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
                                  Add review
                                </Text>
                              </View>
                            }
                          />
                        </View>
                      )}
                    </>
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        marginBottom: 130,
                        color: "#666",
                        fontWeight: "bold",
                        fontSize: wp("3.7%"),
                      }}
                    >
                      You must login first to add a review.
                    </Text>
                  )}
                </>
              )}

              {option == "Reviews" && (
                <View style={{ marginTop: 10, padding: 10 }}>
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review) => (
                      <View style={{ marginBottom: 40 }}>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <Avatar
                              ml="1"
                              size="sm"
                              style={styles.avatarImg}
                              source={avatarImg2}
                            ></Avatar>
                            <View
                              style={{
                                marginLeft: 10,
                                marginTop: 3,
                                alignSelf: "flex-start",
                                alignItems: "flex-start",
                              }}
                            >
                              <Text>{review.user.displayName}</Text>

                              <Stars
                                default={review.star}
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
                                    style={[
                                      styles.myStarStyle,
                                      styles.myEmptyStarStyle,
                                    ]}
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
                            </View>
                          </View>
                          <View style={{ alignItems: "flex-end" }}>
                            <Text
                              style={{
                                color: "#444",
                                marginTop: 3,
                                fontSize: wp("3.3%"),
                              }}
                            >
                              {review.date}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text
                            style={{
                              color: "#555",
                              textAlign: "left",
                              marginTop: 6,
                              fontSize: wp("3.3%"),
                            }}
                          >
                            {review.reviewText}
                          </Text>
                          {review.imageUrl && review.imageUrl !== "" ? (
                            <TouchableWithoutFeedback
                              onPress={() =>
                                setState({
                                  ...state,
                                  showZoom: true,
                                  zoomImages: [review.imageUrl],
                                })
                              }
                            >
                              <View
                                style={{
                                  borderColor: "gainsboro",
                                  borderWidth: 1,
                                  height: 100,
                                  width: 100,
                                  borderRadius: 10,
                                  marginTop: 7,
                                }}
                              >
                                <Image
                                  source={{ uri: review.imageUrl }}
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    borderRadius: 10,
                                  }}
                                />
                              </View>
                            </TouchableWithoutFeedback>
                          ) : null}
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        marginBottom: 130,
                        color: "#666",
                        fontWeight: "bold",
                        fontSize: wp("3.7%"),
                      }}
                    >
                      This Product has no reviews yet.
                    </Text>
                  )}
                </View>
              )}
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
              imageUrls={zoomImages.map((image) => {
                return { url: image };
              })}
              saveToLocalByLongPress={false}
              backgroundColor={Colors.light_white}
              renderIndicator={(currentIndex, allSize) => {
                return (
                  <View style={styles.pageindexview}>
                    <TouchableOpacity
                      onPress={() => setState({ ...state, showZoom: false })}
                      style={{
                        padding: 8,
                        marginTop: Platform.OS == "ios" ? 10 : 0,
                      }}
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
              bottom: Platform.OS === "ios" ? -10 : 0,
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
                bottom: Platform.OS === "ios" ? 20 : 0,
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
  updateSingleProductRedux,
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
  avatarImg: {
    height: wp("4.5%"),
    width: wp("4.5%"),
    resizeMode: "contain",
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
