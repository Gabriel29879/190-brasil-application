import { useNavigation } from '@react-navigation/native';
import { 
    Container, 
    HStack,
} from 'native-base'
import { 
    Image,
    TouchableWithoutFeedback 
} from 'react-native'
import HeaderIcon from '../../assets/headerIcon.png'
import UserIcon from '../../assets/userIcon.png'
import { getUserAuth } from '../utils/storage';

export const ScreenHeader = ({ noRadius = false }) => {
    const navigation = useNavigation()

    return (
        <HStack bgColor={'primary.500'} w='full' alignItems='center' justifyContent='center' padding={'10px'} h={'50px'} borderBottomRadius={noRadius ? 'none' : '10px'}>
            
            <Container flex={1} pl='5'>
                <TouchableWithoutFeedback onPress={async () => navigation.navigate('Home')}>
                    <Image source={HeaderIcon} style={{ width: 32, height: 32 }} />
                </TouchableWithoutFeedback>
            </Container>
    
            <Container flex={1} pr='5' alignItems={'flex-end'}>
                <TouchableWithoutFeedback onPress={async () => {
                    const userAuth = await getUserAuth()
                    if (userAuth?.token) {
                        navigation.navigate('UserProfile')
                    } else {
                        navigation.navigate('Login')
                    }
                }}>
                    <Image source={UserIcon} style={{ width: 32, height: 32 }} />
                </TouchableWithoutFeedback>
            </Container>

        </HStack>
    )
    
}