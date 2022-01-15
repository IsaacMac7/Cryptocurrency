import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import CoinChart from '../components/CoinChart';

const DetailedScreen = ({ navigation , route }) => {

    const logoUrl = navigation.getParam('image');
    const name = navigation.getParam('name');
    const symbol = navigation.getParam('symbol');
    const currentPrice = navigation.getParam('current_price');
    const priceChangePercentage7d = navigation.getParam('price_change_percentage_7d_in_currency');
    const sparklinePrice = navigation.getParam('sparkline_in_7d.price');
    // const data = route.sparkline_in_7d.price;
    // console.log("sparkline " + data);

    const priceChangeColor = priceChangePercentage7d > 0 ? 'green' : 'red';

    console.log(sparklinePrice);

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
            <CoinChart sparkline={sparklinePrice}/>
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
    }

})

export default DetailedScreen;