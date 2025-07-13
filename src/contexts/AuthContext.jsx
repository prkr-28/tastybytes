import { createContext, useContext, useEffect, useState } from 'react'
import { authAPI, setAuthToken, removeAuthToken } from '../lib/api'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('authToken')
    if (token) {
      getCurrentUser()
    } else {
      setLoading(false)
    }
  }, [])

  const getCurrentUser = async () => {
    try {
      const response = await authAPI.getCurrentUser()
      setUser(response.user)
    } catch (error) {
      console.error('Get current user error:', error)
      removeAuthToken()
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (userData) => {
    try {
      setLoading(true)
      const response = await authAPI.register(userData)
      
      setAuthToken(response.token)
      setUser(response.user)
      toast.success('Account created successfully!')
      
      return { data: response, error: null }
    } catch (error) {
      toast.error(error.message || 'Registration failed')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (credentials) => {
    try {
      setLoading(true)
      const response = await authAPI.login(credentials)
      
      setAuthToken(response.token)
      setUser(response.user)
      toast.success('Welcome back!')
      
      return { data: response, error: null }
    } catch (error) {
      toast.error(error.message || 'Login failed')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      removeAuthToken()
      setUser(null)
      toast.success('Signed out successfully')
    } catch (error) {
      toast.error('Sign out failed')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (userData) => {
    try {
      const response = await authAPI.updateProfile(userData)
      setUser(response.user)
      toast.success('Profile updated successfully!')
      return { data: response, error: null }
    } catch (error) {
      toast.error(error.message || 'Profile update failed')
      return { data: null, error }
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    getCurrentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}