import React from 'react'
import Liste from '../liste/Liste'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'
import { COLUMN_DATA_TABLE_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'

const ListeClient: PAGE_COMPONENT_TYPE = () => {

    const { allUsers } = useSelector((state: RootReducerType) => state.user)

    const data: Array<COLUMN_DATA_TABLE_TYPE> = allUsers

    const columns = [
        { name: '#', selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: 'Nom d\'utilisateur', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.username, sortable: true },
        { name: 'Nom complet', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.name, sortable: true },
        { name: 'Email', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.email ? row.email : 'N/A', sortable: true },
        { name: 'Téléphone', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.phone, sortable: true },
        { name: 'Rôle', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.role === 'CUSTOMER' ? 'Client' : '', sortable: true },
        { name: 'Statut', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.enabled ? <span className='column' style={{ color: 'rgb(6, 161, 6)' }}>activé</span> : <span className='column' style={{ color: '#EF3E34' }}>non activé</span>, sortable: true },
    ]

    return <Liste title='client' datas={data} columns={columns} />
}

export default ListeClient