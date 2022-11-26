import { Box, VStack } from 'native-base'
import { Image, TouchableWithoutFeedback } from 'react-native'

export const CardButton = ({ action, CustomText, icon }) => (
        <TouchableWithoutFeedback
        onPress={() => action()}>
            <Box
            alignItems='center' 
            justifyContent='center'
            backgroundColor='#F9F9FA'
            borderRadius={'15px'}
            shadow='5'
            h={'140px'}
            w={'50%'}>
                <VStack
                alignItems='center' 
                justifyContent='center'
                space={3}>
                    <Image source={icon} style={{ width: 32, height: 32 }} />
                    <CustomText />
                </VStack>
            </Box>
        </TouchableWithoutFeedback>

)