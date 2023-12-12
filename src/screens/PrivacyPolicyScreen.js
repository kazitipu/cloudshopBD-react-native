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
    <OtrixContainer
      customStyles={{ backgroundColor: Colors.light_white }}
      statusBarColor={Colors.light_white}
    >
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
            Privacy Policy
          </Text>
        </View>
      </OtrixHeader>

      {/* Orders Content start from here */}
      <OtrixContent>
        <View style={styles.box}>
          <Text style={styles.txt}>
            This Privacy Policy outlines the information we collect, how we use
            it, and your choices concerning your personal data when you use
            Cloud Shop BD's E-Commerce Smartphone App. By downloading and using
            the app, you agree to the practices described in this policy.
          </Text>
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>1. *Information We Collect*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            We may collect various types of information , including but not
            limited to:
          </Text>
          <OtrixDivider size={"lg"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>
              *1.1 Personal Information:*
            </Text>{" "}
            This includes your name, email address, contact information, and
            billing details.
          </Text>
          <OtrixDivider size={"sm"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>
              *1.2 Device Information:*
            </Text>{" "}
            We may collect data about your device, such as device type,
            operating system, and unique device identifiers.
          </Text>
          <OtrixDivider size={"sm"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>*1.3 Usage Information:*</Text>{" "}
            We collect information about how you interact with the app,
            including your browsing and purchase history.
          </Text>
          <OtrixDivider size={"sm"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              *1.4 Location Information:*{" "}
            </Text>{" "}
            With your consent, we may collect your precise location to provide
            location-based services.
          </Text>
          <OtrixDivider size={"sm"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>
              *1.5 Cookies and Tracking Technologies:*
            </Text>
            We use cookies and similar technologies to track user activity
            within the app.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>2. *How We Use Your Information*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            We use the collected information for various purposes, including:
          </Text>
          <OtrixDivider size={"lg"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>*2.1 Service Provision:*</Text>{" "}
            To provide you with our e-commerce services, process orders, and
            deliver products.
          </Text>
          <OtrixDivider size={"sm"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>*2.2 Personalization:*</Text>{" "}
            To tailor the app's content and offerings to your preferences.
          </Text>
          <OtrixDivider size={"sm"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>*2.3 Analytics:*</Text> To
            understand app usage and improve our services.
          </Text>
          <OtrixDivider size={"sm"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>*2.4 Communication:*</Text> To
            send you order updates, promotions, and other information if you've
            opted in.
          </Text>
          <OtrixDivider size={"sm"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>*2.5 Legal and Safety:*</Text>{" "}
            To comply with legal requirements and ensure the security of our
            app.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>3. *Information Sharing*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            We may share your information with:
          </Text>
          <OtrixDivider size={"lg"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>*3.1 Service Providers:*</Text>{" "}
            Third-party service providers who assist in app operation and
            services.
          </Text>
          <OtrixDivider size={"sm"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>*3.2 Legal Obligations:*</Text>{" "}
            When required by law or to protect our rights, privacy, safety, or
            property.
          </Text>
          <OtrixDivider size={"sm"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>
              *3.3 Business Transfers:*{" "}
            </Text>{" "}
            In the event of a merger, acquisition, or sale of all or a portion
            of our assets.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>4. *Your Choices*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            You have the following choices regarding your data:
          </Text>
          <OtrixDivider size={"lg"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>
              *4.1 Access and Correction:*{" "}
            </Text>{" "}
            You can access and update your personal information through your app
            account settings.
          </Text>
          <OtrixDivider size={"sm"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>*4.2 Opt-Out:*</Text> You can
            opt out of receiving promotional communications.
          </Text>
          <OtrixDivider size={"sm"} />
          <Text style={styles.txt}>
            <Text style={{ fontWeight: "bold" }}>*4.3 Location Data:*</Text> You
            can control the app's access to your location through your device
            settings.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>5. *Security*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            We take reasonable measures to protect your data but cannot
            guarantee its absolute security. Please keep your login information
            secure.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>6. *Children's Privacy*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            Our app is not intended for use by children under the age of 13. We
            do not knowingly collect data from individuals under this age.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>7. *Changes to this Policy*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            We may update this Privacy Policy from time to time. Any changes
            will be posted within the app, and the updated policy will be
            effective upon posting.
          </Text>
          <OtrixDivider size={"lg"} />
          <OtrixDivider size={"lg"} />
          <Text style={styles.header}>8. *Contact Us*</Text>
          <OtrixDivider size={"sm"} />
          <Text
            style={{
              fontSize: wp("3.2%"),
              fontWeight: "bold",
              textAlign: "justify",
            }}
          >
            If you have questions or concerns about this Privacy Policy, please
            contact us at [contact email].
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
            By using Cloud Shop BD's E-Commerce Smartphone App , you acknowledge
            that you have read and understood this Privacy Policy and agree to
            its terms.
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
