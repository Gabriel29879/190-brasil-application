import { ScrollView, Spinner, Text, VStack } from "native-base"
import { useEffect, useState } from "react"
import { makeRequest } from "../../../utils/api"
import { OcurrenceCard } from "./OcurrenceCard"

export const OcurrenceList = () => {
    const [isLoadingOcurrenceList, setIsLoadingOcurrenceList] = useState(false)
    const [ocurrenceData, setOcurrenceData] = useState(null)
    const [skip, setSkip] = useState(0)
    const [noMoreOcurrences, setNoMoreOcurrences] = useState(false)

    useEffect(() => {
        if (!noMoreOcurrences) {
            setIsLoadingOcurrenceList(true)
            makeRequest({ route: `/user/ocurrence?skip=${skip}` })
            .then(async (response) => {
                const ocurrences = await response.json()
                if (!ocurrences?.length) {
                    setNoMoreOcurrences(true)
                    setIsLoadingOcurrenceList(false)
                    return;
                }
                setOcurrenceData((prev) => {
                    if (prev?.length) return [...prev, ...ocurrences]
                    return ocurrences.length ? [...ocurrences] : []
                })
                setIsLoadingOcurrenceList(false)
            })
            .catch(e => {
                setNoMoreOcurrences(true)
                setIsLoadingOcurrenceList(false)
                setOcurrenceData(null)
                console.log(e)
            })
        }
    }, [skip])

    return (
        <VStack h='100%'>
            <VStack h='5%'>
                <Text fontWeight={'bold'}>Ocorrências</Text>
            </VStack>
            <ScrollView h='95%' onScrollEndDrag={() => {
                if (!isLoadingOcurrenceList && !noMoreOcurrences) {
                    setSkip(skip + 5)
                }
            }}>
                <VStack h='100%' space={2} paddingLeft='2px' paddingRight='2px' paddingBottom='100px'>
                    { 
                        (ocurrenceData?.length) && ocurrenceData.map(
                            (ocurrence, i) => <OcurrenceCard key={i} ocurrence={ocurrence} />
                        )
                    }
                    { 
                        (!isLoadingOcurrenceList && !ocurrenceData?.length) && (
                            <Text textAlign={'center'} marginTop={'40px'}>Sem ocorrências</Text>
                        )
                    }
                    { isLoadingOcurrenceList && <Spinner size={'lg'} marginTop='10px' /> }
                </VStack>
            </ScrollView>
        </VStack>
    )
}