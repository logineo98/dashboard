import React, { useState } from 'react'
import { BiDownArrow, BiRightArrow, BiUserCircle } from 'react-icons/bi'
import { MdLogout } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'

const Header = () => {

    const [seeOptions, setSeeOptions] = useState(false)

    const { admin } = useSelector((state: RootReducerType) => state.user)



    return (
        <header>
            <Link to='/' className='logo_img_container'>
                <img src='./logo.jpg' alt='logo' />
            </Link>

            <div className='header_container'>
                <div className='left_part' onClick={() => { }}>
                    {/* <MdMenu className='icon' />
                    <p>Menu</p> */}
                </div>

                <div className='right_part'>
                    <div className='username_icon' onClick={() => setSeeOptions(prev => !prev)}>
                        <BiUserCircle className='icon' />
                        <span className='username'> {admin?.username} </span>
                        {seeOptions ? <BiDownArrow className='icon2' /> : <BiRightArrow className='icon2' />}
                    </div>

                    {seeOptions &&
                        <div className='options'>
                            <Link to='/admin' className='icon_name' onClick={() => setSeeOptions(false)}>
                                <CgProfile className='icon' />
                                <span className='name'>Administrateurs</span>
                            </Link>

                            <Link to='/' className='icon_name' onClick={() => { localStorage.clear(); window.location.href = '/'; }}>
                                <MdLogout className='icon' />
                                <span className='name'>Se deconnecter</span>
                            </Link>
                        </div>
                    }
                </div>
            </div>

        </header>
    )
}

export default Header