import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../../redux/store'
import { PAGE_COMPONENT_TYPE } from '../../../../utils/types'
import { toast } from 'react-toastify'
import { FaUserCircle } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { activeAdminOrUser } from '../../../../redux/actions/user.actions'
import Loading from '../../../loading/Loading'

const ClientActionFIltre: PAGE_COMPONENT_TYPE = ({ nbSelectedRow, ElementSelected }) => {

    const [chooseAction, setChooseAction] = useState('')
    const [chooseStatus, setChooseStatus] = useState('')
    const [seeModalDisplayEditDelete, setSeeModalDisplayEditDelete] = useState(false)

    const { allUsers, loadingUser } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    const handleChooseAction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (chooseAction) {
            if (chooseAction === 'afficher') {
                setSeeModalDisplayEditDelete(true)
                allUsers?.forEach((client: any) => {
                    if (ElementSelected && ElementSelected.length === 1 && client?.id === ElementSelected[0].id) ElementSelected[0] = client
                })
            } else if (chooseAction === 'activer') {
                setSeeModalDisplayEditDelete(true)
                allUsers?.forEach((client: any) => {
                    if (ElementSelected && ElementSelected.length === 1 && client?.id === ElementSelected[0].id) ElementSelected[0] = client
                })
            }
        } else {
            toast.warn('Veuillez selectionner une action à effectuer')
        }
    }

    useEffect(() => {
        localStorage.setItem('choose_action', '')
        localStorage.setItem('choose_status', chooseStatus)
    }, [chooseStatus])

    return (
        <div className='action_filtre'>
            {seeModalDisplayEditDelete &&
                <div className='display_edit_delete_modal'>
                    <div className='overlay'></div>

                    <div className='display_edit_delete_modal_container'>
                        <RxCross2 className='croix' onClick={() => { setSeeModalDisplayEditDelete(false) }} />

                        <div className='loading_container'>
                            {loadingUser && <Loading h_w={40} hide_text mg='0px' padding='0px' />}
                        </div>

                        <div className='icon_name'>
                            <div className='icon_name_container'>
                                <FaUserCircle className='icon' />
                                <p>CLIENT</p>
                            </div>
                        </div>

                        {chooseAction && chooseAction === 'afficher' &&
                            ElementSelected?.map((client, i) => (
                                <div key={i} className='display_information'>
                                    <div className='container'>
                                        <div className='information_container'>
                                            <span className='title'>Nom d'utilisateur</span>
                                            <span className='value'> {client.username} </span>
                                        </div>

                                        <div className='information_container'>
                                            <span className='title'>Nom complet</span>
                                            <span className='value'> {client.name.length < 23 ? client.name : client.name.substring(0, 23) + '...'} </span>
                                        </div>

                                        <div className='information_container'>
                                            <span className='title'>Email</span>
                                            <span className='value'> {client.email ? client.email.length < 23 ? client.email : client.email.substring(0, 23) + '...' : 'N/A'} </span>
                                        </div>

                                        <div className='information_container'>
                                            <span className='title'>Numéro de téléphone</span>
                                            <span className='value'> {client.phone} </span>
                                        </div>

                                        <div className='information_container'>
                                            <span className='title'>Rôle</span>
                                            <span className='value'> {client.role === 'CUSTOMER' ? 'Client' : 'Inconnu'} </span>
                                        </div>

                                        <div className='information_container'>
                                            <span className='title'>Statut du compte</span>
                                            <span className='value'> {client.enabled ? 'Activé' : 'Non activé'} </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        {chooseAction && chooseAction === 'activer' &&
                            ElementSelected?.map((client, i) => (
                                <form key={i} action='' onSubmit={(e) => { e.preventDefault(); dispatch(activeAdminOrUser(client.id, client.enabled, setSeeModalDisplayEditDelete)) }}>
                                    <div className='select_label_container'>
                                        <label htmlFor='status'>Statut :</label>
                                        <select name='status' id='status' value={!client.enabled ? 'activer' : 'desactiver'} onChange={e => setChooseStatus(e.target.value)}>
                                            {!client.enabled && <option value='activer'>Activer</option>}
                                            {client.enabled && <option value='desactiver'>Desactiver</option>}
                                        </select>
                                    </div>

                                    <div className='save_abort'>
                                        <button disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                        <button type='reset' className='abort' disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete && setSeeModalDisplayEditDelete(false); }}>Annuler</button>
                                    </div>
                                </form>
                            ))
                        }
                    </div>
                </div>
            }

            <div className='form_filtre'>
                {nbSelectedRow && nbSelectedRow <= 1 ?
                    <form className='action' onSubmit={handleChooseAction}>
                        <select name='action' id='action' value={(localStorage.getItem('choose_action') && localStorage.getItem('choose_action')) as string} onChange={e => { setChooseAction(e.target.value); localStorage.setItem('choose_action', e.target.value) }}>
                            <option value=''>Chosir une action</option>
                            <option value='afficher'>Afficher</option>
                            <option value='activer'>Activer / Desactiver Compte</option>
                        </select>
                        <button>Appliquer</button>
                    </form> :
                    <form className='action' onSubmit={e => { e.preventDefault(); toast.warn('Veuillez selectionner au plus un seul utilisateur') }}>
                        <select name='action' id='action'>
                            <option value=''>Veuillez selectionner au plus un seul utilisateur</option>
                        </select>
                        <button>Appliquer</button>
                    </form>
                }
            </div>

            <span className='nb_elements'>{allUsers.length} éléments</span>
        </div>
    )
}

export default ClientActionFIltre