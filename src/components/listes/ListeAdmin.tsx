import React, { useState } from 'react'
import Liste from '../liste/Liste'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'
import { COLUMN_DATA_TABLE_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'
import AdminModal from '../liste/modal_display_edit_delete/AdminModal'
import Popup from 'reactjs-popup'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { CiEdit } from 'react-icons/ci'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { toast } from 'react-toastify'

const ListeAdmin: PAGE_COMPONENT_TYPE = () => {

    const { allAdmins, admin } = useSelector((state: RootReducerType) => state.user)

    const [value, setValue] = useState<COLUMN_DATA_TABLE_TYPE>()
    const [seeModalDisplayEditDelete, setSeeModalDisplayEditDelete] = useState(false)
    const [type, setType] = useState('')

    const data: Array<COLUMN_DATA_TABLE_TYPE> = allAdmins

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
            if (value?.role === 'SUPER_ADMIN') toast.warn('Le super administrateur ne peut pas être supprimé.')
            else if (value?.id === admin?.id) toast.warn('L\'administrateur connecté ne peut pas être supprimé.')
            else {
                setSeeModalDisplayEditDelete(true)
                setValue(value)
                setType('supprimer')
            }
        } else if (type === 'activer') {
            if (value?.role === 'SUPER_ADMIN') toast.warn('Le super administrateur ne peut pas être desactivé.')
            else if (value?.id === admin?.id) toast.warn('L\'administrateur connecté ne peut pas être desactivé.')
            else {
                setSeeModalDisplayEditDelete(true)
                setValue(value)
                setType('activer')
            }
        }
    }

    const columns = [
        { name: '#', selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: 'Nom d\'utilisateur', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.username, sortable: true },
        { name: 'Nom complet', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.name, sortable: true },
        { name: 'Email', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.email, sortable: true },
        { name: 'Téléphone', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.phone, sortable: true },
        { name: 'Rôle', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.role === 'ADMIN' ? 'Administrateur' : 'Supeur administrateur', sortable: true },
        { name: 'Connecté', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.id === admin.id ? <span className='column' style={{ color: 'rgb(6, 161, 6)' }}>Oui</span> : <span className='column' style={{ color: '#EF3E34' }}>Non</span>, sortable: true },
        { name: 'Statut', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.enabled ? <span className='column' style={{ color: 'rgb(6, 161, 6)' }}>activé</span> : <span className='column' style={{ color: '#EF3E34' }}>non activé</span>, sortable: true },
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
            <Liste title='admin' datas={data} columns={columns} />

            <AdminModal type={type} row={value as COLUMN_DATA_TABLE_TYPE} seeModalDisplayEditDelete={seeModalDisplayEditDelete} setSeeModalDisplayEditDelete={setSeeModalDisplayEditDelete} />
        </div>
    )
}

export default ListeAdmin