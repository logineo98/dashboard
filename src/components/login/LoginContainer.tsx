import React, { FC } from 'react'
import Loading from '../loading/Loading'
import { RootReducerType } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetForget } from '../../redux/actions/user.actions'

// importation des icons
import { BiHome } from 'react-icons/bi'

const LoginContainer: FC<{ children: JSX.Element, title?: string }> = ({ children, title }) => {

    const { loadingUser } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    return (
        <div className='not_conntected'>
            <div className='content'>
                <div className='left_part'>
                    {/* <img src='./login_img.jpeg' alt='img_left_login' /> */}
                </div>

                <div className='right_part'>
                    {title !== 'login' && <Link to='/' className='home' onClick={() => dispatch(resetForget())}><BiHome className='icon' /></Link>}
                    <div className='container'>
                        <div className='logo_welcome'>
                            <div className='logo_img_container'>
                                <img src='./logo.jpg' alt='logo' />
                            </div>
                            <h1>Bienvenue à vous</h1>
                        </div>

                        {loadingUser &&
                            <div className='loading_container'>
                                <Loading h_w={50} hide_text padding='0px' />
                            </div>
                        }

                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginContainer