import React, { FC, useEffect, useState } from 'react'
import Header from './Header'
import { RootReducerType } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { isTokenExpired } from '../../utils/functions'
import { isUserConnected } from '../../redux/actions/user.actions'
import { useNavigate } from 'react-router-dom'
import SideBar from '../sidebar/SideBar'

const PageContainer: FC<{ children: JSX.Element }> = ({ children }) => {
    const navigate = useNavigate()

    const { connected } = useSelector(state => (state as RootReducerType).user)

    const [isConnected, setIsConnected] = useState(connected)

    const dispatch = useDispatch<any>()

    useEffect(() => {
        const expiration_date = localStorage.getItem('expiration_date')
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')

        if (expiration_date && token && user) {
            if (isTokenExpired(new Date().getTime(), parseInt(expiration_date, 10))) {
                setIsConnected(false)
                navigate('/')
            } else {
                setIsConnected(true)
            }
        } else {
            setIsConnected(false)
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
        dispatch(isUserConnected(isConnected))
    }, [isConnected, dispatch])

    return (
        <div className='body_page'>
            <Header />

            <div className='body_container'>
                <SideBar />

                <div className='right_body'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PageContainer