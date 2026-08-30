import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { colors } from "../../constant";
import TabBarIcon from "@/src/component/tab-bar-icon";
import { tabIcons } from "@/src/constant/tab-icons";
const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBarLayout,
        tabBarActiveTintColor: "#00BFFF",
        tabBarInactiveTintColor: "#808080",
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title="Home"
              icon={tabIcons.home.default}
              activeIcon={tabIcons.home.active}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title="Search"
              icon={tabIcons.search.default}
              activeIcon={tabIcons.search.active}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: "Watchlist",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title="Watchlist"
              icon={tabIcons.watchlist.default}
              activeIcon={tabIcons.watchlist.active}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBarLayout: {
    backgroundColor: colors.primary,
    borderTopWidth: 2,
    borderTopColor: colors.accent,
    marginBottom: 0,
    position: "absolute",
    bottom : 0,
    left: 0,
    right: 0,
    height: 70,
  },
});

export default Layout;
