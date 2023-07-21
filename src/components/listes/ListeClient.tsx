import React, { useState } from 'react'
import Liste from '../liste/Liste'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'
import { COLUMN_DATA_TABLE_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'
import ClientModal from '../liste/modal_display_edit_delete/ClientModal'
import Popup from 'reactjs-popup'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineEye } from 'react-icons/ai'

const ListeClient: PAGE_COMPONENT_TYPE = () => {

    const { allUsers } = useSelector((state: RootReducerType) => state.user)

    const [value, setValue] = useState<COLUMN_DATA_TABLE_TYPE>()
    const [seeModalDisplayEditDelete, setSeeModalDisplayEditDelete] = useState(false)
    const [type, setType] = useState('')

    const data: Array<COLUMN_DATA_TABLE_TYPE> = allUsers

    const handleDisplay = (type: string, value: COLUMN_DATA_TABLE_TYPE) => {
        if (type === 'afficher') {
            setSeeModalDisplayEditDelete(true)
            setValue(value)
            setType('afficher')
        } else if (type === 'activer') {
            setSeeModalDisplayEditDelete(true)
            setValue(value)
            setType('activer')
        }
    }

    const columns = [
        { name: '#', selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: 'Nom d\'utilisateur', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.username, sortable: true },
        { name: 'Nom complet', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.name, sortable: true },
        { name: 'Email', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.email ? row.email : 'N/A', sortable: true },
        { name: 'Téléphone', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.phone, sortable: true },
        { name: 'Rôle', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.role === 'CUSTOMER' ? 'Client' : '', sortable: true },
        { name: 'Statut', cell: (row: COLUMN_DATA_TABLE_TYPE) => row.enabled ? <span className='column' style={{ color: 'rgb(6, 161, 6)' }}>activé</span> : <span className='column' style={{ color: '#EF3E34' }}>non activé</span>, sortable: true },
        {
            name: <p style={{ width: '100%', textAlign: 'center' }}>Action</p>,
            cell: (row: COLUMN_DATA_TABLE_TYPE) => (
                <div className='display_edit_delete' style={{ width: '100%', textAlign: 'center' }}>
                    <Popup arrow={false} trigger={<span className='vertical_icon_container'><BsThreeDotsVertical className='vertical_icon' /></span>} position='bottom center'>
                        <div className='display_edit_delete_container'>
                            <div className='container' onClick={() => handleDisplay('afficher', row)}>
                                <div className='container_icon'> <AiOutlineEye /> </div>
                                <div className='container_name'>Afficher</div>
                            </div>

                            <div className='container' onClick={() => handleDisplay('activer', row)}>
                                <div className='container_icon'>  </div>
                                <div className='container_name'>Activer / Désactiver</div>
                            </div>
                        </div>
                    </Popup>
                </div>
            )
        }
    ]

    return (
        <div className='liste_container'>
            <Liste title='client' datas={data} columns={columns} />

            <ClientModal type={type} row={value as COLUMN_DATA_TABLE_TYPE} seeModalDisplayEditDelete={seeModalDisplayEditDelete} setSeeModalDisplayEditDelete={setSeeModalDisplayEditDelete} />
        </div>
    )
}

export default ListeClient