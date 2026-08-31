import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export const tabBarHeight = () => {
  // Dynamically catch the tab bar footprint height to compute perfect padding thresholds
  let tabBarHeight = 0;
  try {
    tabBarHeight = useBottomTabBarHeight();
  } catch (e) {
    // Fallback static height padding if this screen isn't directly inside a Tab Navigator tree context
    tabBarHeight = 80;
  }
  return tabBarHeight;
}