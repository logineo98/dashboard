import React from 'react'
import { useSelector } from 'react-redux'
import { COLUMN_DATA_TABLE_TYPE } from '../../utils/types'
import { RootReducerType } from '../../redux/store'
import Liste from '../liste/Liste'
import { displayDate } from '../../utils/functions'

const ListeDevis = () => {

    const { allDevis } = useSelector((state: RootReducerType) => state.devis)

    const data: Array<COLUMN_DATA_TABLE_TYPE> = allDevis

    const columns = [
        { name: '#', selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: 'Demandeur', selector: (row: COLUMN_DATA_TABLE_TYPE) => `${row.nom} ${row.prenom}`, sortable: true },
        { name: 'Type de compteur', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.typeCompteur, sortable: true },
        { name: 'Type de demande', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.typeDemande, sortable: true },
        { name: 'Usage', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.usage, sortable: true },
        { name: 'Ville', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.ville.name, sortable: true },
        { name: 'Statut validation', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.status === 'PENDING' ? <span style={{ color: '#d4a005' }} className='column'>En attente</span> : row.status === 'REJECT' ? <span style={{ color: '#EF3E34' }} className='column'>Rejeté</span> : row.status === 'VALIDATED' ? <span style={{ color: 'rgb(6, 161, 6)' }} className='column'>Validé</span> : 'Inconnu', sortable: true },
        { name: 'Statut paiement', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.paymentStatus === 'PENDING' ? <span style={{ color: '#d4a005' }} className='column'>En attente</span> : row.paymentStatus === 'CANCELED' ? <span style={{ color: '#EF3E34' }} className='column'>Annulé</span> : row.paymentStatus === 'PAID' ? <span style={{ color: 'rgb(6, 161, 6)' }} className='column'>Payé</span> : 'Inconnu', sortable: true },
        { name: 'date', selector: (row: COLUMN_DATA_TABLE_TYPE) => displayDate(row.updatedAt), sortable: true },
    ]

    return <Liste title='devis' datas={data} columns={columns} />
}

export default ListeDevis