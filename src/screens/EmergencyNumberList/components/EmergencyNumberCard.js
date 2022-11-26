import { HStack, Text, VStack } from "native-base";
import { TouchableWithoutFeedback } from "react-native";
import { openURL } from 'expo-linking'

export const EmergencyNumberCard = ({ title, number }) => (
    <TouchableWithoutFeedback onPress={() => openURL(`tel:+123456789${number}`)}>
        <HStack 
        alignItems={'center'} 
        marginTop={'8px'} 
        backgroundColor={'white'} 
        borderRadius={'4px'}
        padding={'12px'}
        shadow={'1'}>
            <VStack flex={7}>
                <Text color={'#585B65'}>{ title }</Text>
            </VStack>
            <VStack flex={1} alignItems={'flex-end'}>
                <Text color={'primary.600'} fontWeight={'700'}>{ number }</Text>
            </VStack>
        </HStack>
    </TouchableWithoutFeedback>
)