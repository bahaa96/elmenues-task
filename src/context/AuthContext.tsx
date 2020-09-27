import React, { useState, useEffect, createContext } from 'react';


interface IContextProps {
  currentUser: IUser | null
  setCurrentUser: (user: IUser) => void
  isAuthenticated: boolean,
}

interface IUser {

}

const AuthContext = createContext<IContextProps>({
  isAuthenticated: false,
  currentUser: null,
  setCurrentUser: () => {}
})

export const AuthContextProvider:React.FC = (props) => {
  const [ user, setUser ] = useState<null | IUser>(null);
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);


  const setCurrentUser = async (user: IUser) => {
    if (user) {
      setUser(user)
      try {
        await localStorage.setItem('user', JSON.stringify(user))
        setIsAuthenticated(true)
      }
      catch(e) {
        console.log('error: ', e);
      }
    }
  } 

  const getStoredUser = async () => {
    try {
      let storedUser = await localStorage.getItem('user');
      if (storedUser) {
        storedUser = JSON.parse(storedUser);
        setUser(storedUser)
        setIsAuthenticated(true);
      }
    }
    catch(e) {
      console.log('error: ', e);
    }
  }

  useEffect(() => {
    if (!user) {
      getStoredUser()
    }
  }, [])

  const value = {
    setCurrentUser,
    currentUser: user,
    isAuthenticated
  }

  return (
    <AuthContext.Provider {...{value}}>
      {
        props.children
      }
    </AuthContext.Provider>
  )
}

export default AuthContext; 