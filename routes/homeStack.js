import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from '../src/screens/HomeScreen';
import DetailedScreen from '../src/screens/DetailedScreen';

const screens = {
    //HomeScreen is at the top of stack, hence the default screen
    HomeScreen: {
        screen: HomeScreen
    },
    DetailedScreen: {
        screen: DetailedScreen
    }
}

const HomeStack = createStackNavigator(screens);

HomeScreen.navigationOptions = {
    title: "Cryptocurrency",
    headerTitleAlign: "center",
    headerStyle: {
        backgroundColor: "#121212",
        height: 100,
    },
    headerTintColor: "white",
    fontWieight: 200,
}

DetailedScreen.navigationOptions = {
    title: "Back",
    headerStyle: {
        backgroundColor: "#121212",
        height: 100,
    },
    headerTintColor: "white"
}



export default createAppContainer(HomeStack);