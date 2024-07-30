import { useEffect, useState, createContext, useContext } from 'react'
import Cookies from 'js-cookie'
import { loginRequest, registerRequest, verifyRequest } from '../api/auth'

export const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    const verifyToken = async () => {
      const token = Cookies.get('token')
      if (token) {
        try {
          const authUser = await verifyRequest(token)
          console.log(authUser)
          setUser(authUser.data)
        }
        catch (error) {
          console.log(error)
          setErrors(error.message)
          setUser(null)
        }
      }
      else {
        setUser(null)
      }
      setIsLoading(false)
    }

    verifyToken()

  }, [])

  const logout = () => {
    setIsLoading(true)
    Cookies.remove('token')
    setUser(null)
    setIsLoading(false)
  }

  const logIn = async (credentials) => {
    setIsLoading(true)
    try {
      const response = await loginRequest(credentials)
      console.log(response)
      Cookies.set('token', response.token)
      setUser(response.data.user)
    } catch (error) {
      console.log(error)
      setErrors(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const signUp = async (createUser) => {
    setIsLoading(true)
    try {
      const response = await registerRequest(createUser)
      console.log(response)
      setUser(response.data.user)
    } catch (error) {
      console.log(error)
      setErrors(error.message)
    }
    finally {
      setIsLoading(false)
    }
  }


  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout, errors, signUp, logIn }}>
      {children}
    </AuthContext.Provider>
  )
}
