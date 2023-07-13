import React, { ReactNode, useState } from 'react'
import Popup from 'reactjs-popup'

// importation icons
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { CiEdit } from 'react-icons/ci'

const DisplayEditDelete = () => {


    return (
        <div className='display_edit_delete'>
            <Popup arrow={false} trigger={<span className='vertical_icon_container'><BsThreeDotsVertical className='vertical_icon' /></span>} position='bottom center'>
                <div className='display_edit_delete_container'>
                    <div className='container'>
                        <div className='container_icon'> <AiOutlineEye /> </div>
                        <div className='container_name'>Afficher</div>
                    </div>

                    <div className='container'>
                        <div className='container_icon'> <CiEdit /> </div>
                        <div className='container_name'>Modifier</div>
                    </div>

                    <div className='container'>
                        <div className='container_icon'> <AiOutlineDelete /> </div>
                        <div className='container_name'>Supprimer</div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default DisplayEditDelete