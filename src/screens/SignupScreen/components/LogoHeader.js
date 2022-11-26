import { VStack } from 'native-base'
import { Image } from 'react-native'

import colorLogo from '../../../../assets/colorLogo.png'

export const LogoHeader = () => (
    <VStack
    height={'15%'}
    backgroundColor={'primary.500'}
    alignItems={'center'}
    justifyContent={'center'}
    borderBottomRadius={'20px'}>
        <Image 
        source={colorLogo}
        style={{ width: 72, height: 61.5 }}
         />
    </VStack>
)