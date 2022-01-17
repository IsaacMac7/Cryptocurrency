import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
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
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  

  useEffect (() => {
    const fetchMarketData = async () => {
        setHasError(false);
        setIsLoading(true);
        try {
            const marketData = await getMarketData();
            setFilteredData(marketData);
            setData(marketData); //is this needed anymore?
        } catch (error) {
            setHasError(true);
        }
        setIsLoading(false);
    }
    fetchMarketData();

  }, []) 

  //filter crypto via Search 
  const searchFilter = (text) => {
      if (text) {
          const newData = data.filter((item) => {
              //format data to lower case
              const coinName = item.name ? item.name.toLowerCase() : ''.toLowerCase();
              const coinSymbol = item.symbol ? item.symbol.toLowerCase() : ''.toLowerCase();
              //format user input
              const textData = text.toLowerCase();
              // return index if name/symbol matches with user input
              return coinName.indexOf(textData) > -1 || coinSymbol.indexOf(textData)  > -1 ;
          });
          //sets searched data on the list
          setFilteredData(newData);
          setSearch(text);
      } else {
        //reutrn all crypto data on the list 
        setFilteredData(data);
        setSearch(text);
      }
  }

    if (hasError) {
        return (
            <View style={styles.states}>
                <Text style={styles.stateText}>Something went wrong :(</Text>
            </View>
        )
    } else if (isLoading) {
        return (
            <View style={styles.states}>
                <ActivityIndicator size="large" color="white" />
                <Text style={styles.stateText}>Loading...</Text>
            </View>
            
        )
    }

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    value={search}
                    onChangeText={(text) => searchFilter(text)}
                    placeholder= 'Search'
                    placeholderTextColor="#B0ADAD"
                />
            </View>
            <FlatList
                keyExtractor={(item) => item.id}
                data={filteredData}
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
  },
  states: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#121212",
    alignItems: 'center',   
    },
    stateText: {
        color: 'white',
    }
});
