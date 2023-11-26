// import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
// import storage from "@react-native-firebase/storage";

export const signInWithGoogle = () => {};
export const singInWithFacebook = () => auth.signInWithPopup(facebookProvider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  if (userAuth && userAuth.isAnonymous) return;

  const adminRef = firestore().doc(`admins/${userAuth.uid}`);
  const adminSnapShot = await adminRef.get();
  if (adminSnapShot.exists) return;
  const userRef = firestore().doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    console.log(userAuth);
    const { email, displayName } = userAuth;
    const createdAt = new Date();
    try {
      console.log("creating snapshot");
      const userCount = await incrementUserCountByOne();
      await userRef.set({
        userId: userCount < 10 ? `0${userCount}` : `${userCount}`,
        uid: userAuth.uid,
        email,
        createdAt,
        ...additionalData,
        ...(displayName ? { displayName } : {}),
        myWallet: 0,
        address: "",
        status: "Customer",
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

const incrementUserCountByOne = async () => {
  const countRef = firestore().doc(`userCount/count`);
  const snapShot = await countRef.get();
  if (!snapShot.exists) {
    try {
      await countRef.set({
        userCount: 1,
      });
    } catch (error) {
      alert(error);
    }
  } else {
    try {
      await countRef.update({
        userCount: snapShot.data().userCount + 1,
      });
    } catch (error) {
      alert(error);
    }
  }
  const updatedSnapShot = await countRef.get();
  return updatedSnapShot.data().userCount;
};

export const uploadImage = async (currentUser, file, fileName) => {
  const imageRef = storage().ref(`users/${fileName}`);
  try {
    await imageRef.put(file);
    var imgUrl = [];
    await imageRef.getDownloadURL().then((url) => {
      console.log(url);
      imgUrl.push(url);
    });
    const userRef = firestore().doc(`users/${currentUser.uid}`);
    const snapShot = await userRef.get();
    console.log(snapShot.data());
    try {
      userRef.update({
        imageUrl: imgUrl[0],
      });
    } catch (error) {
      alert(error);
    }
    const updatedSnapShot = await userRef.get();
    return updatedSnapShot.data();
  } catch (error) {
    return null;
  }
};
export const uploadImageRechargeRequest = async (file, fileName) => {
  console.log(file.name);
  const imageRef = storage().ref(`rechargeRequests/${fileName}`);

  // try {
  await imageRef.put(file);

  var imgUrl = [];
  await imageRef.getDownloadURL().then((url) => {
    console.log(url);
    imgUrl.push(url);
  });
  return imgUrl[0];
};

export const uploadImageD2dExpressProduct = async (file, fileName) => {
  const imageRef = storage().ref(`d2dExpressProduct/${fileName}`);
  try {
    await imageRef.put(file);
    var imgUrl = [];
    await imageRef.getDownloadURL().then((url) => {
      console.log(url);
      imgUrl.push(url);
    });

    return imgUrl[0];
  } catch (error) {
    return null;
  }
};

export const uploadPaymentRequest = async (paymentObj) => {
  const paymentRequestRef = firestore().doc(
    `paymentRequest/${paymentObj.paymentId}`
  );
  delete paymentObj.file;
  const snapShot = await paymentRequestRef.get();
  try {
    if (!snapShot.exists) {
      await paymentRequestRef.set({ ...paymentObj });
      const updatedSnapShot = await paymentRequestRef.get();
      const ordersArray = [];
      await paymentObj.paidInvoices.map(async (invoice) => {
        const ordersCollectionRef = firestore()
          .collection("orders")
          .where("parcelId", "==", invoice);
        const orders = await ordersCollectionRef.get();
        orders.forEach(async (doc) => {
          const orderRef = firestore().doc(`orders/${doc.data().parcelId}`);
          await orderRef.update({
            paymentRequest: "pending",
          });
          const orderSnapshot = await orderRef.get();
          ordersArray.push(orderSnapshot.data());
        });
      });
      return paymentObj;
    } else {
      alert("an error occurred. please try again");
    }
  } catch (error) {
    alert(error);
  }
};
export const uploadPaymentRequestP2p = async (paymentObj) => {
  const paymentRequestRef = firestore().doc(
    `paymentRequestP2p/${paymentObj.paymentId}`
  );
  delete paymentObj.file;
  const snapShot = await paymentRequestRef.get();
  try {
    if (!snapShot.exists) {
      await paymentRequestRef.set({ ...paymentObj });
      paymentObj.paidInvoices.forEach(async (booking) => {
        const p2pRef = firestore().doc(`p2p/${booking.id}`);
        await p2pRef.update({
          paymentStatus: "Pending",
        });
      });
      return { ...paymentObj.paidInvoices[0], paymentStatus: "Pending" };
    } else {
      alert("an error occurred. please try again");
    }
  } catch (error) {
    alert(error);
  }
};

export const uploadPaymentRequestExpress = async (paymentObj) => {
  const paymentRequestRef = firestore().doc(
    `paymentRequestExpress/${paymentObj.paymentId}`
  );
  delete paymentObj.file;
  const snapShot = await paymentRequestRef.get();
  try {
    if (!snapShot.exists) {
      await paymentRequestRef.set({ ...paymentObj });
      const updatedSnapShot = await paymentRequestRef.get();
      const ordersArray = [];
      await paymentObj.paidInvoices.map(async (invoice) => {
        const ordersCollectionRef = firestore()
          .collection("bookingRequest")
          .where("bookingId", "==", invoice);
        const orders = await ordersCollectionRef.get();
        orders.forEach(async (doc) => {
          const orderRef = firestore().doc(
            `bookingRequest/${doc.data().bookingId}`
          );
          await orderRef.update({
            paymentRequest: "pending",
          });
          const orderSnapshot = await orderRef.get();
          ordersArray.push(orderSnapshot.data());
        });
      });
      return paymentObj;
    } else {
      alert("an error occurred. please try again");
    }
  } catch (error) {
    alert(error);
  }
};

export const updateUser = async (currentUser) => {
  const userRef = firestore().doc(`users/${currentUser.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot.data());
  try {
    userRef.update({
      ...currentUser,
    });
  } catch (error) {
    alert(error);
  }
  const updatedSnapShot = await userRef.get();
  return updatedSnapShot.data();
};
const getDay = () => {
  const t = new Date();
  const dayInDigit = t.getDay();
  let day;
  if (dayInDigit == 0) {
    day = "Sunday";
  }
  if (dayInDigit == 1) {
    day = "Monday";
  }
  if (dayInDigit == 2) {
    day = "Tuesday";
  }
  if (dayInDigit == 3) {
    day = "Wednesday";
  }
  if (dayInDigit == 4) {
    day = "Thursday";
  }
  if (dayInDigit == 5) {
    day = "Friday";
  }
  if (dayInDigit == 6) {
    day = "Saturday";
  }
  return day;
};
export const makePayment = async (
  total,
  invoicesToPay,
  currentUser,
  parcelsArray
) => {
  try {
    //first create a payment object
    const paymentObj = {
      paymentId: Math.floor(Math.random() * Date.now()),
      paidAt: new Date().toLocaleDateString().replaceAll("/", "-"),
      amount: total,
      paymentMethod: "ALG wallet",
      paidInvoice: [...invoicesToPay],
    };
    // updating the status of payments to invoiceStatus=Paid in main parcelArray and make a payment in paymentdays and paymentHistory
    const paymentDayRef = firestore().doc(`paymentDays/${paymentObj.paidAt}`);
    const paymentDay = await paymentDayRef.get();
    if (!paymentDay.exists) {
      paymentDayRef.set({
        date: paymentObj.paidAt,
        total: total,
        day: getDay(),
      });
    } else {
      paymentDayRef.update({
        total: paymentDay.data().total + total,
      });
    }

    const paymentHistoryRef = firestore().doc(
      `paymentHistory/${paymentObj.paidAt}`
    );
    const paymentHistory = await paymentHistoryRef.get();
    if (!paymentHistory.exists) {
      paymentHistoryRef.set({
        day: getDay(),
        paidAt: new Date().toLocaleDateString().replaceAll("/", "-"),
        payments: [
          {
            Email: currentUser.email,
            Name: currentUser.displayName,
            Id: currentUser.userId,
            Mobile: currentUser.mobileNo,
            ...paymentObj,
          },
        ],
      });
    } else {
      paymentHistoryRef.update({
        payments: [
          {
            Email: currentUser.email,
            Name: currentUser.displayName,
            Id: currentUser.userId,
            Mobile: currentUser.mobileNo,
            ...paymentObj,
          },
          ...paymentHistory.data().payments,
        ],
      });
    }

    // updatating the status invoiceStatus=Paid in parcelArray in admin
    parcelsArray.forEach(async (parcel) => {
      const orderRef = firestore().doc(`orders/${parcel.parcelId}`);
      await orderRef.update({
        ...parcel,
        invoiceStatus: "Paid",
      });
    });

    // updating the status of payments to invoiceStatus=Paid,wallet = wallet - total,paymentsArray,transactionArray in user
    const userRef = firestore().doc(`users/${currentUser.uid}`);
    const snapShot = await userRef.get();
    console.log(snapShot.data());
    const filteredParcelArray = snapShot
      .data()
      .parcelArray.filter((parcel) => !invoicesToPay.includes(parcel.parcelId));
    let updatedPaymentStatusParcelArray = snapShot
      .data()
      .parcelArray.filter((parcel) => invoicesToPay.includes(parcel.parcelId));
    updatedPaymentStatusParcelArray.forEach(
      (parcel) => (parcel.invoiceStatus = "Paid")
    );
    await userRef.update({
      parcelArray: [...updatedPaymentStatusParcelArray, ...filteredParcelArray],
      myWallet: snapShot.data().myWallet - parseInt(total),
      paymentArray:
        snapShot.data().paymentArray && snapShot.data().paymentArray.length > 0
          ? [paymentObj, ...snapShot.data().paymentArray]
          : [paymentObj],
      transactionArray:
        snapShot.data().transactionArray &&
        snapShot.data().transactionArray.length > 0
          ? [paymentObj, ...snapShot.data().paymentArray]
          : [paymentObj],
    });
    const updatedSnapShot = await userRef.get();
    return updatedSnapShot.data();
  } catch (error) {
    alert(error);
  }
};
export const uploadRechargeRequest = async (rechargeObj) => {
  const rechargeRequestRef = firestore.doc(
    `rechargeRequest/${rechargeObj.rechargeId}`
  );
  delete rechargeObj.file;
  const snapShot = await rechargeRequestRef.get();
  try {
    if (!snapShot.exists) {
      await rechargeRequestRef.set({ ...rechargeObj });
      const updatedSnapShot = await rechargeRequestRef.get();
      const userRef = firestore.doc(`users/${rechargeObj.userId}`);
      const user = await userRef.get();
      await userRef.update({
        rechargeRequestArray: user.data().rechargeRequestArray
          ? [rechargeObj, ...user.data().rechargeRequestArray]
          : [rechargeObj],
      });
      const upadatedUser = await userRef.get();
      return upadatedUser.data();
    } else {
      alert("an error occurred. please try again");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllTopCategories = async () => {
  const topCategoryCollectionRef = firestore()
    .collection("categories")
    .where("topCategory", "==", true);

  try {
    const topCategoryCollections = await topCategoryCollectionRef.get();
    const topCategoryCollectionsArray = [];
    topCategoryCollections.forEach((doc) => {
      topCategoryCollectionsArray.push(doc.data());
    });
    return topCategoryCollectionsArray;
  } catch (error) {
    alert(error);
  }
};
export const getAllBanners = async () => {
  const bannersCollectionRef = firestore()
    .collection("banners")
    .where("visible", "==", true);

  try {
    const bannersCollections = await bannersCollectionRef.get();
    const bannersCollectionsArray = [];
    bannersCollections.forEach((doc) => {
      bannersCollectionsArray.push(doc.data());
    });
    return bannersCollectionsArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllCategories = async () => {
  const productsCollectionRef = firestore().collection("categories");

  try {
    const products = await productsCollectionRef.get();
    const productsArray = [];
    products.forEach((doc) => {
      productsArray.push(doc.data());
    });
    return productsArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllHomeScreenCategories = async () => {
  const productsCollectionRef = firestore()
    .collection("categories")
    .where("homePage", "==", true);

  try {
    const products = await productsCollectionRef.get();
    const productsArray = [];
    products.forEach((doc) => {
      productsArray.push(doc.data());
    });
    return productsArray;
  } catch (error) {
    alert(error);
  }
};
export const getAllHomeScreenProducts = async (categoryId) => {
  const productsCollectionRef = firestore()
    .collection("products")
    .where("checkedValues", "array-contains", categoryId)
    .orderBy("id", "desc")
    .limit(10);
  try {
    const products = await productsCollectionRef.get();
    const productsArray = [];
    products.forEach((doc) => {
      productsArray.push(doc.data());
    });
    return productsArray;
  } catch (error) {
    alert(error);
    console.log(error);
  }
};
export const getAllLatestProducts = async () => {
  const productsCollectionRef = firestore()
    .collection("products")
    .where("new", "==", true)
    .orderBy("id", "desc")
    .limit(10);
  try {
    const products = await productsCollectionRef.get();
    const productsArray = [];
    products.forEach((doc) => {
      productsArray.push(doc.data());
    });
    return productsArray;
  } catch (error) {
    alert(error);
    console.log(error);
  }
};
export const getSingleCategoryProducts = async (categories) => {
  console.log(categories);
  const productsCollectionRef = firestore()
    .collection("products")
    .where("checkedValues", "array-contains-any", categories);

  try {
    const products = await productsCollectionRef.get();
    const productsArray = [];
    products.forEach((doc) => {
      productsArray.push(doc.data());
    });
    return productsArray;
  } catch (error) {
    alert(error);
    console.log(error);
  }
};
export const getSingleProduct = async (id) => {
  const productRef = firestore().doc(`products/${id}`);
  try {
    const product = await productRef.get();
    return product.data();
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

export const getAllExpressRatesParcel = async () => {
  const expressRatesParcelCollectionRef =
    firestore().collection("expressRatesParcel");
  try {
    const expressRatesParcel = await expressRatesParcelCollectionRef.get();
    const expressRatesParcelArray = [];
    expressRatesParcel.forEach((doc) => {
      expressRatesParcelArray.push(doc.data());
    });
    return expressRatesParcelArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllD2DRates = async (freightType, country) => {
  const d2dRatesCollectionRef = firestore().collection(
    `d2d-rates-${freightType}-${country}`
  );
  try {
    const d2dRates = await d2dRatesCollectionRef.get();
    const d2dRatesArray = [];
    d2dRates.forEach((doc) => {
      d2dRatesArray.push(doc.data());
    });
    return d2dRatesArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllLots = async () => {
  const lotsCollectionRef = firestore().collection("lots");
  try {
    const lots = await lotsCollectionRef.orderBy("shipmentDate", "desc").get();
    const lotsArray = [];
    lots.forEach((doc) => {
      lotsArray.push(doc.data());
    });
    return lotsArray;
  } catch (error) {
    alert(error);
  }
};

export const getUserLoan = async (userId) => {
  console.log(userId);
  const userCollectionRef = firestore()
    .collection("customerLoans")
    .where("uid", "==", userId);
  try {
    const user = await userCollectionRef.get();
    console.log(user);
    const userArray = [];
    user.forEach((doc) => {
      console.log(doc.data());
      userArray.push(doc.data());
    });
    if (userArray.length > 0) {
      return userArray[0].amount;
    } else {
      return 0;
    }
  } catch (error) {
    alert(error);
    return 0;
  }
};

export const getAllLoansCashOutCustomer = async (customer) => {
  const expensesCollectionRef = firestore()
    .collection("dailyExpenses")
    .where("category", "==", "LOAN")
    .where("uid", "==", customer);
  try {
    const expenses = await expensesCollectionRef.get();
    const expensesArray = [];
    expenses.forEach((doc) => {
      expensesArray.push(doc.data());
    });
    return expensesArray;
  } catch (error) {
    alert(error);
  }
};
export const updateMultipleOrders = async (
  invoices,
  deliveryAddress,
  deliveryAddress2,
  vehicle
) => {
  await invoices.map(async (invoice) => {
    const ordersCollectionRef = firestore()
      .collection("orders")
      .where("parcelId", "==", invoice.parcelId);
    const orders = await ordersCollectionRef.get();
    orders.forEach(async (doc) => {
      const orderRef = firestore().doc(`orders/${doc.data().parcelId}`);
      await orderRef.update({
        deliveryAddress,
        deliveryAddress2,
        vehicle,
      });
      return;
    });
    return;
  });
};
export const updateMultipleOrdersSourcing = async (
  invoices,
  deliveryAddress,
  deliveryAddress2,
  vehicle
) => {
  console.log(invoices);
  console.log(deliveryAddress);
  console.log(deliveryAddress2);
  console.log(vehicle);
  try {
    await invoices.map(async (invoice) => {
      if (invoice.category === "sold-products") {
        const ordersCollectionRef = firestore()
          .collection(invoice.category)
          .where("paymentId", "==", invoice.paymentId);
        const orders = await ordersCollectionRef.get();
        orders.forEach(async (doc) => {
          const orderRef = firestore().doc(
            `${invoice.category}/${doc.data().paymentId}`
          );
          await orderRef.update({
            deliveryAddress,
            deliveryAddress2,
            vehicle,
          });
        });
      } else {
        const ordersCollectionRef = firestore()
          .collection(invoice.category)
          .where("id", "==", invoice.id);
        const orders = await ordersCollectionRef.get();
        orders.forEach(async (doc) => {
          const orderRef = firestore().doc(
            `${invoice.category}/${doc.data().id}`
          );
          await orderRef.update({
            deliveryAddress,
            deliveryAddress2,
            vehicle,
          });
        });
      }
    });
  } catch (error) {
    alert(error);
  }
};
export const uploadPaymentRequestSourcing = async (paymentObj) => {
  const paymentRequestRef = firestore().doc(
    `paymentRequestSourcing/${paymentObj.paymentId}`
  );
  delete paymentObj.file;
  const snapShot = await paymentRequestRef.get();
  try {
    if (!snapShot.exists) {
      await paymentRequestRef.set({ ...paymentObj });
      const updatedSnapShot = await paymentRequestRef.get();
      const ordersArray = [];
      await paymentObj.paidInvoices.map(async (invoice) => {
        if (invoice.category === "sold-products") {
          const ordersCollectionRef = firestore()
            .collection(invoice.category)
            .where("paymentId", "==", invoice.paymentId);
          const orders = await ordersCollectionRef.get();
          orders.forEach(async (doc) => {
            const orderRef = firestore().doc(
              `${invoice.category}/${doc.data().paymentId}`
            );
            await orderRef.update({
              paymentRequest: "pending",
            });
            const orderSnapshot = await orderRef.get();
            ordersArray.push(orderSnapshot.data());
          });
        } else {
          const ordersCollectionRef = firestore()
            .collection(invoice.category)
            .where("id", "==", invoice.id);
          const orders = await ordersCollectionRef.get();
          orders.forEach(async (doc) => {
            const orderRef = firestore().doc(
              `${invoice.category}/${doc.data().id}`
            );
            await orderRef.update({
              paymentRequest: "pending",
            });
            const orderSnapshot = await orderRef.get();
            ordersArray.push(orderSnapshot.data());
          });
        }
      });
      return paymentObj;
    } else {
      alert("an error occurred. please try again");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllSourcings = async (userId) => {
  const sourcingsCollectionRef = firestore()
    .collection("sourcing")
    .where("customerUid", "==", userId);
  const purchasingsCollectionRef = firestore()
    .collection("purchasing")
    .where("customerUid", "==", userId);
  const soldsCollectionRef = firestore()
    .collection("sold-products")
    .where("customerUid", "==", userId);
  try {
    const sourcings = await sourcingsCollectionRef.get();
    const purchasings = await purchasingsCollectionRef.get();
    const solds = await soldsCollectionRef.get();
    const invoicesArray = [];
    sourcings.forEach((doc) => {
      invoicesArray.push(doc.data());
    });
    purchasings.forEach((doc) => {
      invoicesArray.push(doc.data());
    });
    solds.forEach((doc) => {
      invoicesArray.push(doc.data());
    });
    return invoicesArray;
  } catch (error) {
    alert(error);
    return [];
  }
};

export const getAllLoansCashInCustomer = async (customer) => {
  const cashInsCollectionRef = firestore()
    .collection("dailyCashIn")
    .where("category", "==", "LOAN")
    .where("uid", "==", customer);
  try {
    const cashIns = await cashInsCollectionRef.get();
    const cashInsArray = [];
    cashIns.forEach((doc) => {
      cashInsArray.push(doc.data());
    });
    return cashInsArray;
  } catch (error) {
    alert(error);
  }
};

export const setBookingRequest = async (bookingObj) => {
  let header;
  if (bookingObj.shipmentMethod == "Express") {
    header = "EXP";
  } else if (bookingObj.shipmentMethod == "Freight") {
    header = "FRE";
  } else if (bookingObj.shipmentMethod == "D2D") {
    header = "D2D";
  }
  const bookingId = `${header}${Math.round(Math.random() * 1000000 - 1)}`;
  const bookingRef = firestore().doc(`bookingRequest/${bookingId}`);
  delete bookingObj.file;
  const snapShot = await bookingRef.get();
  if (!snapShot.exists) {
    try {
      await bookingRef.set({
        bookingId,
        ...bookingObj,
      });
      console.log(snapShot.data());
      const uploadedSnapShot = await bookingRef.get();
      return uploadedSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } else {
    alert(
      "there is already a booking with similar uid, please try again later"
    );
  }
};

export const setBookingArrayOfUser = async (bookingObj) => {
  console.log(bookingObj);
  console.log("set booking array of user is getting called");
  const userRef = firestore().doc(`users/${bookingObj.bookingObj.userId}`);
  const snapShot = await userRef.get();
  console.log(snapShot.data());
  try {
    userRef.update({
      bookingArray: snapShot.data().bookingArray
        ? [...snapShot.data().bookingArray, bookingObj]
        : [bookingObj],
    });
  } catch (error) {
    alert(error);
  }
};

// Orders
export const updateOrder = async (orderObj) => {
  const orderRef = firestore().doc(`orders/${orderObj.parcelId}`);
  try {
    await orderRef.update({
      ...orderObj,
    });
    const updatedOrder = await orderRef.get();
    return updatedOrder.data();
  } catch (error) {
    alert(error);
  }
};
export const updateToMyParcelOfUser = async (orderObj) => {
  console.log("update to my parcel of user is called");
  console.log(orderObj.customerUid);
  const userRef = firestore().doc(`users/${orderObj.customerUid}`);
  try {
    const snapShot = await userRef.get();
    console.log(snapShot.data());
    const filteredMyParcelArrayOfUser = snapShot
      .data()
      .parcelArray.filter((parcel) => parcel.parcelId !== orderObj.parcelId);
    userRef.update({
      parcelArray: [...filteredMyParcelArrayOfUser, orderObj],
      id: orderObj.customerUid,
    });
    const updatedSnapShotOfUser = await userRef.get();
    return updatedSnapShotOfUser.data();
  } catch (error) {}
};
export const updateRefundStatus = async (orderObj) => {
  console.log(orderObj);
  try {
    // create a refund request with refundStatus= Pending
    const refundRef = firestore().doc(`refundRequest/${orderObj.parcelId}`);
    const refund = await refundRef.get();
    if (!refund.exists) {
      try {
        await refundRef.set({
          refundId: orderObj.parcelId,
          ...orderObj,
        });
      } catch (error) {
        alert(error);
      }
    } else {
      alert("there is already a refund request for this invoice.");
    }

    // update refund status in admin parcelArray
    const orderRef = firestore().doc(`orders/${orderObj.parcelId}`);
    await orderRef.update({
      ...orderObj,
    });
    const updatedOrder = await orderRef.get();
    return updatedOrder.data();
  } catch (error) {}
};

export const getAllReceivedExpressBookingsOfCurrentUser = async (userId) => {
  const bookingsCollectionRef = firestore()
    .collection("bookingRequest")
    .where("userId", "==", userId)
    .where("bookingStatus", "==", "Received");
  try {
    const bookings = await bookingsCollectionRef.get();
    const bookingsArray = [];
    bookings.forEach((doc) => {
      bookingsArray.push(doc.data());
    });
    return bookingsArray;
  } catch (error) {
    alert(error);
  }
};

// booking for a seat
// let bookingObj = {busId:`${from}-${to}-${time}`, bookedSeats:['A1', 'B1'], userId:user.uid}
export const bookingForSeats = async (bookingObj) => {
  // update user document with newly booked seats
  const userRef = firestore().doc(`users/${bookingObj.userId}`);
  const userSanpShot = await userRef.get();
  if (userSanpShot.exists) {
    userRef.update({
      bookedSeats: [...userSanpShot.data().bookedSeats, bookingObj],
    });
  } else {
    userRef.set({
      bookedSeats: [bookingObj],
    });
  }
  //booking for seat
  const busRef = firestore().doc(`bus/${bookingObj.busId}`);
  try {
    const snapShot = await busRef.get();
    if (snapShot.exists) {
      await busRef.update({
        bookedSeats: [
          ...snapShot.data().bookedSeats,
          ...bookingObj.bookedSeats,
        ],
      });
      const updatedSnapShot = await busRef.get();
      return updatedSnapShot.data();
    } else {
      await busRef.set({
        bookedSeats: bookingObj.bookedSeats,
      });
      const updatedSnapShot = await busRef.get();
      return updatedSnapShot.data();
    }
  } catch (error) {
    return null;
  }
};

export const getAllNotices = async () => {
  const noticesCollectionRef = firestore().collection("notices");
  try {
    const notices = await noticesCollectionRef.get();
    let noticesArray = [];
    notices.forEach((doc) => {
      noticesArray.push(doc.data());
    });

    noticesArray.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return noticesArray;
  } catch (error) {
    alert(error);
  }
};

export const getOrderTrackingResult = async (trackingNo) => {
  const ordersCollectionRef = firestore()
    .collection("orders")
    .where("trackingNo", "==", trackingNo);
  try {
    const resultOrders = await ordersCollectionRef.get();
    let parcelsArray = [];
    resultOrders.forEach((doc) => {
      parcelsArray.push(doc.data());
    });
    if (parcelsArray.length == 0) {
      return null;
    }
    let lotArray = parcelsArray.map((parcel) => parcel.lotNo);
    let uniqueLotArray = [...new Set(lotArray)];
    let customerUidArray = parcelsArray.map((parcel) => parcel.customerUid);
    const lotNo = lotArray[0];
    const customerUid = customerUidArray[0];
    const lotRef = firestore().doc(`lots/${lotNo}`);
    const lotObj = await lotRef.get();
    const userRef = firestore().doc(`users/${customerUid}`);
    const userObj = await userRef.get();
    return {
      parcelsArray,
      lotObj: lotObj.data(),
      userObj: userObj.data(),
      lotArray: uniqueLotArray.length > 0 ? uniqueLotArray : [],
    };
  } catch (error) {
    alert(error);
    return null;
  }
};

export const getBookingTrackingResult = async (trackingNo) => {
  const bookingsCollectionRef = firestore()
    .collection("bookingRequest")
    .where("bookingId", "==", trackingNo)
    .where("shipmentMethod", "==", "Express");
  try {
    const resultOrders = await bookingsCollectionRef.get();
    let parcelsArray = [];
    resultOrders.forEach((doc) => {
      parcelsArray.push(doc.data());
    });
    if (parcelsArray.length == 0) {
      return null;
    }
    let bookingObj = parcelsArray[0];

    return {
      bookingObj,
    };
  } catch (error) {
    alert(error);
    return null;
  }
};
export const getAllParcelsOfSingleUser = async (userId) => {
  const ordersCollectionRef = firestore()
    .collection("orders")
    .where("customerUid", "==", userId);
  try {
    const orders = await ordersCollectionRef.get();
    const ordersArray = [];
    orders.forEach((doc) => {
      ordersArray.push(doc.data());
    });
    return ordersArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllRechargeOfSingleUser = async (userId) => {
  const rechargeCollectionRef = firestore()
    .collection("rechargeHistory")
    .where("uid", "==", userId);
  try {
    const recharges = await rechargeCollectionRef.get();
    const rechargesArray = [];
    recharges.forEach((doc) => {
      rechargesArray.push(doc.data());
    });
    return rechargesArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllPaymentOfSingleUser = async (userId) => {
  const paymentsCollectionRef = firestore()
    .collection("paymentHistory")
    .where("uid", "==", userId);
  try {
    const payments = await paymentsCollectionRef.get();
    const paymentsArray = [];
    payments.forEach((doc) => {
      paymentsArray.push(doc.data());
    });
    return paymentsArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllBookingsOfSingleUser = async (userId) => {
  const bookingsCollectionRef = firestore()
    .collection("bookingRequest")
    .where("userId", "==", userId);
  try {
    const bookings = await bookingsCollectionRef.get();
    const bookingsArray = [];
    bookings.forEach((doc) => {
      bookingsArray.push(doc.data());
    });
    return bookingsArray;
  } catch (error) {
    alert(error);
  }
};
export const sendOtp = async (number, otp) => {
  const otpRef = firestore().doc(`otpSms/${number}`);

  const snapShot = await otpRef.get();
  try {
    if (!snapShot.exists) {
      await otpRef.set({ number, otp });
      setTimeout(async () => {
        await otpRef.delete();
      }, 60000);
    } else {
      await otpRef.update({ number, otp });
      setTimeout(async () => {
        await otpRef.delete();
      }, 60000);
    }
  } catch (error) {
    alert(error);
  }
};
export const verifyOtp = async (number, otp) => {
  const otpRef = firestore().doc(`otpSms/${number}`);

  const snapShot = await otpRef.get();
  try {
    if (!snapShot.exists) {
      alert("Your OTP is expired.Try again.");
      return {
        displayName: "",
        email: "",
      };
    } else {
      if (snapShot.data().otp == otp) {
        const userAuth = {
          uid: number,
          email: "",
          displayName: number,
        };
        const userRef = await createUserProfileDocument(userAuth, {
          mobileNo: `${number}`,
        });
        const userObj = await userRef.get();
        return userObj.data();
      }
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllp2p = async (userId) => {
  const p2pCollectionRef = firestore()
    .collection("p2p")
    .where("userId", "==", userId);
  try {
    const p2ps = await p2pCollectionRef.get();
    const p2psArray = [];
    p2ps.forEach((doc) => {
      p2psArray.push(doc.data());
    });
    return p2psArray.sort((a, b) => b.id - a.id);
  } catch (error) {
    alert(error);
  }
};
export const getAllp2pAssignedAgent = async (agentId) => {
  const p2pCollectionRef = firestore()
    .collection("p2p")
    .where("agentId", "==", agentId);
  try {
    const p2ps = await p2pCollectionRef.get();
    const p2psArray = [];
    p2ps.forEach((doc) => {
      p2psArray.push(doc.data());
    });
    return p2psArray;
  } catch (error) {
    alert(error);
  }
};

export const getAllP2pAgent = async (userId) => {
  const p2pCollectionRef = firestore()
    .collection("p2pAgentRequest")
    .where("agentId", "==", userId);
  try {
    const p2ps = await p2pCollectionRef.get();
    const p2psArray = [];
    p2ps.forEach((doc) => {
      p2psArray.push(doc.data());
    });
    return p2psArray.sort((a, b) => b.id - a.id);
  } catch (error) {
    alert(error);
  }
};

export const getAllWarehouseProducts = async (status, currentUser) => {
  const p2pCollectionRef = firestore()
    .collection("p2p")
    .where("status", "==", status)
    .where("deliveryWarehouse", "==", false)
    .where("userId", "!=", currentUser.id);
  try {
    const p2ps = await p2pCollectionRef.get();
    const p2psArray = [];
    p2ps.forEach((doc) => {
      p2psArray.push(doc.data());
    });
    return p2psArray;
  } catch (error) {
    alert(error);
  }
};

export const uploadp2p = async (p2pObj) => {
  const p2pRef = firestore().doc(`p2p/${p2pObj.id}`);
  const snapShot = await p2pRef.get();
  if (!snapShot.exists) {
    try {
      await p2pRef.set({
        ...p2pObj,
      });
      console.log(snapShot.data());
      const uploadedSnapShot = await p2pRef.get();
      return uploadedSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } else {
    alert(
      "there is already a booking with similar id, please change the country name and try again"
    );
  }
};

export const updatep2p = async (p2pObj) => {
  const p2pRef = firestore().doc(`p2p/${p2pObj.id}`);
  try {
    // check if the product is already taken by any other agent
    if (p2pObj.agentStatus) {
      const snapShot = await p2pRef.get();
      if (snapShot.data().agentStatus) {
        if (
          snapShot.data().agentStatus == "Pending" ||
          snapShot.data().agentStatus == "Assigned"
        ) {
          return snapShot.data();
        }
      }
    }
    await p2pRef.update({ ...p2pObj });
    const snapShot = await p2pRef.get();
    return snapShot.data();
  } catch (error) {
    alert(error);
  }
};

export const deletep2p = async (p2pId) => {
  const p2pRef = firestore().doc(`p2p/${p2pId}`);
  const snapShot = await p2pRef.get();
  console.log(snapShot.data());
  try {
    await p2pRef.delete();
  } catch (error) {
    alert(error);
  }
};

export const makeP2pAgentRequest = async (cart, currentUser, arrivalDate) => {
  let date = new Date();
  let id = date.getTime();
  const p2pRef = firestore().doc(`p2pAgentRequest/${id}`);
  const snapShot = await p2pRef.get();
  if (!snapShot.exists) {
    try {
      await p2pRef.set({
        id: id,
        agentId: currentUser.id,
        cart: cart,
        status: "Pending",
        arrivalDate,
      });
      console.log(snapShot.data());
      const uploadedSnapShot = await p2pRef.get();
      return uploadedSnapShot.data();
    } catch (error) {
      alert(error);
    }
  } else {
    alert(
      "there is already a booking with similar id, Please try again later."
    );
  }
};
export const uploadP2pMemberRequest = async (currentUser) => {
  let date = new Date();
  let id = date.getTime();
  const p2pRef = firestore().doc(`p2pMemberRequest/${currentUser.uid}`);
  const snapShot = await p2pRef.get();
  if (!snapShot.exists) {
    await p2pRef.set({
      ...currentUser,
      status: "Pending",
    });
  } else {
    await p2pRef.update({
      ...currentUser,
      status: "Pending",
    });
  }
};
