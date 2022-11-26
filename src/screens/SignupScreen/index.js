import { useState } from 'react'
import { FullPageContainer } from '../../components/CustomContainers'
import { LogoHeader } from './components/LogoHeader'
import { RegistrationComplete } from './components/RegistrationComplete'
import { UserDocumentStep } from './components/UserDocumentStep'
import { UserInformationStep } from './components/UserInformationStep'
import { UserInfoContextProvider } from './context/UserInfoContext'

export const SignupScreen = () => {
    const [step, setStep] = useState(0)

    const stepMap = {
        0: <UserInformationStep setStep={setStep} />,
        1: <UserDocumentStep setStep={setStep} />,
        2: <RegistrationComplete setStep={setStep} />
    }

    return (
        <FullPageContainer>
            <LogoHeader />
            <UserInfoContextProvider>
                {stepMap[step]}
            </UserInfoContextProvider>
        </FullPageContainer>
    )
}


