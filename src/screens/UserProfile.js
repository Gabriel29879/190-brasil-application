import { CommonActions, useNavigation } from '@react-navigation/native';
import { Button, FormControl, Input, Spinner, Stack, Text, VStack } from "native-base";
import { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from "react-native";
import { ContainerWithHeader } from "../components/CustomContainers";
import { deleteUserAuth, getUserAuth } from '../utils/storage';

export const UserProfile = () => {
    const navigation = useNavigation()
    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getUserAuth()
        .then(async (userAuth) => {
            if (!userAuth) {
                navigation.dispatch(
                    CommonActions.reset(
                        {
                            index: 1,
                            routes: [{ name: 'Login' }],
                        }
                    )
                )
                return
            }
            setUserInfo({
                cpf: userAuth.cpf,
                name: userAuth.name,
                email: userAuth.email,
            })
            setIsLoading(false)
        })
        .catch((e) => {
            console.log(e)
            setIsLoading(false)
        })
    }, [])

    return (
        <ContainerWithHeader navigation={navigation}>
            <VStack h={'100%'} justifyContent={'center'}>
                {
                    !isLoading ? (
                        <>
                            <VStack h={'5%'} justifyContent={'center'}>
                                <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
                                    <Text
                                    width={'100%'}
                                    fontWeight={'bold'}>
                                        Voltar
                                    </Text>
                                </TouchableWithoutFeedback>
                            </VStack>
                
                            <VStack h={'10%'} justifyContent={'center'}>
                                <Text
                                width={'100%'}
                                textAlign={'center'}
                                fontSize={'20px'}
                                fontWeight={'bold'}
                                color={"blue.900"}>
                                    Perfil
                                </Text>
                            </VStack>
                
                            <VStack h={'10%'} justifyContent={'center'}>
                                <Text
                                width={'100%'}
                                textAlign={'center'}>
                                    Caso precise mudar alguma de suas informações, favor entrar em contato com o suporte.
                                </Text>
                            </VStack>
                
                            <VStack h={'40%'} justifyContent={'center'} space={5}>
                                <FormControl>
                                    <Stack>
                                        <FormControl.Label>Nome completo</FormControl.Label>
                                        <Input isDisabled={true} type='text' value={userInfo.name} variant={'underlined'} />
                                    </Stack>
                                </FormControl>
                
                                <FormControl>
                                    <Stack>
                                        <FormControl.Label>CPF</FormControl.Label>
                                        <Input isDisabled={true} type='text' value={userInfo.cpf} variant={'underlined'} />
                                    </Stack>
                                </FormControl>
                
                                <FormControl>
                                    <Stack>
                                        <FormControl.Label>E-mail</FormControl.Label>
                                        <Input isDisabled={true} type='text' value={userInfo.email} variant={'underlined'} />
                                    </Stack>
                                </FormControl>
                            </VStack>
                
                            <VStack h={'35%'} justifyContent={'flex-end'}>
                                <Button
                                onPress={() => {
                                    deleteUserAuth()
                                    .then(() => {
                                        navigation.dispatch(
                                            CommonActions.reset(
                                                {
                                                    index: 1,
                                                    routes: [{ name: 'Login' }],
                                                }
                                            )
                                        )
                                    })
                                }}
                                w='100%'
                                backgroundColor={'#DE3E3E'}>
                                    SAIR DA CONTA
                                </Button>
                            </VStack>
                        </>
                    ) : (
                        <Spinner size={'lg'} />
                    )
                }
                
            </VStack>
        </ContainerWithHeader>
    )
}