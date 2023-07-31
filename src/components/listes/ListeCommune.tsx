import React, { useState } from 'react'
import { COLUMN_DATA_TABLE_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'
import Liste from '../liste/Liste'
import Popup from 'reactjs-popup'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { CiEdit } from 'react-icons/ci'
import { BsThreeDotsVertical } from 'react-icons/bs'
import CommuneModal from '../liste/modal_display_edit_delete/CommuneModal'

const ListeCommune: PAGE_COMPONENT_TYPE = () => {

    const { allCommunes } = useSelector((state: RootReducerType) => state.commune)

    const [value, setValue] = useState<COLUMN_DATA_TABLE_TYPE>()
    const [seeModalDisplayEditDelete, setSeeModalDisplayEditDelete] = useState(false)
    const [type, setType] = useState('')

    const data: Array<COLUMN_DATA_TABLE_TYPE> = allCommunes

    const handleDisplay = (type: string, value: COLUMN_DATA_TABLE_TYPE) => {
        if (type === 'afficher') {
            setSeeModalDisplayEditDelete(true)
            setValue(value)
            setType('afficher')
        } else if (type === 'modifier') {
            setSeeModalDisplayEditDelete(true)
            setValue(value)
            setType('modifier')
        } else if (type === 'supprimer') {
            setSeeModalDisplayEditDelete(true)
            setValue(value)
            setType('supprimer')
        }
    }

    const columns = [
        { name: '#', selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: 'Nom de la commune', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.name, sortable: true },
        { name: 'Associée à la ville', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.city.name, sortable: true },
        {
            name: <p style={{ width: '100%', textAlign: 'center' }}>Action</p>,
            cell: (row: COLUMN_DATA_TABLE_TYPE) => (
                <div className='display_edit_delete' style={{ width: '100%', textAlign: 'center' }}>
                    <Popup arrow={false} trigger={<span className='vertical_icon_container'><BsThreeDotsVertical className='vertical_icon' /></span>} position='top center'>
                        <div className='display_edit_delete_container'>
                            <div className='container' onClick={() => handleDisplay('afficher', row)}>
                                <div className='container_icon'> <AiOutlineEye /> </div>
                                <div className='container_name'>Afficher</div>
                            </div>

                            <div className='container' onClick={() => handleDisplay('modifier', row)}>
                                <div className='container_icon'> <CiEdit /> </div>
                                <div className='container_name'>Modifier</div>
                            </div>

                            <div className='container' onClick={() => handleDisplay('supprimer', row)}>
                                <div className='container_icon'> <AiOutlineDelete /> </div>
                                <div className='container_name'>Supprimer</div>
                            </div>
                        </div>
                    </Popup>
                </div>
            )
        }
    ]

    return (
        <div className='liste_container'>
            <Liste title='commune' datas={data} columns={columns} />

            <CommuneModal type={type} row={value as COLUMN_DATA_TABLE_TYPE} seeModalDisplayEditDelete={seeModalDisplayEditDelete} setSeeModalDisplayEditDelete={setSeeModalDisplayEditDelete} />
        </div>
    )
}

export default ListeCommune