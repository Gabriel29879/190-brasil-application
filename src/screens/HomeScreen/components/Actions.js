import { CardButton } from '../../../components/CardButton'
import emergencyNumberListIcon from '../../../../assets/emergencyNumberListIcon.png'
import phoneIcon from '../../../../assets/phoneIcon.png'
import { HStack, Text } from 'native-base'
import { openURL } from 'expo-linking'
import { useNavigation } from '@react-navigation/native'

export const Actions = () => {
    const navigation = useNavigation()

    return (
        <HStack 
        justifyContent={'center'} 
        space={3}
        w='100%'>
            <CardButton
            action={() => navigation.push('EmergencyNumberList')}
            CustomText={() => <Text textAlign='center'>Números{'\n'}emergenciais</Text>}
            icon={emergencyNumberListIcon}/>
    
            <CardButton
            action={() => openURL('tel:+123456789')}
            CustomText={() => <Text textAlign='center'>Ligar{'\n'}190</Text>}
            icon={phoneIcon}/>
        </HStack>
    )
}
