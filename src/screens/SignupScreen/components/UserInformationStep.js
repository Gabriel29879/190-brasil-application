import { useState } from 'react'
import { useUserInfoContext } from '../context/UserInfoContext'
import { Button, Checkbox, Stack, Text, VStack } from 'native-base'
import { TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserInfoInput } from './UserInfoInput'
import { isValidCpf } from '../../../utils/cpfValidator'

export const UserInformationStep = ({ setStep }) => {
    const navigation = useNavigation()
    const [acceptTermsAndConditions, setAcceptTermsAndConditions] = useState(false)
    const [formErrors, setFormErrors] = useState({})

    const { userInfo: { name, cpf, email, password }, setUserInfo } = useUserInfoContext()

    const updateUserInfo = (name, value) => setUserInfo((prevState) => ({ ...prevState, [name]: value }))

    const validateAndNextStep = () => {
        const errors = {}
        if (
            name.split(' ').length < 2 
            || name.split(' ')[0].length < 3
            || !name.split(' ')[1].length
        ) errors.name = 'Sobrenome é obrigatório'
        if (name.length < 5) errors.name = 'Nome deve conter pelo menos 5 caracteres'
        if (!isValidCpf(cpf)) errors.cpf = 'CPF inválido'
        if (password.length < 5) errors.password = 'Senha deve conter pelo menos 5 caracteres'
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) errors.email = 'E-mail inválido'
        setFormErrors(errors)

        if (!Object.entries(errors).filter(([_key, value]) => value !== undefined).length) setStep(1)
    }

    return (
            <VStack
            height={'85%'}>
                <VStack
                height={'5%'}
                width={'100%'}
                alignItems={'center'}
                paddingTop={'15px'}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                        <Text width={'100%'} textAlign={'left'} paddingLeft={'40px'} fontWeight={'bold'}>Voltar</Text>
                    </TouchableWithoutFeedback>
                </VStack>

                <VStack
                height={'85%'}
                width={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
                space={4}>
                    <Text mx='40px'>Informe seus dados abaixo para solicitar seu cadastro.</Text>

                    <UserInfoInput
                    label={'Nome completo'}
                    value={name}
                    placeholder={'Seu nome completo'}
                    errorMessage={formErrors.name}
                    onChange={(value) => updateUserInfo('name', value)} />

                    <UserInfoInput
                    label={'CPF'}
                    value={cpf}
                    placeholder={'000.000.000-00'}
                    errorMessage={formErrors.cpf}
                    onChange={(value) => updateUserInfo('cpf', value)} />

                    <UserInfoInput
                    label={'E-mail'}
                    value={email}
                    placeholder={'email@email.com'}
                    errorMessage={formErrors.email}
                    onChange={(value) => updateUserInfo('email', value)} />

                    <UserInfoInput
                    label={'Senha'}
                    value={password}
                    placeholder={'********'}
                    errorMessage={formErrors.password}
                    onChange={(value) => updateUserInfo('password', value)} />

                    <Stack mx='55px'>
                        <Checkbox value={acceptTermsAndConditions} onChange={(value) => setAcceptTermsAndConditions(value)}>
                            Li e concordo com os Termos de Uso e Política de Privacidade
                        </Checkbox>
                    </Stack>

                </VStack>

                <VStack
                height={'10%'}
                width={'100%'}
                alignItems={'center'}>
                    <Button
                        onPress={() => validateAndNextStep()}
                        w='80%'
                        backgroundColor={!acceptTermsAndConditions ? 'neutral.400' : 'primary.500'}
                        disabled={!acceptTermsAndConditions}>
                        CONTINUAR
                    </Button>
                </VStack>
            </VStack>
    )
}