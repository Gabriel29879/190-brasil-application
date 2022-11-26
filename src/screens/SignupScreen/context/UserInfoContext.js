import { createContext, useContext, useState } from 'react'

const UserInfoContext = createContext()

const useUserInfoContext = () => useContext(UserInfoContext)

const UserInfoContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
  })

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  )
}

export { useUserInfoContext, UserInfoContextProvider }