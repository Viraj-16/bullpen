import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#59B93C",
        header: ({ route }) => (
          <SafeAreaView edges={["top"]} style={styles.safeHeader}>
            {/* Header Content */}
            <View style={styles.headerContainer}>
              {/* Text and Image Inline */}
              <Text style={styles.headerTitle}>
                {route.name === "index" ? "bullpen." : "Search"}
              </Text>
              <Image
                source={{
                  uri: "https://media.licdn.com/dms/image/v2/D4E03AQG7wpp3XRYcyA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708849373776?e=1742428800&v=beta&t=1HsrWFhwmaQ2QOVMBNwlEQ2sr4G5Ruz8Gb6pRHVHxTU",
                }}
                style={styles.avatar}
              />
            </View>
          </SafeAreaView>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  safeHeader: {
    backgroundColor: "#59B93C", // Matches the header background
  },
  headerContainer: {
    height: 50, // Control the height of the header
    flexDirection: "row", // Align items in a row
    justifyContent: "space-between", // Space between text and avatar
    alignItems: "center", // Center vertically
    paddingHorizontal: 15, // Padding on left and right
    backgroundColor: "#59B93C", // Green background for the header
  },
  headerTitle: {
    color: "#fff", // White text for the header
    fontSize: 30, // Font size for the title
    fontWeight: "bold",
    marginLeft: 10, // Space between the title and avatar
  },
  avatar: {
    width: 40, // Width of the circular photo
    height: 40, // Height of the circular photo
    borderRadius: 20, // Fully circular
    marginRight: 10, // Space between the avatar and the right edge
  },
});
