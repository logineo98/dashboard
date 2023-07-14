import React, { useEffect, useState } from 'react'
import { ADD_EDIT_ADMIN_TYPE, PAGE_COMPONENT_TYPE } from '../../../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from '../../../../redux/store';
import { toast } from 'react-toastify';
import { validation_edit_admin } from '../../../../utils/validation';
import { activeAdminOrUser, deleteAdmin, editAdmin } from '../../../../redux/actions/user.actions';
import { RxCross2 } from 'react-icons/rx';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Loading from '../../../loading/Loading';

const AdminActionFiltre: PAGE_COMPONENT_TYPE = ({ nbSelectedRow, ElementSelected, setEmptyRowSelected, setElementSelected }) => {

    const data: ADD_EDIT_ADMIN_TYPE = { id: '', name: '', username: '', email: '', phone: '', password: '', password_confirm: '' }

    const [chooseAction, setChooseAction] = useState('')
    const [chooseStatus, setChooseStatus] = useState('')
    const [seeModalDisplayEditDelete, setSeeModalDisplayEditDelete] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const [seePasswordConfirm, setSeePasswordConfirm] = useState(false)
    const [editAdminData, setEditAdminData] = useState(data)
    const [err, setErr] = useState<ADD_EDIT_ADMIN_TYPE>()
    const [confirmEditPassword, setConfirmEditPassword] = useState(false)

    const { allAdmins, loadingUser, admin } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    const handleChooseAction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (chooseAction) {
            setEmptyRowSelected && setEmptyRowSelected(false)
            if (chooseAction === 'afficher') {
                setSeeModalDisplayEditDelete(true)
                allAdmins?.forEach((admin_: any) => {
                    if (ElementSelected && ElementSelected.length === 1 && admin_?.id === ElementSelected[0].id) ElementSelected[0] = admin_
                })
            } else if (chooseAction === 'modifier') {
                setSeeModalDisplayEditDelete(true)
                allAdmins?.forEach((admin_: any) => {
                    if (ElementSelected && ElementSelected.length === 1 && admin_?.id === ElementSelected[0].id) ElementSelected[0] = admin_
                })
            } else if (chooseAction === 'supprimer') {
                if (ElementSelected) {
                    if (ElementSelected.length !== 0) {
                        if (ElementSelected[0].role === 'SUPER_ADMIN') toast.warn('Le super administrateur ne peut pas être supprimé.')
                        else if (ElementSelected[0].id === admin?.id) toast.warn('L\'administrateur connecté ne peut pas être supprimé.')
                        else setSeeModalDisplayEditDelete(true)
                    } else toast.warn('Veuillez selectionner un administrateur')
                }
            } else if (chooseAction === 'activer') {
                if (ElementSelected) {
                    if (ElementSelected.length !== 0) {
                        if (ElementSelected[0].role === 'SUPER_ADMIN') toast.warn('Le super administrateur ne peut pas être desactivé.')
                        else if (ElementSelected[0].id === admin?.id) toast.warn('L\'administrateur connecté ne peut pas être desactivé.')
                        else {
                            setSeeModalDisplayEditDelete(true)
                            allAdmins?.forEach((admin_: any) => {
                                if (ElementSelected && ElementSelected.length === 1 && admin_?.id === ElementSelected[0].id) ElementSelected[0] = admin_
                            })
                        }
                    } else toast.warn('Veuillez selectionner un administrateur')
                }
            }
        } else {
            setEmptyRowSelected && setEmptyRowSelected(false)
            toast.warn('Veuillez selectionner une action à effectuer')
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = validation_edit_admin(editAdminData)

        if (error.email !== initialError.email || error.name !== initialError.name || error.password !== initialError.password || error.password_confirm !== initialError.password_confirm || error.phone !== initialError.phone || error.username !== initialError.username) {
            setErr(error)
        } else {
            const { id, email, name, password, phone, username } = editAdminData
            setErr(initialError)

            if (!password)
                dispatch(editAdmin({ id, email: email.trim(), name: name.trim(), phone: phone.trim(), username: username.trim() }, setSeeModalDisplayEditDelete))
            else
                dispatch(editAdmin({ id, email: email.trim(), name: name.trim(), phone: phone.trim(), username: username.trim(), password }, setSeeModalDisplayEditDelete))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditAdminData({ ...editAdminData, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        localStorage.setItem('choose_action', '')
        localStorage.setItem('choose_status', chooseStatus)
    }, [chooseStatus])

    useEffect(() => {
        ElementSelected && setEditAdminData({ id: ElementSelected[0]?.id, email: ElementSelected[0]?.email, name: ElementSelected[0]?.name, phone: ElementSelected[0]?.phone, username: ElementSelected[0]?.username })
    }, [chooseAction, ElementSelected])

    return (
        <div className='action_filtre'>
            {seeModalDisplayEditDelete &&
                <div className='display_edit_delete_modal'>
                    <div className='overlay'></div>

                    <div className='display_edit_delete_modal_container'>
                        <RxCross2 className='croix' onClick={() => { setSeeModalDisplayEditDelete(false); setErr(data) }} />

                        <div className='loading_container'>
                            {loadingUser && <Loading h_w={40} hide_text mg='0px' padding='0px' />}
                        </div>

                        <div className='icon_name'>
                            <div className='icon_name_container'>
                                <FaUserCircle className='icon' />
                                <p>ADMINISTRATEUR</p>
                            </div>
                        </div>

                        {chooseAction && chooseAction === 'afficher' &&
                            ElementSelected?.map((admin_, i) => (
                                <div key={i} className='display_information'>
                                    <div className='container'>
                                        <div className='information_container'>
                                            <span className='title'>Nom d'utilisateur</span>
                                            <span className='value'> {admin_.username} </span>
                                        </div>

                                        <div className='information_container'>
                                            <span className='title'>Nom complet</span>
                                            <span className='value'> {admin_.name.length < 23 ? admin_.name : admin_.name.substring(0, 23) + '...'} </span>
                                        </div>

                                        <div className='information_container'>
                                            <span className='title'>Email</span>
                                            <span className='value'> {admin_.email.length < 23 ? admin_.email : admin_.email.substring(0, 23) + '...'} </span>
                                        </div>

                                        <div className='information_container'>
                                            <span className='title'>Numéro de téléphone</span>
                                            <span className='value'> {admin_.phone} </span>
                                        </div>

                                        <div className='information_container'>
                                            <span className='title'>Statut du compte</span>
                                            <span className='value'> {admin_.enabled ? 'Activé' : 'Non activé'} </span>
                                        </div>

                                        <div className='information_container'>
                                            <span className='title'>Rôle</span>
                                            <span className='value'> {admin_.role === 'SUPER_ADMIN' ? 'Super administrateur' : 'Administrateur'} </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        {chooseAction && chooseAction === 'modifier' &&
                            ElementSelected?.map((admin_, i) => (
                                <form key={i} action='' onSubmit={handleSubmit}>
                                    <div className='input_label_container'>
                                        <label htmlFor='username'>Nom d'utilisateur</label>
                                        <input type='text' name='username' id='username' value={editAdminData.username} onChange={handleChange} />
                                        {err?.username && <span className='error'> {err?.username} </span>}
                                    </div>

                                    <div className='input_label_container'>
                                        <label htmlFor='name'>Nom complet</label>
                                        <input type='text' name='name' id='name' value={editAdminData.name} onChange={handleChange} />
                                        {err?.name && <span className='error'> {err?.name} </span>}
                                    </div>

                                    <div className='input_label_container'>
                                        <label htmlFor='email'>Email</label>
                                        <input type='text' name='email' id='email' value={editAdminData.email} onChange={handleChange} />
                                        {err?.email && <span className='error'> {err?.email} </span>}

                                    </div>

                                    <div className='input_label_container'>
                                        <label htmlFor='phone'>Numéro de téléphone</label>
                                        <input type='tel' name='phone' id='phone' value={editAdminData.phone} onChange={handleChange} />
                                        {err?.phone && <span className='error'> {err?.phone} </span>}
                                    </div>

                                    {confirmEditPassword &&
                                        <>
                                            <div className='input_label_container'>
                                                <label htmlFor='password'>Mot de passe</label>
                                                <input type={seePassword ? 'text' : 'password'} className='password' name='password' id='password' onChange={handleChange} />
                                                {!seePassword ?
                                                    <AiOutlineEye className='icon password' title='Afficher le mot de passe' onClick={() => setSeePassword(prev => !prev)} /> :
                                                    <AiOutlineEyeInvisible className='icon password' title='Masquer le mot de passe' onClick={() => setSeePassword(prev => !prev)} />
                                                }
                                                {err?.password && <span className='error'> {err?.password} </span>}
                                            </div>

                                            <div className='input_label_container'>
                                                <label htmlFor='password_confirm'>Confirmer le mot de passe</label>
                                                <input type={seePasswordConfirm ? 'text' : 'password'} className='password' name='password_confirm' id='password_confirm' onChange={handleChange} />
                                                {!seePasswordConfirm ?
                                                    <AiOutlineEye className='icon password' title='Afficher le mot de passe' onClick={() => setSeePasswordConfirm(prev => !prev)} /> :
                                                    <AiOutlineEyeInvisible className='icon password' title='Masquer le mot de passe' onClick={() => setSeePasswordConfirm(prev => !prev)} />
                                                }
                                                {err?.password_confirm && <span className='error'> {err?.password_confirm} </span>}
                                            </div>
                                        </>
                                    }

                                    <div className='save_abort'>
                                        <button disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                        <button type='reset' className='abort' disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete && setSeeModalDisplayEditDelete(false); }}>Annuler</button>
                                    </div>

                                    {admin.id === admin_.id &&
                                        <div className='edit_password'>
                                            {!confirmEditPassword && <p>Voulez-modifier votre mot de passe ? <span className='confirm_edit_password' onClick={() => setConfirmEditPassword(true)}>OUI</span></p>}
                                            {confirmEditPassword && <p>Voulez-modifier votre mot de passe ? <span className='confirm_edit_password' onClick={() => setConfirmEditPassword(false)}>NON</span></p>}
                                        </div>}
                                </form>
                            ))
                        }

                        {/* {chooseAction && chooseAction === 'supprimer' &&
                            ElementSelected?.map((admin_, i) => (
                                <div key={i} className='delete'>
                                    <div className='container'>
                                        <p> Voulez-vous vraiment supprimer cet(te) administrateur(trice) ? </p>

                                        <div className='yes_or_no_container'>
                                            <span className='yes' onClick={() => { dispatch(deleteAdmin(admin_.id, setSeeModalDisplayEditDelete, setEmptyRowSelected)); if (allAdmins.length === 1) { setChooseAction(''); localStorage.setItem('choose_action', '') } setElementSelected && setElementSelected([]); }}>OUI</span>
                                            <span className='no' onClick={() => setSeeModalDisplayEditDelete(false)}>NON</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        } */}

                        {chooseAction && chooseAction === 'activer' &&
                            ElementSelected?.map((admin_, i) => (
                                <form key={i} action='' onSubmit={(e) => { e.preventDefault(); dispatch(activeAdminOrUser(admin_.id, admin_.enabled, setSeeModalDisplayEditDelete)) }}>
                                    <div className='select_label_container'>
                                        <label htmlFor='status'>Statut :</label>
                                        <select name='status' id='status' value={!admin_.enabled ? 'activer' : 'desactiver'} onChange={e => setChooseStatus(e.target.value)}>
                                            {!admin_.enabled && <option value='activer'>Activer</option>}
                                            {admin_.enabled && <option value='desactiver'>Désactiver</option>}
                                        </select>
                                    </div>

                                    <div className='save_abort'>
                                        <button disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                        <button type='reset' className='abort' disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete && setSeeModalDisplayEditDelete(false) }}>Annuler</button>
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
                            <option value='modifier'>Modifier</option>
                            <option value='supprimer'>Supprimer</option>
                            <option value='activer'>Activer / Desactiver Compte</option>
                        </select>
                        <button>Appliquer</button>
                    </form> :
                    <form className='action' onSubmit={e => { e.preventDefault(); toast.warn('Veuillez selectionner au plus un seul administrateur') }}>
                        <select name='action' id='action'>
                            <option value=''>Veuillez selectionner au plus un seul administrateur</option>
                        </select>
                        <button>Appliquer</button>
                    </form>
                }
            </div>

            <span className='nb_elements'>{allAdmins.length} éléments</span>
        </div >
    )
}

export default AdminActionFiltre