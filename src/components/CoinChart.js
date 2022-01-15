import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ChartDot, ChartPath, ChartPathProvider } from '@rainbow-me/animated-charts';


export const {width: SIZE} = Dimensions.get('window');

const CoinChart = ({ prices }) => {
    console.log(" chart " + prices);
    return (
        <ChartPathProvider
        data={{
          points: prices.map(([x, y]) => ({ x, y })),
        }}
      >
        <ChartPath height={SIZE / 2} stroke="white" width={SIZE} />
        <ChartDot style={{ backgroundColor: 'black' }} />
        </ChartPathProvider>
    )
}

export default CoinChart