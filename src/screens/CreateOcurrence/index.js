import { CommonActions, useNavigation } from "@react-navigation/native";
import { Button, Checkbox, FormControl, Input, Text, Toast, VStack } from "native-base";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { ContainerWithHeaderCreateOcurrence } from "../../components/CustomContainers";
import { OcurrenceTypeButton } from "./components/OcurrenceTypeButton";
import * as Location from 'expo-location';
import { makeRequest } from "../../utils/api";
import { ReturnButton } from "../../components/ReturnButton";

export const CreateOcurrence = () => {
    const navigation = useNavigation()
    const [isCreateOcurrenceLoading, setIsCreateOcurrenceLoading] = useState(false)
    const [ocurrenceType, setOcurrenceType] = useState(null)
    const [description, setDescription] = useState(null)
    const [acceptLocationSharing, setAcceptLocationSharing] = useState(true)

    const createOcurrence = async () => {
        try {
            setIsCreateOcurrenceLoading(true)
            const { android: { accuracy, scoped }, granted } = await Location.getForegroundPermissionsAsync()
            if (accuracy === 'none' || scoped === 'none' || !granted) {
                const { status } = await Location.requestForegroundPermissionsAsync()
                if (status !== 'granted') {
                    setIsCreateOcurrenceLoading(false)
                    Toast.show({ description: 'Localização é necessária para criar ocorrências.' })
                    return
                }
            }
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync()
            const response = await makeRequest({
                route: '/user/ocurrence',
                method: 'POST',
                args: { description, type: ocurrenceType, latitude, longitude },
            })
            const { _id } = await response.json()
            setIsCreateOcurrenceLoading(false)
            navigation.dispatch(
                CommonActions.reset(
                    {
                        index: 1,
                        routes: [
                            { name: 'Home' }, 
                            { 
                              name: 'OcurrenceDetails',
                              params: { _id }
                            }
                        ],
                    }
                )
            )
        } catch(error) {
            setIsCreateOcurrenceLoading(false)
            Toast.show({ description: error })
        }
    } 

    return (
        <ContainerWithHeaderCreateOcurrence>
            <VStack
            width={'100%'}
            height={'5%'}>
                <ReturnButton onPress={() => navigation.navigate('Home')} />
            </VStack>
            <VStack
            space={4}
            width='100%'
            height='60%'
            alignItems='center'
            justifyContent='center'>
                <Text 
                width={'100%'} 
                textAlign={'left'}
                fontWeight={'bold'}>
                    Selecione o tipo:
                </Text>
                <OcurrenceTypeButton 
                title='Risco de vida'
                description='Em caso de urgencia, possuindo risco ou acidente contra vida.'
                action={() => setOcurrenceType('EMERGENCY')}
                isActive={ocurrenceType === 'EMERGENCY'} />

                <OcurrenceTypeButton 
                title='Furto'
                description='Tanto para roubo de veículo, pedestre ou residencial.'
                action={() => setOcurrenceType('THEFT')}
                isActive={ocurrenceType === 'THEFT'} />

                <OcurrenceTypeButton 
                title='Perturbação'
                description='Quando há alguma pertubação sonora nas proximidades.'
                action={() => setOcurrenceType('PERTURBATION')}
                isActive={ocurrenceType === 'PERTURBATION'} />

                <OcurrenceTypeButton 
                title='Outro'
                description='Para casos não listados anteriormente.'
                action={() => setOcurrenceType('OTHER')}
                isActive={ocurrenceType === 'OTHER'} />
            </VStack>
            <VStack
            width='100%'
            height='15%'
            alignItems='center'
            display='flex'
            justifyContent='center'>
                <FormControl>
                    <FormControl.Label>Descrição da ocorrência:</FormControl.Label>
                    <Input 
                    type='text' 
                    value={description} 
                    placeholder="Descreva sua ocorrência" 
                    variant='underlined'
                    onChangeText={(value) => setDescription(value)} />
                </FormControl>
            </VStack>
            <VStack
            width='100%'
            height='10%'
            alignItems='center'
            display='flex'
            justifyContent='center'>
                <Checkbox 
                value={acceptLocationSharing} 
                defaultIsChecked 
                onChange={(value) => setAcceptLocationSharing(value)}>
                    <Text color='neutral.700' fontSize='12px'>
                        Autorizo o compartilhamento de dados pessoais e localização
                        atual com autoridades responsáveis.
                    </Text>
                </Checkbox>
            </VStack>
            <VStack
            width='100%'
            height='10%'
            alignItems='center'
            display='flex'
            justifyContent='flex-end'>
                <Button 
                onPress={() => createOcurrence()} 
                backgroundColor={!acceptLocationSharing || !ocurrenceType ? 'neutral.400' : 'primary.500'} 
                width={'80%'} 
                isLoading={isCreateOcurrenceLoading}
                disabled={!acceptLocationSharing || !ocurrenceType}>
                    <Text color={!acceptLocationSharing || !ocurrenceType ? 'neutral.600' : 'white'}>
                        ENVIAR OCORRÊNCIA
                    </Text>
                </Button>
            </VStack>
        </ContainerWithHeaderCreateOcurrence>
    )
}