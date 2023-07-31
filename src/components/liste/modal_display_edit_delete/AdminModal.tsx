import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../redux/store'
import Loading from '../../loading/Loading'
import { activeAdminOrUser, deleteAdmin, editAdmin } from '../../../redux/actions/user.actions'
import { ADD_EDIT_ADMIN_TYPE, COLUMN_DATA_TABLE_TYPE } from '../../../utils/types'
import { validation_edit_admin } from '../../../utils/validation'

// importation icons
import { RxCross2 } from 'react-icons/rx'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

type ADMIN_MODAL_TYPE = {
    type: string,
    row: COLUMN_DATA_TABLE_TYPE,
    seeModalDisplayEditDelete: boolean,
    setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminModal: FC<ADMIN_MODAL_TYPE> = ({ type, row, seeModalDisplayEditDelete, setSeeModalDisplayEditDelete }) => {
    const data: ADD_EDIT_ADMIN_TYPE = { id: '', name: '', username: '', email: '', phone: '', password: '', password_confirm: '' }

    const { loadingUser, admin } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    const [editAdminData, setEditAdminData] = useState(data)
    const [confirmEditPassword, setConfirmEditPassword] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const [seePasswordConfirm, setSeePasswordConfirm] = useState(false)
    const [chooseStatus, setChooseStatus] = useState('')
    const [err, setErr] = useState<ADD_EDIT_ADMIN_TYPE>()

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
        setEditAdminData({ id: row ? row.id : '', email: row ? row.email : '', name: row ? row.name : '', phone: row ? row.phone : '', username: row ? row.username : '' })
    }, [row])

    useEffect(() => {
        localStorage.setItem('choose_status', chooseStatus)
    }, [chooseStatus])

    return (
        seeModalDisplayEditDelete ?
            <div className='modal'>
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
                                    <span className='value'> {row?.email.length < 23 ? row?.email : row?.email.substring(0, 23) + '...'} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Numéro de téléphone</span>
                                    <span className='value'> {row?.phone} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Statut du compte</span>
                                    <span className='value'> {row?.enabled ? 'Activé' : 'Non activé'} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Rôle</span>
                                    <span className='value'> {row?.role === 'SUPER_ADMIN' ? 'Super administrateur' : 'Administrateur'} </span>
                                </div>
                            </div>
                        </div>
                    }

                    {type === 'modifier' &&
                        <form action='' onSubmit={handleSubmit}>
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
                                <button type='reset' className='abort' disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete && setSeeModalDisplayEditDelete(false); setErr(data) }}>Annuler</button>
                            </div>

                            {admin?.id === row?.id &&
                                <div className='edit_password'>
                                    {!confirmEditPassword && <p>Voulez-modifier votre mot de passe ? <span className='confirm_edit_password' onClick={() => setConfirmEditPassword(true)}>OUI</span></p>}
                                    {confirmEditPassword && <p>Voulez-modifier votre mot de passe ? <span className='confirm_edit_password' onClick={() => setConfirmEditPassword(false)}>NON</span></p>}
                                </div>}
                        </form>
                    }

                    {type === 'supprimer' &&
                        <div className='delete'>
                            <div className='container'>
                                <p> Voulez-vous vraiment supprimer cet(te) administrateur(trice) ? </p>

                                <div className='yes_or_no_container'>
                                    <button disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }} className='yes' onClick={() => { dispatch(deleteAdmin(row?.id, setSeeModalDisplayEditDelete)) }}>OUI</button>
                                    <button disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }} className='no' onClick={() => setSeeModalDisplayEditDelete(false)}>NON</button>
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
                                    {row?.enabled && <option value='desactiver'>Desactiver</option>}
                                </select>
                            </div>

                            <div className='save_abort'>
                                <button disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                <button type='reset' className='abort' disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete(false) }}>Annuler</button>
                            </div>
                        </form>
                    }
                </div>
            </div> : <></>
    )
}

export default AdminModal