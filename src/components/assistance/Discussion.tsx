import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { RiSendPlane2Line } from 'react-icons/ri'
import { PAGE_COMPONENT_TYPE } from '../../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'
import { displayDate } from '../../utils/functions'
import { replyAssistance } from '../../redux/actions/assistance.actions'

const Discussion: PAGE_COMPONENT_TYPE = ({ displayDiscussion, setDisplayDiscussion }) => {

    const [msg, setMsg] = useState('')

    const { assistance } = useSelector((state: RootReducerType) => state.assistance)
    const dispatch = useDispatch<any>()

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        assistance.id && dispatch(replyAssistance(assistance.id, { response: msg }, setMsg))
    }
    return (
        displayDiscussion ?
            <div className={displayDiscussion ? 'discussion display' : 'discussion'}>
                <div className='user_icon_name_close_icon_container'>
                    <div className='user_icon_name'>
                        <BiUserCircle className='user_icon' />
                        <span className='name'> {assistance?.customer?.name} </span>
                    </div>

                    <AiOutlineCloseCircle className='close_icon' onClick={() => setDisplayDiscussion && setDisplayDiscussion(false)} />
                </div>

                <div className='discussion_container'>
                    <div className='message_container'>
                        {assistance?.message &&
                            <div className='message'>
                                <p className='msg'> {assistance?.message} </p>
                                <p className='hour'> {displayDate(new Date(assistance?.createdAt).getTime())} </p>
                            </div>
                        }

                        {assistance?.response &&
                            <div className='message own'>
                                <p className='msg'> {assistance?.response} </p>
                                <p className='hour'>{displayDate(new Date(assistance?.updatedAt).getTime())}</p>
                            </div>
                        }
                    </div>

                    <form className='send_response' onSubmit={handleSendMessage}>
                        <input type='text' name='msg' id='msg' value={msg} onChange={e => setMsg(e.target.value)} />
                        <button> <RiSendPlane2Line className='send_icon' /> </button>
                    </form>
                </div>
            </div> : <></>
    )
}

export default Discussion