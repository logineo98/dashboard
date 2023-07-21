import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { COLUMN_DATA_TABLE_TYPE } from '../../utils/types'
import { RootReducerType } from '../../redux/store'
import Liste from '../liste/Liste'
import { displayDate } from '../../utils/functions'
import DevisModal from '../liste/modal_display_edit_delete/DevisModal'
import Popup from 'reactjs-popup'
import { AiOutlineEye } from 'react-icons/ai'
import { BsCheckCircle, BsThreeDotsVertical } from 'react-icons/bs'

const ListeDevis = () => {

    const { allDevis } = useSelector((state: RootReducerType) => state.devis)

    const [value, setValue] = useState<COLUMN_DATA_TABLE_TYPE>()
    const [seeModalDisplayEditDelete, setSeeModalDisplayEditDelete] = useState(false)
    const [type, setType] = useState('')

    const data: Array<COLUMN_DATA_TABLE_TYPE> = allDevis

    const handleDisplay = (type: string, value: COLUMN_DATA_TABLE_TYPE) => {
        if (type === 'afficher') {
            setSeeModalDisplayEditDelete(true)
            setValue(value)
            setType('afficher')
        } else if (type === 'valider') {
            setSeeModalDisplayEditDelete(true)
            setValue(value)
            setType('valider')
        }
    }

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

                            <div className='container' onClick={() => handleDisplay('valider', row)}>
                                <div className='container_icon'> <BsCheckCircle /> </div>
                                <div className='container_name'>Valider</div>
                            </div>
                        </div>
                    </Popup>
                </div>
            )
        }
    ]

    return (
        <div className='liste_container'>
            <Liste title='devis' datas={data} columns={columns} />

            <DevisModal type={type} row={value as COLUMN_DATA_TABLE_TYPE} seeModalDisplayEditDelete={seeModalDisplayEditDelete} setSeeModalDisplayEditDelete={setSeeModalDisplayEditDelete} />
        </div>

    )
}

export default ListeDevis