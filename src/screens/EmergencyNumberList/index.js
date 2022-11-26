import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import { ContainerWithHeader } from "../../components/CustomContainers";
import { ReturnButton } from "../../components/ReturnButton";
import { EmergencyNumberCard } from "./components/EmergencyNumberCard";

const emergencyNumbers = [
    { title: 'Polícia Militar', number: '190' },
    { title: 'Polícia Rodoviária Federal', number: '191' },
    { title: 'Ambulância Pública (SAMU)', number: '192' },
    { title: 'Corpo de Bombeiros', number: '193' },
    { title: 'Polícia Federal', number: '194' },
    { title: 'Ministério da Saúde - Apoio COVID-19', number: '196' },
    { title: 'Polícia Civil', number: '197' },
    { title: 'Polícia Rodoviária Estadual', number: '198' },
    { title: 'Defesa Civíl', number: '199' },
]

export const EmergencyNumberList = () => {
    const navigation = useNavigation()

    return (
        <ContainerWithHeader>
            <ReturnButton onPress={() => navigation.goBack()} />
            <Text 
            color={'primary.500'} 
            fontWeight='700' 
            fontSize={'18px'} 
            textAlign='center' 
            marginTop={'16px'}>
                Números emergenciais
            </Text>
    
            <Text marginTop={'16px'} marginBottom={'8px'}>
                Você pode ligar para estes números gratuitamente de qualquer telefone. A maioria deles está disponível 24 horas por dia, 7 dias por semana.
            </Text>
    
            { emergencyNumbers.map(({ title, number }) => <EmergencyNumberCard title={title} number={number} key={title} />) }
    
        </ContainerWithHeader>
    )
}