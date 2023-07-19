import React, { FC, useEffect, useState } from 'react'
import { COLUMN_DATA_TABLE_TYPE } from '../../../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../redux/store'
import Loading from '../../loading/Loading'

// importation icons
import { RxCross2 } from 'react-icons/rx'
import { FaUserCircle } from 'react-icons/fa'
import { activeAdminOrUser } from '../../../redux/actions/user.actions'

type CLIENT_MODAL_TYPE = {
    type: string,
    row: COLUMN_DATA_TABLE_TYPE,
    seeModalDisplayEditDelete: boolean,
    setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const ClientModal: FC<CLIENT_MODAL_TYPE> = ({ row, seeModalDisplayEditDelete, setSeeModalDisplayEditDelete, type }) => {

    const [chooseStatus, setChooseStatus] = useState('')

    const { loadingUser } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        localStorage.setItem('choose_status', chooseStatus)
    }, [chooseStatus])

    return (
        seeModalDisplayEditDelete ?
            <div className='modal'>
                <div className='overlay'></div>

                <div className='display_edit_delete_modal_container'>
                    <RxCross2 className='croix' onClick={() => { setSeeModalDisplayEditDelete(false) }} />

                    <div className='loading_container'>
                        {loadingUser && <Loading h_w={40} hide_text mg='0px' padding='0px' />}
                    </div>

                    <div className='icon_name'>
                        <div className='icon_name_container'>
                            <FaUserCircle className='icon' />
                            <p>CLIENT MOBILE</p>
                        </div>
                    </div>

                    {type === 'afficher' &&
                        <div className='display_information'>
                            <div className='container'>
                                <div className='information_container'>
                                    <span className='title'>Nom d'utilisateur</span>
                                    <span className='value'> {row?.username} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Nom complet</span>
                                    <span className='value'> {row?.name.length < 23 ? row?.name : row?.name.substring(0, 23) + '...'} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Email</span>
                                    <span className='value'> {row?.email ? row?.email.length < 23 ? row?.email : row?.email.substring(0, 23) + '...' : 'N/A'} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Numéro de téléphone</span>
                                    <span className='value'> {row?.phone} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Rôle</span>
                                    <span className='value'> {row?.role === 'CUSTOMER' ? 'Client' : 'Inconnu'} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Statut du compte</span>
                                    <span className='value'> {row?.enabled ? 'Activé' : 'Non activé'} </span>
                                </div>
                            </div>
                        </div>
                    }

                    {type === 'activer' &&
                        <form action='' onSubmit={(e) => { e.preventDefault(); dispatch(activeAdminOrUser(row?.id, row?.enabled, setSeeModalDisplayEditDelete)) }}>
                            <div className='select_label_container'>
                                <label htmlFor='status'>Statut :</label>
                                <select name='status' id='status' value={!row?.enabled ? 'activer' : 'desactiver'} onChange={e => setChooseStatus(e.target.value)}>
                                    {!row?.enabled && <option value='activer'>Activer</option>}
                                    {row?.enabled && <option value='desactiver'>Désactiver</option>}
                                </select>
                            </div>

                            <div className='save_abort'>
                                <button disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                <button type='reset' className='abort' disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete && setSeeModalDisplayEditDelete(false) }}>Annuler</button>
                            </div>
                        </form>
                    }
                </div>
            </div> : <></>
    )
}

export default ClientModal