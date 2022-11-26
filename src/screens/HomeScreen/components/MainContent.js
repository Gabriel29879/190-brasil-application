import { ScrollView, Spinner } from "native-base"
import { useEffect, useState } from "react"
import { getUserAuth } from "../../../utils/storage"
import { OcurrenceList } from "./OcurrenceList"
import { UnauthenticatedInfo } from "./UnauthenticatedInfo"
import { VerificationTimeMessage } from "./VerificationTimeMessage"

export const MainContent = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [contentOption, setContentOption] = useState(null)

    useEffect(() => {
        getUserAuth()
        .then(async (userAuth) => {
            if (!userAuth) {
                setContentOption('noAuth')
                setIsLoading(false)
                return
            }
            if (userAuth.isValidated) {
                setContentOption('validatedUser')
                setIsLoading(false)
                return
            }
            if (!userAuth.isValidated) {
                setContentOption('unvalidatedUser')
                setIsLoading(false)
                return
            }
        })
    }, [])

    const contentMap = {
        noAuth: <UnauthenticatedInfo />,
        unvalidatedUser: <VerificationTimeMessage />,
        validatedUser: <OcurrenceList />,
    }

    return (
        <>
            { isLoading && <Spinner size={'lg'} /> }
            { (!isLoading && contentMap[contentOption]) && contentMap[contentOption] }
        </>
    )
}