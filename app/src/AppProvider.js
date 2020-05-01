import React, {
  createContext,
  useMemo,
  useCallback,
  useContext,
  useReducer,
  useEffect
} from 'react'
import { useHistory } from 'react-router-dom'

const AppContext = createContext()

export function useAppState() {
  return useContext(AppContext)
}

function getUserLocalStorage() {
  try {
    const raw = localStorage.getItem('user')
    return JSON.parse(raw)
  } catch (err) {
    return null
  }
}

function reducer(state, action) {
  return { ...state, ...action }
}

export default function AppProvider({ children }) {
  const history = useHistory()
  const [state, dispatch] = useReducer(reducer, { user: null })

  useEffect(() => {
    dispatch({ user: getUserLocalStorage(), userFetched: true })
  }, [])

  const handleLogin = useCallback((data) => {
    dispatch({ user: data })
    localStorage.setItem('user', JSON.stringify(data))
  }, [])

  const handleLogout = useCallback(() => {
    dispatch({ user: null })
    localStorage.removeItem('user')
    history.push('/')
  }, [history])

  const value = useMemo(() => ({ handleLogin, state, handleLogout }), [
    handleLogin,
    handleLogout,
    state
  ])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
