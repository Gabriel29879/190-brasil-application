import { Text, VStack } from "native-base";

export const VerificationTimeMessage = () => (
    <VStack>
        <Text w='100%'>
            Nossa central está verificando suas informações, dentro de 24h você poderá criar ocorrências diretamente pelo aplicativo.
            {'\n'}
            {'\n'}
            No momento você possui acesso à:{'\n'}
            <Text fontWeight={'bold'}>- Lista de números emergenciais</Text>{'\n'}
            <Text fontWeight={'bold'}>- Ligação direta ao 190</Text>
        </Text>
    </VStack>
)