import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './screens/HomeScreen/index';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen/index';
import { UserProfile } from './screens/UserProfile';
import { CreateOcurrence } from './screens/CreateOcurrence';
import { OcurrenceDetails } from './screens/OcurrenceDetails';
import { EmergencyNumberList } from './screens/EmergencyNumberList';

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRouter = () => (
  <Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Login" component={LoginScreen} />
    <Screen name="Signup" component={SignupScreen} />
    <Screen name='UserProfile' component={UserProfile} />
    <Screen name='CreateOcurrence' component={CreateOcurrence} />
    <Screen name='OcurrenceDetails' component={OcurrenceDetails} />
    <Screen name='EmergencyNumberList' component={EmergencyNumberList} />
  </Navigator>
)