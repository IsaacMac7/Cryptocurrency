import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import DetailedScreen from '../screens/DetailedScreen';


const CoinItem = ({ name, symbol, currentPrice, priceChangePercentage7d, logoUrl, onPress }) => {
    const priceChangeColor = priceChangePercentage7d > 0 ? 'green' : 'red'


    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.itemWrapper}>
                <View style={styles.leftWrapper}>
                    <Image source={{ uri: logoUrl }} style={styles.image} />
                    <View style={styles.titlesWrapper}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
                    </View>
                </View>
                <View style={styles.rightWrapper}>
                    <Text style={styles.title}>${currentPrice}</Text>
                    <Text style={styles.subtitle, { color: priceChangeColor }}>{priceChangePercentage7d.toFixed(2)}%</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemWrapper: {
        paddingHorizontal: 16,
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    leftWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        height: 48,
        width: 48,
    },
    titlesWrapper: {
        marginLeft: 8,
    },
    title: {
        fontSize: 18,
        color: "white"
    },
    subtitle: {
        fontSize: 14,
        color: "#E3E3E3"
    },
    rightWrapper: {
        alignItems: "flex-end",
    },
})

export default CoinItem
