import AsyncStorage from "@react-native-async-storage/async-storage"

export const getUserAuth = async () => {
    const userAuth = await AsyncStorage.getItem('@userAuth')
    if (!userAuth) return null
    return JSON.parse(userAuth)
}

export const setUserAuth = async (userAuth) => {
    await AsyncStorage.setItem('@userAuth', JSON.stringify(userAuth))
}

export const deleteUserAuth = async () => {
    await AsyncStorage.removeItem('@userAuth')
}