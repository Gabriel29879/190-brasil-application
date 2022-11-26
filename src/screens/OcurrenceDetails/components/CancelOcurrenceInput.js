import { FormControl, Input, Text } from "native-base";

export const CancelOcurrenceInput = ({
    value,
    placeholder,
    onChange,
    label
}) => (
    <FormControl>
        <FormControl.Label><Text fontSize={'10px'} fontWeight={'bold'}>{ label }</Text></FormControl.Label>
        <Input
        type='text' 
        value={value} 
        placeholder={placeholder} 
        variant={'underlined'}
        borderColor={'black'}
        onChangeText={onChange}
        padding={'0'} />
    </FormControl>
)