import React from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';

interface NewsItemProps {
  item: {
    images: { size: string, url: string }[];
    headline: string;
  };
}

const NewsItem: React.FC<NewsItemProps> = ({ item }) => {
  return (
    <ImageBackground
        source={{ uri: item.images[2].url }}
        style={styles.image}
        blurRadius={0.5}
    >
        <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.headline}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    image: {
        width: 325,
        height: 200,
        marginRight: 10,
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    title: {
        color: '#fff',
        padding: 10,
        fontWeight: 'bold',
    },
  });

export default NewsItem;