import { Text } from "native-base";
import { TouchableWithoutFeedback } from "react-native";

export const ReturnButton = ({ onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <Text width={'100%'} fontWeight={'bold'}>Voltar</Text>
    </TouchableWithoutFeedback>
)