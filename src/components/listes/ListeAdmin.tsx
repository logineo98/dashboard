import React from 'react'
import Liste from '../liste/Liste'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'
import { COLUMN_DATA_TABLE_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'

const ListeAdmin: PAGE_COMPONENT_TYPE = () => {

    const { allAdmins, admin } = useSelector((state: RootReducerType) => state.user)

    const data: Array<COLUMN_DATA_TABLE_TYPE> = allAdmins

    const columns = [
        { name: '#', selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: 'Nom d\'utilisateur', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.username, sortable: true },
        { name: 'Nom complet', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.name, sortable: true },
        { name: 'Email', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.email, sortable: true },
        { name: 'Téléphone', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.phone, sortable: true },
        { name: 'Rôle', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.role === 'ADMIN' ? 'Administrateur' : 'Supeur administrateur', sortable: true },
        { name: 'Connecté', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.id === admin.id ? <span className='column' style={{ color: 'rgb(6, 161, 6)' }}>Oui</span> : <span className='column' style={{ color: '#EF3E34' }}>Non</span>, sortable: true },
        { name: 'Statut', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.enabled ? <span className='column' style={{ color: 'rgb(6, 161, 6)' }}>activé</span> : <span className='column' style={{ color: '#EF3E34' }}>non activé</span>, sortable: true },
    ]

    return <Liste title='admin' datas={data} columns={columns} />
}

export default ListeAdmin