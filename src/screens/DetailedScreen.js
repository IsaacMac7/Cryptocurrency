import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import CoinChart from '../components/CoinChart';

const DetailedScreen = ({ navigation }) => {
    const priceChangeColor = priceChangePercentage7d > 0 ? 'green' : 'red';
    console.log("detailed page " + typeof(priceChangePercentage7d));

    const logoUrl = navigation.getParam('image');
    const name = navigation.getParam('name');
    const symbol = navigation.getParam('symbol');
    const currentPrice = navigation.getParam('current_price');
    const priceChangePercentage7d = navigation.getParam('price_change_percentage_7d_in_currency');

    return (
        <View style={styles.detailedScreenWrapper}>
            <View style={styles.titlesWrapper}>
                <View style={styles.upperTitles}>
                    <Image source={{ uri: logoUrl}} style={styles.image}/>
                    <Text style={styles.name}> {name} </Text>
                </View>

                <Text style={styles.subtitle}>{name} price ({symbol.toUpperCase()}) </Text>
                {/* <Text style={styles.days}>7d</Text> */}
                <View style={styles.rightTitles}>
                    <Text style={styles.currentPrice}>${currentPrice}</Text>
                    <Text style={styles.priceChange, {backgroundColor: priceChangeColor} }>{priceChangePercentage7d.toFixed(2)}%</Text>
                </View>
            </View>
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
        color: 'white',
    }

})

export default DetailedScreen;