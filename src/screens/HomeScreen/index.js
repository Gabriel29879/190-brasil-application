import { 
    VStack 
} from 'native-base'
import { Actions } from './components/Actions'
import { ContainerWithHeaderHome } from '../../components/CustomContainers'
import { MainContent } from './components/MainContent'

export const HomeScreen = () => {
    return (
        <ContainerWithHeaderHome>
            <VStack h={'25%'}>
                <Actions />
            </VStack>
            <VStack w='100%' h={'75%'}>
                <MainContent />
            </VStack>
        </ContainerWithHeaderHome>
    )
}
