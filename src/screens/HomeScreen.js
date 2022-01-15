import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import CoinItem from '../components/CoinItem';
import { getMarketData } from '../services/requests';


const ListHeader = () => (
  <>
  <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle}>Markets</Text>
      </View>
      <View style={styles.divider}/>
  </>
)
export default function HomeScreen({ navigation }) {

  const [data, setData] = useState([]);

  useEffect (() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    }

    fetchMarketData();

  }, [])

  return (

        <SafeAreaView style={styles.container}>
        <FlatList
            keyExtractor={(item) => item.id}
            data={data}
            renderItem={({item}) => (
            <CoinItem 
                name={item.name} 
                symbol={item.symbol}
                currentPrice={item.current_price}
                priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
                logoUrl={item.image}
                onPress={() => navigation.navigate('DetailedScreen', item)}
            />
            )}
            ListHeaderComponent={<ListHeader/>}
        />
        </SafeAreaView>
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  titleWrapper: {
    marginTop: 60,
    paddingHorizontal: 16,
  },
  largeTitle: {
    color: 'white',
    fontSize: 34,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
});
