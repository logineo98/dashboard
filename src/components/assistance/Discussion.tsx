import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'

const Discussion = () => {
    return (
        <div className='discussion'>
            <div className='user_icon_name_close_icon_container'>
                <div className='user_icon_name'>
                    <BiUserCircle className='user_icon' />
                    <span className='name'>Tz nation</span>
                </div>

                <AiOutlineCloseCircle className='close_icon' />
            </div>

            <div className='discussion_container'>


                <form className='send_response'>
                    <input type='text' name='response' id='response' />

                </form>
            </div>
        </div>
    )
}

export default Discussion