import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, Dimensions } from 'react-native';
import { getCoinMarketChart } from '../services/requests';
import { ChartPath, ChartPathProvider } from '@rainbow-me/animated-charts';

export const { width: SIZE } = Dimensions.get('window');

const DetailedScreen = ({ navigation }) => {

    //coin params
    const coinId = navigation.getParam('id');
    const logoUrl = navigation.getParam('image');
    const name = navigation.getParam('name');
    const symbol = navigation.getParam('symbol');
    const currentPrice = navigation.getParam('current_price');
    const priceChangePercentage7d = navigation.getParam('price_change_percentage_7d_in_currency');

    const [coinMarketData, setCoinMarketData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    //fetch
    useEffect(() => {
        const fetchCoinData = async () => {
            setHasError(false);
            setIsLoading(true);
            try {
                const fetchedCoinMarketData = await getCoinMarketChart(coinId); //request.js
                setCoinMarketData(fetchedCoinMarketData);
            } catch (error) {
                setHasError(true);
            }
            setIsLoading(false);
        }
        fetchCoinData();
    }, [])

    //error state
    if (hasError) {
        return (
            <View style={styles.states}>
                <Text style={styles.stateText}>Something went wrong :(</Text>
            </View>
        )
        //loading state
    } else if (isLoading || !coinMarketData) {
        return (
            <View style={styles.states}>
                <ActivityIndicator size="large" color="white" />
                <Text style={styles.stateText}>Fetching data...</Text>
            </View>

        )
    }

    //coin chart x and y data
    const { prices } = coinMarketData;

    //for changing price color
    const priceChangeColor = priceChangePercentage7d > 0 ? 'green' : 'red';

    return (
        <View style={styles.detailedScreenWrapper}>
            <View style={styles.titlesWrapper}>
                <View style={styles.upperTitles}>
                    <Image source={{ uri: logoUrl }} style={styles.image} />
                    <Text style={styles.name}> {name} </Text>
                </View>
                <Text style={styles.subtitle}>{name} price ({symbol.toUpperCase()}) </Text>
                <View style={styles.rightTitles}>
                    <Text style={styles.currentPrice}>${currentPrice}</Text>
                    <Text style={styles.priceChange, {
                        backgroundColor: priceChangeColor, fontSize: 15,
                        padding: 5, borderRadius: 10
                    }}>{priceChangePercentage7d.toFixed(2)}%</Text>
                </View>
            </View>
            <ChartPathProvider
                data={{
                    points: prices.map(([x, y]) => ({ x, y })),
                }}
            >
                <ChartPath height={SIZE / 2} stroke="white" width={SIZE} />
            </ChartPathProvider>
            <View style={styles.bottomWrapper}>
                <Text style={styles.bottomText}>This is the 7 day chart</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detailedScreenWrapper: {
        flex: 1,
        backgroundColor: '#121212',
    },
    titlesWrapper: {
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
    states: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#121212",
        alignItems: 'center',
    },
    stateText: {
        color: 'white',
    },
    bottomWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomText: {
        color: "#B0ADAD",
    }
})

export default DetailedScreen;