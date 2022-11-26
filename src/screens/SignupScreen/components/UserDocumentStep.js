import { Button, Stack, Text, VStack } from 'native-base'
import { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { PhotoPicker } from '../../../components/PhotoPicker'
import { makeRequest } from '../../../utils/api'
import { useUserInfoContext } from '../context/UserInfoContext'

export const UserDocumentStep = ({ setStep }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [imageData, setImageData] = useState(null)
    const { userInfo: { name, cpf, email, password } } = useUserInfoContext()

    const registerUser = () => {
        setIsLoading(true)
        makeRequest({
            route: '/user',
            args: { name, cpf, password, email, faceAndDocumentPhotoData: imageData },
            method: 'POST',
        })
        .then(() => {
            setIsLoading(false)
            setStep(2)
        })
        .catch((error) => {
            setIsLoading(false)
            Toast.show({ description: error })
        })
    }
    return (
        <VStack height='85%' alignItems='center'>
            <VStack
            height={'8%'}
            space={4}
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}>
                <TouchableWithoutFeedback onPress={() => setStep(0)}>
                    <Text width={'100%'} textAlign={'left'} paddingLeft={'30px'} fontWeight={'bold'}>Voltar</Text>
                </TouchableWithoutFeedback>
            </VStack>

            <VStack
            height={'40%'}
            space={4}
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}>
                <Stack mx={'30px'}>
                    <Text>Agora precisamos de uma foto sua segurando seu documento. Pode ser o RG, CNH ou RNE.{'\n'}</Text>
                    <Text>
                        - Não tire foto de outra foto, ela precisa ser recente.{'\n'}
                        - Esteja com seu documento, não será permitido fotos com documentos de outra pessoa.{'\n'}
                        - Não cubra o rosto, mantenha-se visivel em ambiente bem iluminado junto ao documento.{'\n'}
                    </Text>
                    <Text>Sua foto não será divulgada em nenhuma fonte, usaremos somente para confirmação de sua identidade.</Text>
                </Stack>
            </VStack>

            <VStack
            height={'40%'}
            space={4}
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}>
                <PhotoPicker setImageData={setImageData} />
            </VStack>

            <VStack
            height={'12%'}
            space={4}
            width={'100%'}
            alignItems={'center'}>
                <Button
                backgroundColor={!imageData ? 'neutral.400' : 'primary.500'}
                disabled={!imageData}
                onPress={() => registerUser()}  
                width={'80%'}
                isLoading={isLoading}>
                    ENVIAR
                </Button>
            </VStack>

        </VStack>
    )
}