import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import NewsItem from '@/components/NewsItem';
import StockList from '@/components/StockList';

interface Stock {
  symbol: string;
  price: number;
  change: number;
  percent_change: number;
}

export default function Tab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [newsArticles, setNewsArticles] = useState([]);
  const [biggestChanges, setBiggestChanges] = useState<Stock[]>([]);

  // Fetch news articles
  useEffect(() => {
    const fetchNews = async () => {
      const options = {
        method: 'GET',
        url: 'https://data.alpaca.markets/v1beta1/news?sort=desc&limit=10',
        headers: {
          accept: 'application/json',
          'APCA-API-KEY-ID': process.env.EXPO_PUBLIC_ALPACA_API_KEY,
          'APCA-API-SECRET-KEY': process.env.EXPO_PUBLIC_ALPACA_SECRET_KEY
        }
      };

      try {
        const response = await axios.request(options);
        setNewsArticles(response.data.news);
      } catch (error) {
        console.error('Failed to fetch news articles', error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchMovers = async () => {
      const options = {
        method: 'GET',
        url: 'https://data.alpaca.markets/v1beta1/screener/stocks/movers?top=10',
        headers: {
          accept: 'application/json',
          'APCA-API-KEY-ID': process.env.EXPO_PUBLIC_ALPACA_API_KEY,
          'APCA-API-SECRET-KEY': process.env.EXPO_PUBLIC_ALPACA_SECRET_KEY
        }
      };

      try {
        const response = await axios.request(options);
        const gainers = response.data.gainers;
        const losers = response.data.losers;

        // Combine gainers and losers
        const allMovers = [...gainers, ...losers];

        // Sort by absolute change
        allMovers.sort((a: Stock, b: Stock) => Math.abs(b.change) - Math.abs(a.change));

        // Get the top 5 biggest changes
        const top5BiggestChanges = allMovers.slice(0, 5);

        setBiggestChanges(top5BiggestChanges);
    } catch (error) {
        console.error('Failed to fetch stock movers', error);
    }
    };

    fetchMovers();
    console.log(newsArticles.length)
  }, []);

  // Scroll news articles automatically
  const flatListRef = useRef<FlatList>(null);
  useEffect(() => {
    let offset = 0;
    const itemWidth = 335;
    const totalWidth = newsArticles.length * itemWidth;
    const interval = setInterval(() => {
      offset = (offset + itemWidth) % totalWidth; 
      flatListRef.current?.scrollToOffset({ offset, animated: true });
    }, 2000);
    return () => clearInterval(interval);
  }, [newsArticles]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <FontAwesome name="search" size={20} color="black" style={styles.searchIcon}/>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={newsArticles} 
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <NewsItem item={item} />}
      />
      <Text style={styles.moversHeader}>
        Today's Movers  <FontAwesome name="line-chart" size={20}/>
      </Text>
      <StockList stocks={biggestChanges}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 50,
  },
  moversHeader: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  }
});
