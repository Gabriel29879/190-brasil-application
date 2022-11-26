import { useState } from 'react'
import { Image, TouchableWithoutFeedback } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Button, VStack } from 'native-base'
import uploadIcon from '../../assets/uploadIcon.png'

export const PhotoPicker = ({ setImageData }) => {
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      base64:true
    })

    if (!result.cancelled) {
      setImage(result.uri)
      setImageData({ uri: result.base64, fileExtension: result.uri.split('.').pop() })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={pickImage}>
        <VStack width={'100%'} alignItems={'center'} justifyContent={'center'} space={4}>
            {
              !image && (
                <VStack 
                background={'#EFF1F6'} 
                height={'85%'} 
                width={'85%'} 
                borderStyle={'dashed'} 
                borderWidth={'2px'} 
                borderColor={'#BFC3CA'}
                alignItems={'center'}
                justifyContent={'center'}>
                  <Image source={uploadIcon} style={{ width: 64, height: 64 }} />
                  <Button onPress={pickImage} backgroundColor={'#9BA0AC'} width={'60%'}>PROCURAR ARQUIVO</Button>
                </VStack>
              )
            }
            {image && <Image source={{ uri: image }} style={{ width: '85%', height: '85%' }}  />}
        </VStack>
    </TouchableWithoutFeedback>
  )
}