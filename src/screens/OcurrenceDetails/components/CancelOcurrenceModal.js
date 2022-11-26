import { Button, HStack, Modal, Text, VStack } from "native-base";
import { CancelOcurrenceInput } from "./CancelOcurrenceInput";

export const CancelOcurrenceModal = ({
    isOpen,
    onClose,
    onConfirm,
    cancellationReason,
    onChangeCancellationReason,
    isConfirmDisabled,
    isLoading,
}) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
            <Modal.Body>
                <Text color={'#DE3E3E'} fontWeight={'700'} fontSize={'16px'} marginBottom={'8px'}>
                    Cancelar ocorrência
                </Text>
                <Text>
                    Tem certeza que deseja cancelar essa ocorrência? Conte-nos o motivo pelo cancelamento.
                </Text>

                <CancelOcurrenceInput 
                label={'Motivo do cancelamento'} 
                placeholder={'Descreva'} 
                value={cancellationReason} 
                onChange={onChangeCancellationReason} />

                <HStack marginTop={'20px'} space={2}>
                    <VStack flex={1}>
                        <Button backgroundColor={'#9BA0AC'} onPress={onClose}>CANCELAR</Button>
                    </VStack>
                    <VStack flex={1}>
                        <Button 
                        backgroundColor={isConfirmDisabled ? '#DBDDE2' : '#DE3E3E'} 
                        onPress={onConfirm}
                        isLoading={isLoading}
                        disabled={isConfirmDisabled}>
                            CONFIRMAR
                        </Button>
                    </VStack>
                </HStack>
            </Modal.Body>
        </Modal.Content>
    </Modal>
)