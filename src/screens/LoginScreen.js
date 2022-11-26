import { CommonActions, useNavigation } from '@react-navigation/native';
import { Button, FormControl, Input, Link, Stack, Text, VStack, WarningOutlineIcon } from 'native-base'
import { useState } from 'react'
import { Image, TouchableWithoutFeedback  } from 'react-native'
import colorLogo from '../../assets/colorLogo.png'
import { FullPageContainer } from '../components/CustomContainers';
import { makeRequest } from '../utils/api';
import { isValidCpf } from '../utils/cpfValidator'
import { setUserAuth } from '../utils/storage';

export const LoginScreen = () => {
    const navigation = useNavigation()
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const validateAndSubmit = () => {
        const errors = {}
        if (!isValidCpf(cpf)) errors.cpf = 'CPF inválido'
        if(password.length < 4) errors.password = 'Senha deve ser maior que 4 caracteres'

        if (!errors.cpf && !errors.password) {
            setFormErrors({})
            setLoading(true)
            makeRequest({
                route: '/user/login',
                args: { cpf, password },
                method: 'POST',
            })
            .then(async (response) => {
                if (response.status === 400) {
                    const { errors } = await response.json()
                    if (errors.length) {
                        setFormErrors({
                            cpf: errors.find(error => error.param === 'cpf')?.msg,
                            password: errors.find(error => error.param === 'password')?.msg
                        })
                        setLoading(false)
                    }
                }

                if (response.status === 200) {
                    const userAuth = await response.json()
                    await setUserAuth(userAuth)
                    setLoading(false)
                    navigation.dispatch(
                        CommonActions.reset(
                            {
                                index: 1,
                                routes: [{ name: 'Home' }],
                            }
                        )
                    )
                }
            })
            .catch((e) => {
                setLoading(false)
                console.log(e)
            })
        } else {
            setFormErrors(errors)
        }
    }

    return (
        <FullPageContainer>
            <VStack
            height={'100%'}
            space={2}
            alignItems={'center'}
            >
                <VStack
                space={4}
                width={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
                height={'40%'}
                backgroundColor={"blue.900"}
                borderBottomRadius={'20px'}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
                        <Text 
                        width={'100%'} 
                        textAlign={'left'} 
                        paddingLeft={'40px'} 
                        fontWeight={'bold'} 
                        color={'white'}
                        marginBottom={'30px'}>
                            Voltar
                        </Text>
                    </TouchableWithoutFeedback>
                    <Image
                    style={{ width: 160, height: 138 }}
                    source={colorLogo} />
                </VStack>

                <VStack
                width={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
                space={5}
                height={'40%'}>
                    <FormControl isInvalid={formErrors.cpf}>
                        <Stack mx='40px'>
                            <FormControl.Label>CPF</FormControl.Label>
                            <Input type='text' value={cpf} placeholder="000.000.000-00" variant={'underlined'} onChangeText={(value) => setCpf(value.trim())} />
                            {
                                formErrors.cpf && (
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {formErrors.cpf}
                                    </FormControl.ErrorMessage>
                                )
                            }
                        </Stack>
                    </FormControl>
                    <FormControl isInvalid={formErrors.password}>
                        <Stack mx='40px'>
                            <FormControl.Label>Senha</FormControl.Label>
                            <Input value={password} type="password" placeholder="*****" variant={'underlined'} onChangeText={(value) => setPassword(value.trim())} />
                            {
                                formErrors.password && (
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {formErrors.password}
                                    </FormControl.ErrorMessage>
                                )
                            }
                        </Stack>
                    </FormControl>
                </VStack>

                <VStack
                width={'80%'}
                alignItems={'center'}
                justifyContent={'center'}
                height={'20%'}>
                    <Button
                        type='submit'
                        isLoading={loading}
                        onPress={() => validateAndSubmit()}
                        w='100%'>
                        ENTRAR
                    </Button>
                    <Link _text={{
                        fontSize: 'md',
                        fontWeight: "500",
                        color: "primary.500",
                        textDecoration: 'none'
                    }}
                    onPress={() => navigation.navigate('Signup')}
                    marginTop={'20px'}
                    alignSelf="center" 
                    mt="1">
                        Cadastre-se
                    </Link>
                </VStack>
            </VStack>
        </FullPageContainer>
    )
}