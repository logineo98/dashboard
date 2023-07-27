import React, { FC } from 'react'

import { COLUMN_DATA_TABLE_TYPE } from '../../../utils/types'
import { displayDate, formatNumberWithSpaces } from '../../../utils/functions'

// importation icons
import { RxCross2 } from 'react-icons/rx'
import { FaUserCircle } from 'react-icons/fa'

type FACTURE_POST_PAY_AND_PRE_PAY_MODAL_TYPE = {
    type: string,
    row: COLUMN_DATA_TABLE_TYPE,
    seeModalDisplayEditDelete: boolean,
    setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>,
    title: string
}

const FacturePostPayAndPrePayModal: FC<FACTURE_POST_PAY_AND_PRE_PAY_MODAL_TYPE> = ({ type, row, seeModalDisplayEditDelete, setSeeModalDisplayEditDelete, title }) => {



    return (
        seeModalDisplayEditDelete ?
            <div className='modal'>
                <div className='overlay'></div>

                <div className='display_edit_delete_modal_container'>
                    <RxCross2 className='croix' onClick={() => { setSeeModalDisplayEditDelete(false) }} />

                    <div className='icon_name'>
                        <div className='icon_name_container'>
                            <FaUserCircle className='icon' />
                            <p> {title === 'post_pay' ? 'FACTURE POST-PAID' : 'FACTURE PRÉ-PAYÉ'} </p>
                        </div>
                    </div>

                    {title === 'post_pay' && type === 'afficher' &&
                        <div className='display_information'>
                            <div className='container'>
                                <div className='information_container'>
                                    <span className='title'>Propriétaire compteur</span>
                                    <span className='value'> {row?.owner?.length < 23 ? row?.owner : row?.owner?.substring(0, 23) + '...'} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Numéro facture</span>
                                    <span className='value'> {row?.invoice} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Numéro compteur</span>
                                    <span className='value'> {row?.compteur} </span>
                                </div>
                            </div>

                            <div className='divider'></div>

                            <div className='container'>
                                <div className='information_container'>
                                    <span className='title'>Montant de la facture</span>
                                    <span className='value'> {formatNumberWithSpaces(row?.amount)} FCFA</span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Montant payé</span>
                                    <span className='value'> {formatNumberWithSpaces(row?.amountPaid)} FCFA</span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Montant restant à payer</span>
                                    <span className='value'> {formatNumberWithSpaces(row?.amountToBePaid)} FCFA</span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Payement statut</span>
                                    <span className='value'> {row?.status === 'PENDING' ? 'En cours' : row?.status === 'CANCELED' ? 'Annulé' : 'Payé'} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Celui qui fait le paiement</span>
                                    <span className='value'> {row?.customer?.name?.length < 23 ? row?.customer?.name : row?.customer?.name?.substring(0, 23) + '...'} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Le numéro de retrait OM</span>
                                    <span className='value'> {row?.phone} </span>
                                </div>
                            </div>

                            <div className='divider'></div>

                            <div className='container'>
                                <div className='information_container'>
                                    <span className='title'>Date de création de la facture</span>
                                    <span className='value'> {displayDate(new Date(row?.edition).getTime())} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Dernière modification</span>
                                    <span className='value'> {displayDate(row?.updatedAt)} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Date d'échéance de paiement</span>
                                    <span className='value'> {displayDate(new Date(row?.expire).getTime())} </span>
                                </div>
                            </div>
                        </div>
                    }

                    {title === 'pre_pay' && type === 'afficher' &&
                        <div className='display_information'>
                            <div className='container'>
                                <div className='information_container'>
                                    <span className='title'>Propriétaire compteur</span>
                                    <span className='value'> {row?.owner?.length < 23 ? row?.owner : row?.owner.substring(0, 23) + '...'} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Numéro compteur</span>
                                    <span className='value'> {row?.compteur} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Adresse</span>
                                    <span className='value'> {row?.address?.length < 23 ? row?.address : row?.address.substring(0, 23) + '...'} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Montant payé</span>
                                    <span className='value'> {formatNumberWithSpaces(row?.amount)} FCFA</span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Code de recharge</span>
                                    <span className='value'> {row?.rechargeCode ? row?.rechargeCode : 'N/A'} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Nombre kilowatt (kW)</span>
                                    <span className='value'> {row?.nbKw ? row?.nbKw : 'N/A'}</span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Dernière modification</span>
                                    <span className='value'> {displayDate(row?.updatedAt)} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Payement statut</span>
                                    <span className='value'> {row?.status === 'PENDING' ? 'En cours' : row?.status === 'CANCELED' ? 'Annulé' : 'Payé'} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Celui qui fait le paiement</span>
                                    <span className='value'> {row?.customer?.name?.length < 23 ? row?.customer?.name : row?.customer?.name?.substring(0, 23) + '...'} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Le numéro de retrait OM</span>
                                    <span className='value'> {row?.phone} </span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div> : <></>
    )
}

export default FacturePostPayAndPrePayModal