import React, { useEffect, useState } from 'react'
import { PAGE_COMPONENT_TYPE } from '../utils/types'
import LoginContainer from '../components/login/LoginContainer'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'
import { LoadingUser } from '../redux/actions/user.actions'
import { ERROR_USER, auth } from '../redux/constants'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

// importation des icons
import { MdOutlineAccountCircle } from 'react-icons/md'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { page_connexion } from '../utils/name_page'

const Login: PAGE_COMPONENT_TYPE = () => {
    const data = { username: '', password: '' }

    const [seePassword, setSeePassword] = useState(false)
    const [loginData, setLoginData] = useState(data)

    const { username, password } = loginData

    const { loadingUser } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if ((username && username.trim()) !== '' && (password && password.trim() !== '')) {
            dispatch(LoadingUser())

            axios.post(`${auth}/login`, loginData)
                .then(res => {
                    const now = new Date()
                    const finalHour = new Date(now.getTime() + res.data.expiresIn * 1000)
                    localStorage.setItem('token', res.data.accessToken)
                    localStorage.setItem('expiration_date', finalHour.getTime().toString())
                    localStorage.setItem('user', JSON.stringify(res.data))

                    // localStorage.removeItem('usernameOrPhone')
                    window.location.href = '/'
                })
                .catch(error => {
                    toast.error(error?.response?.data?._embedded?.errors[0]?.message)
                    dispatch({ type: ERROR_USER, payload: error?.response?.data?._embedded?.errors[0]?.message })
                })
        } else {
            toast.warn('Veuillez renseigner les deux champs')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        document.title = page_connexion
    }, [])

    return (
        <LoginContainer title='login'>
            <form onSubmit={handleSubmit}>
                <div className='input_container'>
                    <input type='text' name='username' id='username' placeholder='Username ou num. de tél.' onChange={handleChange} />
                    <MdOutlineAccountCircle className='icon' />
                </div>

                <div className='input_container'>
                    <input type={seePassword ? 'text' : 'password'} name='password' id='password' placeholder='Mot de passe' onChange={handleChange} />
                    {!seePassword ?
                        <AiOutlineEye className='icon password' title='Afficher le mot de passe' onClick={() => setSeePassword(prev => !prev)} /> :
                        <AiOutlineEyeInvisible className='icon password' title='Masquer le mot de passe' onClick={() => setSeePassword(prev => !prev)} />
                    }
                </div>

                <div className='remember_forget'>
                    <label htmlFor='remember'>
                        <input type='checkbox' name='remember' id='remember' /> Souvenir
                    </label>

                    <Link to='/forget-password' onClick={() => { }}>Mot de passe oublié</Link>
                </div>

                <button disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }}>Login</button>
            </form>
        </LoginContainer>
    )
}

export default Login