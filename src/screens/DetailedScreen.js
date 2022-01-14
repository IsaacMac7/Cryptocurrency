import React from 'react'
import { StyleSheet, View, Button} from 'react-native'

const DetailedScreen = () => {
    return (
        <View style={styles.homeWrapper}>
            <Text>This is DetailedScreen page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    homeWrapper: {
        flex: 1,
        backgroundColor: '#121212',
      },
})

export default DetailedScreen;