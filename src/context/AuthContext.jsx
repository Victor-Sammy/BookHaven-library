import {
  useState,
  useContext,
  createContext,
  useMemo,
  useLayoutEffect,
} from 'react'
import axios from 'axios'
import { useCallback } from 'react'
import { rootAPI } from '../components/api/root-api'
import { baseURL } from '../components/api/root-api'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()
AuthContext.displayName = 'AuthContext'

export default function AuthProvider(props) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('USER_ACCESS_TOKEN')
  const userId = localStorage.getItem('USER_ID')

  useLayoutEffect(() => {
    console.log(`Bearer ${token}`)
    console.log(userId)
    // retrieve user from last session or cache
    const autoLogin = async () => {
      let userData = null
      setLoading(true)

      if (!token) {
        return
      }

      userData = await axios
        .get(`${rootAPI}/users/current/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        // eslint-disable-next-line no-unused-vars
        .catch((e) => {
          logout()
          return null
        })

      console.log(userData.data)

      if (!userData.data.user) throw new Error('Expired token')
      setLoading(false)

      setUser(userData.data)
    }
    autoLogin()
      // eslint-disable-next-line no-unused-vars
      .catch((e) => {
        logout()
      })
      .finally(() => {
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser])

  useLayoutEffect(() => {
    const googleAuth = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/auth/login/success`, {
          withCredentials: true,
        })
        setUser(data)
        console.log(data)
      } catch (error) {
        console.log(error.response?.data)
      }
    }
    googleAuth()
  }, [setUser])

  const login = useCallback(
    async (details) => {
      setLoading(true)
      const result = await axios.post(`${rootAPI}/users/login`, details)

      setUser(result.data)
      console.log('USER_ACCESS_TOKEN', result.data)
      localStorage.setItem('USER_ACCESS_TOKEN', result.data.accessToken)
      localStorage.setItem('USER_ID', result.data.user._id)
      setLoading(false)
      return result.data
    },
    [setUser]
  )

  const loginGoogle = () => {
    window.open(`${baseURL}/auth/google/callback`, '_self')
  }

  const updateUser = useCallback(
    async (details) => {
      setLoading(true)
      const updatedUser = await axios.put(
        `${rootAPI}/users/update/${userId}`,
        details,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setUser(updatedUser.data)
      console.log(updatedUser.data)
      navigate('/')
    },
    [userId, setUser, token]
  )

  const logout = useCallback(() => {
    return Promise.all([setLoading(true), setUser(null)]).then(() => {
      axios.get(`${baseURL}/auth/logout`).then(() => {
        setLoading(false)
        console.log('logged out')
      })
      localStorage.removeItem('USER_ACCESS_TOKEN')
    })
  }, [setUser])

  const register = useCallback((details) => {
    return axios.post(`${rootAPI}/users/register`, details)
  }, [])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      loading,
      loginGoogle,
      updateUser,
    }),
    [login, logout, user, register, loading, updateUser]
  )

  return <AuthContext.Provider value={value} {...props} />
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}
