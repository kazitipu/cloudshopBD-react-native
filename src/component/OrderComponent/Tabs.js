import React, { useState } from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";

import { scale } from "react-native-size-matters";

const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: "row",
    flexGrow: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  selectedTab: {
    borderBottomWidth: 3,
    borderColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabContent: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(14),
  },
});

const Tabs = ({ children, selectedTab }) => {
  const [currentTab, setCurrentTab] = useState(selectedTab);

  const renderTabHeader = () =>
    React.Children.map(children, (child, index) => (
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => setCurrentTab(index)}
      >
        <View style={styles.tabContent}>
          <Text
            weight={currentTab === index ? "medium" : "regular"}
            style={{
              fontWeight: currentTab === index ? "bold" : "normal",
              color: "black",
            }}
          >
            {child.props.label}
          </Text>
          {currentTab === index && <View style={styles.selectedTab} />}
        </View>
      </TouchableOpacity>
    ));

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.tabHeader}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {renderTabHeader()}
      </ScrollView>

      {children[currentTab]}
    </>
  );
};

Tabs.defaultProps = {
  selectedTab: 0,
};

export default Tabs;
