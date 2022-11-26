import { Text, View } from "native-base";
import { TouchableWithoutFeedback } from "react-native";

export const OcurrenceTypeButton = ({
    isActive = false,
    action,
    title,
    description,
}) => (
    <TouchableWithoutFeedback onPress={() => action()}>
        <View 
        padding='12px' 
        shadow={isActive ? '4' : '0'} 
        width='100%'
        backgroundColor={isActive ? 'white' : '#F2F2F3'} 
        borderRadius="5px">
            <Text 
            width={'100%'}
            fontWeight={'bold'}
            fontSize='15px'
            marginBottom='5px'
            color={isActive ? '#585B65' : '#A2A3A8'}>
                {title}
            </Text>
            <Text 
            width={'100%'}
            fontSize='10px'
            color={isActive ? '#585B65' : '#A2A3A8'}>
                {description}
            </Text>
        </View>
    </TouchableWithoutFeedback>
)
