import { useNavigation } from "@react-navigation/native"
import dayjs from "dayjs";
import { HStack, Text, View, VStack } from "native-base";
import { TouchableWithoutFeedback } from "react-native";
import { ocurrenceStatusColorMap, ocurrenceStatusMap, ocurrenceTypeMap } from "../../../utils/maps";

export const OcurrenceCard = ({ ocurrence }) => {
    const navigation = useNavigation()

    const goToOcurrenceDetails = () => {
        navigation.navigate('OcurrenceDetails', { _id: ocurrence._id })
    }

    return (
        <TouchableWithoutFeedback onPress={() => goToOcurrenceDetails()}>
            <View 
            w='100%'
            backgroundColor={'#FFFFFF'} 
            padding='8px' 
            borderRadius={'4px'}
            shadow='1'>
                <VStack space={1}>
                    <HStack>
                        <View flex={1} justifyContent={'center'}>
                            <Text fontSize={'14px'} color={ocurrenceStatusColorMap[ocurrence.status]}>
                                {ocurrenceStatusMap[ocurrence.status]}
                            </Text>
                        </View>
                        <View flex={1} alignItems={'flex-end'} justifyContent={'center'}>
                            <Text color='#9BA0AC' fontSize={'10px'}>
                                {dayjs(ocurrence.createdAt).format('DD/MM/YYYY')}
                            </Text>
                        </View>
                    </HStack>
        
                    <VStack>
                        <View>
                            <Text fontSize={'10px'} fontWeight='bold'>Tipo:</Text>
                        </View>
                        <View>
                            <Text color='#585B65' fontSize={'12px'}>{ocurrenceTypeMap[ocurrence.type]}</Text>
                        </View>
                    </VStack>
                    <VStack>
                        <View>
                            <Text fontSize={'10px'} fontWeight='bold'>Descrição da ocorrência:</Text>
                        </View>
                        <View>
                            <Text color={ocurrence.description ? '#585B65' : '#9BA0AC'} fontSize={'12px'}>
                                {
                                    ocurrence.description 
                                    ? (
                                        ocurrence.description.split('').length > 113 
                                        ? `${ocurrence.description.slice(0, 113)}...`
                                        : ocurrence.description
                                    )
                                    : 'Não foi informada a descrição da ocorrência.'
                                }
                            </Text>
                        </View>
                    </VStack>
                </VStack>
            </View>
        </TouchableWithoutFeedback>
    )
}