import { useNavigation } from "@react-navigation/native";
import { Button, Text, VStack } from "native-base";

export const UnauthenticatedInfo = () => {
    const navigation = useNavigation()

    return (
        <VStack space={7}>
            <Text w='100%'>
                No momento você possui acesso à:{'\n'}
                <Text fontWeight={'bold'}>- Lista de números emergenciais</Text>{'\n'}
                <Text fontWeight={'bold'}>- Ligação direta ao 190</Text>{'\n'}
                {'\n'}
                Para ter acesso à criação de ocorrências pelo aplicativo acesse sua conta pelo botão abaixo:
            </Text>
    
            <Button
            onPress={() => navigation.navigate('Login')}
            w='100%'>
                ENTRAR
            </Button>
        </VStack>
    )
}