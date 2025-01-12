import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const data = {
  portfolio: [
    { symbol: 'GOOG', price: '$217.94 CAD', shares: '6.7832', change: '+$17.68 (+8.83%)' },
    { symbol: 'MSFT', price: '$287.89 CAD', shares: '9.4111', change: '+$13.89 (+5.07%)' },
    { symbol: 'NVDA', price: '$1,359.95 CAD', shares: '42.8736', change: '+$819.58 (+151.67%)' },
    { symbol: 'VFV', price: '$845.84 CAD', shares: '5.6749', change: '+$61.52 (+7.84%)' },
    { symbol: 'ZQQ', price: '$867.71 CAD', shares: '5.9809', change: '+$168.34 (+24.07%)' },
  ],
  watchlist: [
    { symbol: 'AMD', price: '$116.04 USD', change: '-$5.80 (-4.76%)', company: 'Advanced Micro Devices' },
    { symbol: 'L', price: '$182.93 CAD', change: '-$1.64 (-0.89%)', company: 'Loblaw Cos. Ltd.' },
  ],
  friends: [
    { name: 'Friend 1', image: 'https://via.placeholder.com/50' },
    { name: 'Friend 2', image: 'https://via.placeholder.com/50' },
    { name: 'Friend 3', image: 'https://via.placeholder.com/50' },
  ],
};

const App = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>bullpen</Text>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profilePic} />
      </View>

      {/* Portfolio */}
      <Text style={styles.sectionTitle}>Portfolio 📈</Text>
      <View style={styles.card}>
        {data.portfolio.map((item, index) => (
          <View key={index} style={styles.portfolioItem}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <View>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.shares}>{item.shares} shares</Text>
            </View>
            <Text style={styles.change}>{item.change}</Text>
          </View>
        ))}
      </View>

      {/* Watchlist */}
      <Text style={styles.sectionTitle}>Watch-list 👀</Text>
      <View style={styles.card}>
        {data.watchlist.map((item, index) => (
          <View key={index} style={styles.watchlistItem}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <View>
              <Text style={styles.company}>{item.company}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <Text style={styles.change}>{item.change}</Text>
          </View>
        ))}
      </View>

      {/* Friends */}
      <Text style={styles.sectionTitle}>Friends</Text>
      <View style={styles.friends}>
        {data.friends.map((friend, index) => (
          <Image key={index} source={{ uri: friend.image }} style={styles.friendPic} />
        ))}
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b8e23',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  portfolioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  watchlistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#333',
  },
  shares: {
    fontSize: 12,
    color: 'gray',
  },
  change: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#008000', // Green for positive, Red for negative
  },
  company: {
    fontSize: 12,
    color: 'gray',
  },
  friends: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  friendPic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
