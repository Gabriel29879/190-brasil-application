import { CommonActions, useNavigation } from "@react-navigation/native"
import { Button, Spinner, Text, Toast, VStack } from "native-base"
import { useEffect, useState } from "react"
import { ContainerWithHeader } from "../../components/CustomContainers"
import { ReturnButton } from "../../components/ReturnButton"
import { makeRequest } from "../../utils/api"
import { ocurrenceStatusColorMap, ocurrenceStatusMap, ocurrenceTypeMap } from "../../utils/maps"
import { OcurrenceTypeButton } from "../CreateOcurrence/components/OcurrenceTypeButton"
import { CancelOcurrenceModal } from "./components/CancelOcurrenceModal"

const ocurrenceTypeDescriptionMap = {
    'EMERGENCY': 'Em caso de urgencia, possuindo risco ou acidente contra vida.',
    'THEFT': 'Tanto para roubo de veículo, pedestre ou residencial.', 
    'PERTURBATION': 'Quando há alguma pertubação sonora nas proximidades.', 
    'OTHER': 'Para casos não listados anteriormente.'
}

export const OcurrenceDetails = ({ route }) => {
    const navigation = useNavigation()
    const [isOcurrenceLoading, setIsOcurrenceLoading] = useState(false)
    const [isCancelOcurrenceLoading, setIsCancelOcurrenceLoading] = useState(false)
    const [ocurrence, setOcurrence] = useState(null)
    const [isCancelOcurrenceModalVisible, setIsCancelOcurrenceModalVisible] = useState(false)
    const [cancellationReason, setCancellationReason] = useState(null)

    const cancelOcurrence = () => {
        setIsCancelOcurrenceLoading(true)
        makeRequest({ 
            route: '/user/ocurrence/cancel', 
            method: 'PUT', 
            args: { 
                _id: route.params._id,
                cancellationReason,
            }
        })
        .then(() => {
            setIsCancelOcurrenceLoading(false)
            navigation.dispatch(
                CommonActions.reset(
                    {
                        index: 1,
                        routes: [{ name: 'Home' }],
                    }
                )
            )
        })
        .catch((error) => {
            setIsCancelOcurrenceLoading(false)
            Toast.show({ description: error })
        })
    }

    useEffect(() => {
        (async () => {
            try {
                setIsOcurrenceLoading(true)
                const response = await makeRequest({ 
                    route: `/user/ocurrence?_id=${route.params._id}&skip=0`
                })
                const ocurrence = await response.json()
                setOcurrence(ocurrence[0])
                setIsOcurrenceLoading(false)
            } catch (error) {
                setIsOcurrenceLoading(false)
                Toast.show({ description: error.message })
            }
        })()
    }, [])

    return (
        <ContainerWithHeader>
            <CancelOcurrenceModal 
            isOpen={isCancelOcurrenceModalVisible} 
            onClose={() => {
                setIsCancelOcurrenceModalVisible(false)
                setCancellationReason(null)
            }}
            onConfirm={cancelOcurrence}
            isLoading={isCancelOcurrenceLoading}
            isConfirmDisabled={!cancellationReason}
            cancellationReason={cancellationReason}
            onChangeCancellationReason={(value) => setCancellationReason(value)} />
            {
                isOcurrenceLoading 
                ? (
                    <VStack
                    width={'100%'}
                    height={'100%'}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'>
                        <Spinner size={'lg'} />
                    </VStack>
                ) 
                : (
                    <>
                        <VStack
                        width={'100%'}
                        height={'5%'}>
                            <ReturnButton onPress={() => navigation.navigate('Home')} />
                        </VStack>

                        <VStack
                        width={'100%'}
                        height={'50%'}
                        space='4'>
                            <VStack>
                                <Text fontWeight={'bold'}>Status:</Text>
                                <Text color={ocurrenceStatusColorMap[ocurrence?.status]} fontWeight={'700'}>
                                    {ocurrenceStatusMap[ocurrence?.status]}
                                </Text>
                            </VStack>
                            <VStack>
                                <Text fontWeight={'bold'} marginBottom={'5px'}>Tipo:</Text>
                                <OcurrenceTypeButton
                                isActive
                                action={() => {}} 
                                title={ocurrenceTypeMap[ocurrence?.type]}
                                description={ocurrenceTypeDescriptionMap[ocurrence?.type]} />
                            </VStack>
                            <VStack>
                                <Text fontWeight={'bold'}>Descrição da ocorrência:</Text>
                                <Text>{ocurrence?.description}</Text>
                            </VStack>
                        </VStack>
                        
                        {
                            (ocurrence?.status === 'PENDING' || ocurrence?.status === 'IN_ATTENDANCE') && (
                                <VStack
                                width={'100%'}
                                height={'45%'}
                                alignItems={'center'}
                                justifyContent={'flex-end'}>
                                    <Button 
                                    onPress={() => setIsCancelOcurrenceModalVisible(true)} 
                                    backgroundColor={'#DE3E3E'} 
                                    width={'60%'}>
                                        <Text fontWeight={'700'} color={'white'}>CANCELAR OCORRÊNCIA</Text>
                                    </Button>
                                </VStack>
                            )
                        }
                    </>
                )
            }
        </ContainerWithHeader>
    )
}