import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
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

  }, []) //add error state if the call fails

  return (

        <SafeAreaView style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder= 'Search'
                    placeholderTextColor="#B0ADAD"
                />
            </View>
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
  input: {
      height: 40,
      borderWidth: 1,
      padding: 10,  
      margin: 12,
      width: '80%',
      borderColor: 'white',
      borderRadius: 15,
      color: 'white',
      fontSize: 20,
  },
  searchBar: {
    alignItems: 'center',  
    justifyContent: 'center',
    
  }
});
