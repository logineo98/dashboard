import React, { FC } from 'react'
import Loading from '../loading/Loading'
import { RootReducerType } from '../../redux/store'
import { useSelector } from 'react-redux'

const LoginContainer: FC<{ children: JSX.Element }> = ({ children }) => {

    const { loadingUser } = useSelector((state: RootReducerType) => state.user)

    return (
        <div className='not_conntected'>
            <div className='content'>
                <div className='left_part'>
                    {/* <img src='./login_img.jpeg' alt='img_left_login' /> */}
                </div>

                <div className='right_part'>
                    <div className='container'>
                        <div className='logo_welcome'>
                            <div className='logo_img_container'>
                                <img src='./EDM.jpg' alt='logo_EDM' />
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