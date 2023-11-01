import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixDivider,
  OtirxBackButton,
  OtrixContent,
} from "@component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GlobalStyles, Colors } from "@helpers";
import Fonts from "@helpers/Fonts";
function PrivacyPolicyScreen(props) {
  useEffect(() => {}, []);

  return (
    <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>
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
            Terms and Conditions
          </Text>
        </View>
      </OtrixHeader>

      {/* Orders Content start from here */}
      <OtrixContent>
        <View style={styles.box}>
          <Text style={styles.txt}>
            Please read these Terms and Conditions carefully before using Cloud
            Shop BD App. By using the app, you agree to abide by these terms.
          </Text>
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>1. *Acceptance of Terms*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            By downloading and using the app, you acknowledge that you have
            read, understood, and agreed to these Terms and Conditions. If you
            do not agree, please do not use the app.
          </Text>

          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>2. *Use of the App*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            You may use the app for the purpose of browsing, purchasing
            products, and accessing related services. You agree not to use the
            app for any unlawful or prohibited purposes.
          </Text>

          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>3. *User Accounts*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            To access certain features of the app, you may need to create a user
            account. You are responsible for maintaining the confidentiality of
            your account information and agree to accept all responsibility for
            activities that occur under your account.
          </Text>
          <OtrixDivider size={"lg"} />

          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>4. *User Content*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            Any content, including product reviews and comments, that you submit
            or post on the app must not violate our content guidelines. We
            reserve the right to remove or modify user content at our
            discretion.
          </Text>

          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>5. *Intellectual Property*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            The app and its content, including but not limited to logos,
            trademarks, and images, are protected by intellectual property
            rights. You may not use, reproduce, or distribute these materials
            without written permission from Cloud Shop BD.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>6. *Product Information*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            While we make every effort to ensure the accuracy of product
            information, we do not warrant that product descriptions, pricing,
            or other content on the app is error-free. We reserve the right to
            correct any errors and change information without prior notice.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>7. *Payments and Billing*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            You agree to provide accurate billing and payment information when
            making purchases through the app. Any disputes related to billing
            should be addressed within a reasonable time frame.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>8. *Shipping and Returns*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            Details of shipping, delivery times, and return policies are
            outlined in separate Shipping and Returns sections on the app.
            Please review these sections for specific terms and conditions.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>9. *Privacy*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            The app's data collection and usage are governed by our Privacy
            Policy, which can be accessed within the app. By using the app, you
            consent to the practices outlined in the Privacy Policy.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>10. *Termination*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            We reserve the right to terminate or suspend your account or access
            to the app at our discretion, without notice, if you violate these
            Terms and Conditions.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>11. *Limitation of Liability*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            We are not responsible for any damages, losses, or liabilities
            arising from the use of the app or its content, except as required
            by applicable laws.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>
            12. *Changes to Terms and Conditions*
          </Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            We may update these Terms and Conditions from time to time. Any
            changes will be posted within the app, and the updated terms will be
            effective upon posting.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>13. *Contact Us*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            If you have questions or concerns about these Terms and Conditions,
            please contact us at [contact email].
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            By using Cloud Shop BD's E-Commerce Smartphone App, you acknowledge
            that you have read and understood these Terms and Conditions and
            agree to comply with them.
          </Text>
        </View>
      </OtrixContent>
    </OtrixContainer>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(PrivacyPolicyScreen);

const styles = StyleSheet.create({
  box: {
    padding: hp("1.5%"),
    backgroundColor: Colors.white,
    marginVertical: hp("1%"),
    marginHorizontal: wp("1%"),
    borderRadius: wp("2%"),
    borderWidth: 0.5,
    borderColor: Colors.custom_gray,
  },
  txt: {
    fontSize: wp("3.5%"),
    fontFamily: Fonts.Font_Semibold,
    color: Colors.text_color,
    textAlign: "justify",
  },
  header: {
    fontWeight: "bold",
    fontSize: wp("3.7%"),
    textAlign: "left",
  },
});
