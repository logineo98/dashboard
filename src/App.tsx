import React, { useEffect, useState } from 'react'
import RouterIndex from './pages/router'
import { useDispatch } from 'react-redux'
import { getAdmin, isUserConnected } from './redux/actions/user.actions'
import { isTokenExpired } from './utils/functions'

const App = () => {

  const [isConnected, setIsConnected] = useState(false)

  const dispatch = useDispatch<any>()

  useEffect(() => {
    const expiration_date = localStorage.getItem('expiration_date')
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (expiration_date && token && user) {
      if (isTokenExpired(new Date().getTime(), parseInt(expiration_date, 10))) {
        setIsConnected(false)
      } else {
        setIsConnected(true)
      }
    } else {
      setIsConnected(false)
    }
  }, [])

  useEffect(() => {
    dispatch(isUserConnected(isConnected))
    dispatch(getAdmin())
  }, [isConnected, dispatch])

  return <RouterIndex />
}

export default App