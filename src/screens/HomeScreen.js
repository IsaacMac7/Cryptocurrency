import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import CoinItem from '../components/CoinItem';
import { getMarketData } from '../services/requests';
import BottomSheet, {
    BottomSheetModal,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet';

const ListHeader = () => (
  <>
  <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle}>Market</Text>
      </View>
      <View style={styles.divider}/>
  </>
)
export default function HomeScreen() {

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['70%'], []);

  const openModal = () => {
      bottomSheetModalRef.current.present();
  }
  
  const [data, setData] = useState([]);

  useEffect (() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    }

    fetchMarketData();

  }, [])

  return (
    <BottomSheetModalProvider>
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
                onPress={() => openModal()}
            />
            )}
            ListHeaderComponent={<ListHeader/>}
        />
        </SafeAreaView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
    </BottomSheetModalProvider>
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
  }


});
