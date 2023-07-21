import React, { useState } from 'react'
import { RootReducerType } from '../../redux/store'
import { useSelector } from 'react-redux'
import { COLUMN_DATA_TABLE_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'
import Liste from '../liste/Liste'
import { displayDate, formatNumberWithSpaces } from '../../utils/functions'
import Popup from 'reactjs-popup'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineEye } from 'react-icons/ai'
import FacturePostPayAndPrePayModal from '../liste/modal_display_edit_delete/FacturePostPayAndPrePayModal'

const ListeFacturePostPayAndPrePay: PAGE_COMPONENT_TYPE = ({ title }) => {

    const { allPostPays } = useSelector((state: RootReducerType) => state.post_pay)
    const { allPrePays } = useSelector((state: RootReducerType) => state.pre_pay)

    const [value, setValue] = useState<COLUMN_DATA_TABLE_TYPE>()
    const [seeModalDisplayEditDelete, setSeeModalDisplayEditDelete] = useState(false)
    const [type, setType] = useState('')

    const data: Array<COLUMN_DATA_TABLE_TYPE> = title === 'post_pay' ? allPostPays : allPrePays

    const handleDisplay = (type: string, value: COLUMN_DATA_TABLE_TYPE) => {
        if (type === 'afficher') {
            setSeeModalDisplayEditDelete(true)
            setValue(value)
            setType('afficher')
        }
    }

    const columns = title === 'post_pay' ? [
        { name: '#', selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: 'Propriétaire compteur', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.owner, sortable: true },
        { name: 'Numéro facture', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.invoice, sortable: true },
        { name: 'Numéro compteur', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.compteur, sortable: true },
        // { name: 'Le numéro de retrait OM', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.phone, sortable: true },
        { name: 'Montant total (FCFA)', selector: (row: COLUMN_DATA_TABLE_TYPE) => formatNumberWithSpaces(row.amountToBePaid), sortable: true },
        { name: 'Montant payé (FCFA)', selector: (row: COLUMN_DATA_TABLE_TYPE) => formatNumberWithSpaces(row.amountPaid), sortable: true },
        { name: 'Payement statut', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.status === 'PENDING' ? <span className='column' style={{ color: '#d4a005' }}>En cours</span> : row.status === 'CANCELED' ? <span className='column' style={{ color: '#EF3E34' }}>Annulé</span> : <span className='column' style={{ color: 'rgb(6, 161, 6)' }}>Payé</span> },
        { name: 'Dernière modification', selector: (row: COLUMN_DATA_TABLE_TYPE) => displayDate(row.updatedAt), sortable: true },
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
                        </div>
                    </Popup>
                </div>
            )
        }
    ] : [
        { name: '#', selector: (row: COLUMN_DATA_TABLE_TYPE, i: number) => i + 1 },
        { name: 'Propriétaire compteur', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.owner, sortable: true },
        // { name: 'Le numéro de retrait OM', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.phone, sortable: true },
        { name: 'Numéro compteur', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.compteur, sortable: true },
        { name: 'Montant payé (FCFA)', selector: (row: COLUMN_DATA_TABLE_TYPE) => formatNumberWithSpaces(row.amount), sortable: true },
        { name: 'Payement statut', selector: (row: COLUMN_DATA_TABLE_TYPE) => row.status === 'PENDING' ? <span className='column' style={{ color: '#d4a005' }}>En cours</span> : row.status === 'CANCELED' ? <span className='column' style={{ color: '#EF3E34' }}>Annulé</span> : <span className='column' style={{ color: 'rgb(6, 161, 6)' }}>Payé</span> },
        { name: 'Dernière modification', selector: (row: COLUMN_DATA_TABLE_TYPE) => displayDate(row.updatedAt), sortable: true },
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
                        </div>
                    </Popup>
                </div>
            )
        }
    ]

    return (
        <div className='liste_container'>
            <Liste title={title} datas={data} columns={columns} />

            <FacturePostPayAndPrePayModal title={title as string} type={type} row={value as COLUMN_DATA_TABLE_TYPE} seeModalDisplayEditDelete={seeModalDisplayEditDelete} setSeeModalDisplayEditDelete={setSeeModalDisplayEditDelete} />
        </div>
    )
}

export default ListeFacturePostPayAndPrePay