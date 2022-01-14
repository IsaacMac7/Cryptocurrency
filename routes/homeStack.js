import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
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

export default createAppContainer(HomeStack);