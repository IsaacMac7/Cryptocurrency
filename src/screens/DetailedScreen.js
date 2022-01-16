import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, Dimensions} from 'react-native';
// import CoinChart from '../components/CoinChart';
import { getCoinData, getCoinMarketChart } from '../services/requests';
import { ChartDot, ChartPath, ChartPathProvider } from '@rainbow-me/animated-charts';

export const {width: SIZE} = Dimensions.get('window');

const DetailedScreen = ({ navigation , route }) => {

    const logoUrl = navigation.getParam('image');
    const name = navigation.getParam('name');
    const symbol = navigation.getParam('symbol');
    const currentPrice = navigation.getParam('current_price');
    const priceChangePercentage7d = navigation.getParam('price_change_percentage_7d_in_currency');
    const coinId = navigation.getParam('id');

    const priceChangeColor = priceChangePercentage7d > 0 ? 'green' : 'red';

    console.log(coinId);

    const [coin, setCoin] = useState(null);
    const [coinMarketData, setCoinMarketData] = useState(null); 
    const [loading, setLoading] = useState(false);

    const fetchCoinData = async () => {
        setLoading(true);
        const fetchedCoinData = await getCoinData(coinId);
        const fetchedCoinMarketData = await getCoinMarketChart(coinId)
        setCoin(fetchedCoinData);
        setCoinMarketData(fetchedCoinMarketData);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoinData()
    }, []) //add error state if the call fails

    if (loading || !coin || !coinMarketData) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="white" />
                <Text style={styles.loadingText}>Fetching data...</Text>
            </View>
            
        )
    }

    const { prices } = coinMarketData;

    console.log("detail " + prices);

    return (
        <View style={styles.detailedScreenWrapper}>
            <View style={styles.titlesWrapper}>
                <View style={styles.upperTitles}>
                    <Image source={{ uri: logoUrl}} style={styles.image}/>
                    <Text style={styles.name}> {name} </Text>
                </View>
                <Text style={styles.subtitle}>{name} price ({symbol.toUpperCase()}) </Text>
                <View style={styles.rightTitles}>
                    <Text style={styles.currentPrice}>${currentPrice}</Text>
                    <Text style={styles.priceChange, {backgroundColor:priceChangeColor, fontSize: 15, 
                    padding: 5, borderRadius: 10}}>{priceChangePercentage7d.toFixed(2)}%</Text>
                </View>
            </View>
            <ChartPathProvider
                data={{
                points: prices.map(([x, y]) => ({ x, y })),
                }}
            >
                <ChartPath height={SIZE / 2} stroke="white" width={SIZE} />
                <ChartDot style={{ backgroundColor: 'black' }} />
            </ChartPathProvider>
        </View>
    )
}

const styles = StyleSheet.create({
    detailedScreenWrapper: {
        flex: 1,
        backgroundColor: '#121212',
    },
    titlesWrapper:{
        marginLeft: 10,
    },
    image: {
      height: 50,
      width: 50,  
    },
    upperTitles: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 15,
        color: '#B0ADAD',
    },
    currentPrice: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        marginRight: 15,
    },
    rightTitles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceChange: {
        fontSize: 30,
        color: 'white',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#121212",
        alignItems: 'center',   
    },
    loadingText: {
        color: 'white',
    }


})

export default DetailedScreen;