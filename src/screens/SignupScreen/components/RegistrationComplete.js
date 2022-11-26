import { CommonActions, useNavigation } from '@react-navigation/native'
import { Button, Heading, Stack, Text, VStack } from 'native-base'

export const RegistrationComplete = ({ setStep }) => {
    const navigation = useNavigation()

    return (
        <VStack
        height={'85%'}
        paddingTop={'20px'}
        paddingBottom={'20px'}>
            <VStack
            height={'80%'}
            alignItems={'center'}
            justifyContent={'center'}>
                <Stack mx={'40px'} space={8}>
                    <Heading textAlign={'center'} color={'primary.400'}>
                        Pré-cadastro concluído!
                    </Heading>
                    <Text>
                        Seus dados foram enviados para nossa central e dentro de <Text fontWeight={'bold'}>24h sua conta ficará ativa</Text> para uso irrestrito.{'\n'}
                        Até a ativação de sua conta ser concluida você terá acesso limitado ao aplicativo.{'\n'}
    
                        De início você terá acesso à:{'\n'}
                        - Lista de números emergenciais;{'\n'}
                        - Ligação direta ao 190.
                    </Text>
                </Stack>
    
            </VStack>
    
            <VStack
            height={'20%'}
            alignItems={'center'}
            justifyContent={'center'}>
                <Button
                    onPress={() => {
                        navigation.dispatch(
                            CommonActions.reset(
                                {
                                    index: 1,
                                    routes: [{ name: 'Login' }],
                                }
                            )
                        )
                    }}
                    w='80%'>
                    CONTINUAR
                </Button>
            </VStack>
        </VStack>
    )
}