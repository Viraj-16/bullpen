import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Stock {
    symbol: string;
    price: number;
    change: number;
    percent_change: number;
}

interface StockListProps {
    stocks: Stock[];
}

const StockList: React.FC<StockListProps> = ({ stocks }) => {
    return (
        <View style={styles.stockList}>
            {stocks.map((stock, index) => (
                <View key={index} style={styles.stockRow}>
                    <Text style={styles.stockTicker}>{stock.symbol}</Text>
                    <Text style={styles.stockPrice}>${stock.price.toFixed(2)}</Text>
                    <Text style={[styles.stockChange, stock.change >= 0 ? styles.positive : styles.negative]}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </Text>
                    <Text>{stock.percent_change}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    stockList: {
        marginTop: 20,
    },
    stockRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    stockTicker: {
        fontWeight: 'bold',
    },
    stockPrice: {
        fontWeight: 'bold',
    },
    stockChange: {
        fontWeight: 'bold',
    },
    positive: {
        color: 'green',
    },
    negative: {
        color: 'red',
    },
});

export default StockList;