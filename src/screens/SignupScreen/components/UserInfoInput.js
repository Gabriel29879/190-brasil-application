import { FormControl, Input, Stack, WarningOutlineIcon } from "native-base";

export const UserInfoInput = ({
    value,
    placeholder,
    errorMessage,
    onChange,
    label
}) => (
    <FormControl isInvalid={errorMessage}>
        <Stack mx='40px'>
            <FormControl.Label>{ label }</FormControl.Label>
            <Input type='text' value={value} placeholder={placeholder} variant={'underlined'} onChangeText={onChange} />
            {
                errorMessage && (
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        { errorMessage }
                    </FormControl.ErrorMessage>
                )
            }
        </Stack>
    </FormControl>
)