import { useNavigation } from "@react-navigation/native"
import { KeyboardAvoidingView, ScrollView, Text, View, WarningTwoIcon } from "native-base"
import { useEffect, useState } from "react"
import { Dimensions, TouchableWithoutFeedback } from 'react-native'
import { getUserAuth } from "../utils/storage"
import { ScreenHeader } from "./ScreenHeader"

export const FullPageContainer = ({ children }) => (
    <KeyboardAvoidingView behavior='height' flex={1}>
        <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
            <View h={`${Dimensions.get('window').height}px`}>
                {children}
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
)

export const ContainerWithHeader = ({ children }) => (
    <KeyboardAvoidingView behavior='height' flex={1}>
        <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
            <ScreenHeader />
            <View h={`${Dimensions.get('window').height - 50}px`} padding={'25px'}>
                {children}
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
)    


export const ContainerWithHeaderHome = ({ children }) => {
    const navigation = useNavigation()
    const [isCreateOcurrenceButtonVisible, setIsCreateOcurrenceButtonVisible] = useState(false)

    useEffect(() => {
        getUserAuth()
        .then(userAuth => {
            if (userAuth?.isValidated) {
                setIsCreateOcurrenceButtonVisible(true)
            } else {
                setIsCreateOcurrenceButtonVisible(false)
            }
        })
    }, [])

    return (
        <KeyboardAvoidingView behavior='height' flex={1}>
            <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
                <ScreenHeader />
                    <View h={`${Dimensions.get('window').height - 50}px`} padding={'25px'}>
                        {children}
                        {
                            isCreateOcurrenceButtonVisible && (
                                <TouchableWithoutFeedback onPress={() => navigation.navigate('CreateOcurrence')}>
                                    <View 
                                    h='50px' 
                                    position='absolute' 
                                    bottom={0} 
                                    w={Dimensions.get('window').width}
                                    backgroundColor='#DE3E3E'
                                    alignItems='center'
                                    justifyContent='center'
                                    display='flex'
                                    flexDirection="row"
                                    borderTopRadius={'10px'}>
                                        <WarningTwoIcon color='white' size='5' />
                                        <Text color='#FFFFFF' fontWeight='bold' marginLeft='10px'>
                                            CRIAR OCORRÊNCIA
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }
                    </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )    
}

export const ContainerWithHeaderCreateOcurrence = ({ children }) => {

    return (
        <KeyboardAvoidingView behavior='height' flex={1}>
            <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
                <ScreenHeader noRadius={true} />
                <View 
                h='50px' 
                w='100%'
                backgroundColor='#DE3E3E'
                alignItems='center'
                justifyContent='center'
                borderBottomRadius={'10px'}>
                    <Text color='#FFFFFF' fontWeight='bold'>
                        DESCREVA SUA OCORRÊNCIA
                    </Text>
                </View>
                <View h={`${Dimensions.get('window').height - 100}px`} padding={'25px'}>
                    {children}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )    
}