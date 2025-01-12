import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Image } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { SelectCountry } from "react-native-element-dropdown";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type TabKey = "30 Days" | "Today" | "YTD"; // Define the possible keys for tabs

const Index = () => {
  // State for active tab with the correct type
  const [activeTab, setActiveTab] = useState<TabKey>("Today");
  const [country, setCountry] = useState("1"); // State for the selected country
  const [text, setText] = useState(""); // State for text input

  // Local data for dropdown
  const local_data = [
    {
      value: "1",
      label: "Trending", // Fixed the dropdown labels
      image: {
        uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
      },
    },
    {
      value: "2",
      label: "New",
      image: {
        uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
      },
    },
    {
      value: "3",
      label: "Most Relevant",
      image: {
        uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
      },
    },
  ];

  // Data for each tab
  const dataMap: Record<TabKey, { balance: string; cash: string; chartData: number[]; high: string; low: string }> = {
    "30 Days": {
      balance: "$4,800.00",
      cash: "$100.00",
      chartData: [4500, 4800, 4900, 4700],
      high: "H 4,900.00",
      low: "L 4,500.00",
    },
    Today: {
      balance: "$4,694.42",
      cash: "$55.05",
      chartData: [4995.46, 4704.84],
      high: "H 4,995.46",
      low: "L 4,704.84",
    },
    YTD: {
      balance: "$5,000.00",
      cash: "$500.00",
      chartData: [5100, 5000, 4700],
      high: "H 5,100.00",
      low: "L 4,700.00",
    },
  };

  const activeData = dataMap[activeTab];

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Line color
    strokeWidth: 2,
    decimalPlaces: 2, // Precision for numbers
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          {/* Tabs */}
          <View style={styles.tabs}>
            {Object.keys(dataMap).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab as TabKey)}
                style={[
                  styles.tabContainer,
                  activeTab === tab && styles.activeTabContainer,
                ]}
              >
                <Text style={[styles.tab, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Data Display */}
          <Text style={styles.balance}>{activeData.balance}</Text>
          <Text style={styles.cash}>Cash: {activeData.cash}</Text>

          {/* Line Chart */}
          <LineChart
            data={{
              labels: ["Start", "End"],
              datasets: [
                {
                  data: activeData.chartData,
                  color: (opacity = 1) => `rgba(89, 185, 60, ${opacity})`,
                },
              ],
            }}
            width={Dimensions.get("window").width - 90}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />

          {/* Footer for High/Low */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>{activeData.high}</Text>
            <Text style={styles.footerText}>{activeData.low}</Text>
          </View>
        </View>

        {/* "Feed" Header with Dropdown */}
        <View style={styles.feedHeaderContainer}>
          <Text style={styles.Feed}>Feed</Text>
          <SelectCountry
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            maxHeight={200}
            value={country}
            data={local_data}
            valueField="value"
            labelField="label"
            imageField="image"
            placeholder="Select Feed Type"
            searchPlaceholder="Search..."
            onChange={(e) => {
              setCountry(e.value);
            }}
          />
        </View>

        {/* Curved Input Box with Avatar */}
        <View style={styles.inputContainer}>
          <Image
            source={{
              uri: "https://media.licdn.com/dms/image/v2/D4E03AQG7wpp3XRYcyA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708849373776?e=1742428800&v=beta&t=1HsrWFhwmaQ2QOVMBNwlEQ2sr4G5Ruz8Gb6pRHVHxTU",
            }}
            style={styles.avatar}
          />
          <TextInput
            style={styles.curvedInput}
            onChangeText={setText}
            value={text}
            placeholder="Share a thought..."
            placeholderTextColor="#888"
          />
        </View>

        {/* Post Section */}
        <View style={styles.newPostsContainer}>
          <Image
            source={{
              uri: "https://media.licdn.com/dms/image/v2/D4E03AQETYFQVFpGjsA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1708138926141?e=1742428800&v=beta&t=K-RA51o0iw-9BOdv4lPdAxOfB_zoeWKiOvD1FVTBEAE",
            }}
            style={styles.avatar}
          />
          <View style={styles.postContent}>
            <Text style={styles.Username}>@agocharb11</Text>
            <Text style={styles.Post}>This is a post content that starts on a new line.</Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: 20,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tabContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  activeTabContainer: {
    backgroundColor: "#d1f7d6",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  tab: {
    fontSize: 14,
    color: "#888",
  },
  activeTabText: {
    color: "#1a861e",
    fontWeight: "bold",
  },
  balance: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cash: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#555",
  },
  Feed: {
    fontSize: 28,
    color: "#000",
    fontWeight: "bold",
  },
  feedHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  dropdown: {
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 10,
    width: 150,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
    color: "#59B93C",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  curvedInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    padding: 5,
  },
  newPostsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: "#fff",
  },
  postContent: {
    flex: 1,
    flexDirection: "column",
  },
  Username: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginTop: 7,
  },
  Post: {
    fontSize: 16,
    color: "#000",
    marginTop: 5,
  },
});

export default Index;
