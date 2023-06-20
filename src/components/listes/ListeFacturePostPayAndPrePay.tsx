import React from 'react'
import { RootReducerType } from '../../redux/store'
import { useSelector } from 'react-redux'
import { COLUMN_DATA_TABLE_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'
import Liste from '../liste/Liste'
import { displayDate, formatNumberWithSpaces } from '../../utils/functions'

const ListeFacturePostPayAndPrePay: PAGE_COMPONENT_TYPE = ({ title }) => {

    const { allPostPays } = useSelector((state: RootReducerType) => state.post_pay)
    const { allPrePays } = useSelector((state: RootReducerType) => state.pre_pay)

    const data: Array<COLUMN_DATA_TABLE_TYPE> = title === 'post_pay' ? allPostPays : allPrePays

    const columns = title === 'post_pay' ? [
        { name: '#', selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: 'Propriétaire compteur', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.owner, sortable: true },
        { name: 'Numéro facture', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.invoice, sortable: true },
        { name: 'Numéro compteur', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.compteur, sortable: true },
        // { name: 'Le numéro de retrait OM', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.phone, sortable: true },
        { name: 'Montant total (FCFA)', selector: (row: COLUMN_DATA_TABLE_TYPE) => formatNumberWithSpaces(row.amountToBePaid), sortable: true },
        { name: 'Montant payé (FCFA)', selector: (row: COLUMN_DATA_TABLE_TYPE) => formatNumberWithSpaces(row.amountPaid), sortable: true },
        { name: 'Dernière modification', selector: (row: COLUMN_DATA_TABLE_TYPE) => displayDate(row.updatedAt), sortable: true },
        { name: 'Payement statut', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.status === 'PENDING' ? <span className='column' style={{ color: '#d4a005' }}>En cours</span> : row.status === 'CANCELED' ? <span className='column' style={{ color: '#EF3E34' }}>Annulé</span> : <span className='column' style={{ color: 'rgb(6, 161, 6)' }}>Payé</span> },
    ] : [
        { name: '#', selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: 'Propriétaire compteur', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.owner, sortable: true },
        // { name: 'Le numéro de retrait OM', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.phone, sortable: true },
        { name: 'Numéro compteur', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.compteur, sortable: true },
        { name: 'Montant payé (FCFA)', selector: (row: COLUMN_DATA_TABLE_TYPE) => formatNumberWithSpaces(row.amount), sortable: true },
        { name: 'Dernière modification', selector: (row: COLUMN_DATA_TABLE_TYPE) => displayDate(row.updatedAt), sortable: true },
        { name: 'Payement statut', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.status === 'PENDING' ? <span className='column' style={{ color: '#d4a005' }}>En cours</span> : row.status === 'CANCELED' ? <span className='column' style={{ color: '#EF3E34' }}>Annulé</span> : <span className='column' style={{ color: 'rgb(6, 161, 6)' }}>Payé</span> },
    ]

    return <Liste title={title} datas={data} columns={columns} />
}

export default ListeFacturePostPayAndPrePay