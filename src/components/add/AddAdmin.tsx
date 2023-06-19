import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { ADD_EDIT_ADMIN_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'
import { validation_add_admin } from '../../utils/validation'
import { useDispatch, useSelector } from 'react-redux'
import { addAdmin } from '../../redux/actions/user.actions'
import { RootReducerType } from '../../redux/store'
import Loading from '../loading/Loading'

const AddAdmin: PAGE_COMPONENT_TYPE = ({ seeAdminAdmin, setSeeAdminAdmin }) => {

    const data: ADD_EDIT_ADMIN_TYPE = { name: '', username: '', email: '', phone: '', password: '', password_confirm: '' }

    const [seePassword, setSeePassword] = useState(false)
    const [seePasswordConfirm, setSeePasswordConfirm] = useState(false)
    const [addAdminData, setAddAdminData] = useState(data)
    const [err, setErr] = useState<ADD_EDIT_ADMIN_TYPE>()

    const { loadingUser } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = validation_add_admin(addAdminData)

        if (error.email !== initialError.email || error.name !== initialError.name || error.password !== initialError.password || error.password_confirm !== initialError.password_confirm || error.phone !== initialError.phone || error.username !== initialError.username) {
            setErr(error)
        } else {
            const { email, name, password, phone, username } = addAdminData
            setErr(initialError)
            dispatch(addAdmin({ email: email.trim(), name: name.trim(), phone: phone.trim(), username: username.trim(), password }, setAddAdminData))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddAdminData({ ...addAdminData, [e.target.id]: e.target.value })
    }

    return (
        !seeAdminAdmin ? <></> :
            <div className='add'>
                <div className='overlay'></div>

                <div className='add_container'>
                    <RxCross2 className='croix' onClick={() => { setSeeAdminAdmin && setSeeAdminAdmin(false); setAddAdminData(data); setErr(data) }} />

                    <div className='loading_container'>
                        {loadingUser && <Loading h_w={40} hide_text mg='0px' padding='0px' />}
                    </div>

                    <div className='icon_name'>
                        <div className='icon_name_container'>
                            <FaUserCircle className='icon' />
                            <p>ADMINISTRATEUR</p>
                        </div>
                    </div>

                    <form action='' onSubmit={handleSubmit}>
                        <div className='input_label_container'>
                            <label htmlFor='username'>Nom d'utilisateur</label>
                            <input type='text' name='username' id='username' value={addAdminData.username} onChange={handleChange} />
                            {err?.username && <span className='error'> {err?.username} </span>}
                        </div>

                        <div className='input_label_container'>
                            <label htmlFor='name'>Nom complet</label>
                            <input type='text' name='name' id='name' value={addAdminData.name} onChange={handleChange} />
                            {err?.name && <span className='error'> {err?.name} </span>}
                        </div>

                        <div className='input_label_container'>
                            <label htmlFor='email'>Email</label>
                            <input type='text' name='email' id='email' value={addAdminData.email} onChange={handleChange} />
                            {err?.email && <span className='error'> {err?.email} </span>}
                        </div>

                        <div className='input_label_container'>
                            <label htmlFor='phone'>Numéro de téléphone</label>
                            <input type='tel' name='phone' id='phone' value={addAdminData.phone} onChange={handleChange} />
                            {err?.phone && <span className='error'> {err?.phone} </span>}
                        </div>

                        <div className='input_label_container'>
                            <label htmlFor='password'>Mot de passe</label>
                            <input type={seePassword ? 'text' : 'password'} className='password' name='password' id='password' value={addAdminData.password} onChange={handleChange} />
                            {!seePassword ?
                                <AiOutlineEye className='icon password' title='Afficher le mot de passe' onClick={() => setSeePassword(prev => !prev)} /> :
                                <AiOutlineEyeInvisible className='icon password' title='Masquer le mot de passe' onClick={() => setSeePassword(prev => !prev)} />
                            }
                            {err?.password && <span className='error'> {err?.password} </span>}
                        </div>

                        <div className='input_label_container'>
                            <label htmlFor='password_confirm'>Confirmer le mot de passe</label>
                            <input type={seePasswordConfirm ? 'text' : 'password'} className='password' name='password_confirm' id='password_confirm' value={addAdminData.password_confirm} onChange={handleChange} />
                            {!seePasswordConfirm ?
                                <AiOutlineEye className='icon password' title='Afficher le mot de passe' onClick={() => setSeePasswordConfirm(prev => !prev)} /> :
                                <AiOutlineEyeInvisible className='icon password' title='Masquer le mot de passe' onClick={() => setSeePasswordConfirm(prev => !prev)} />
                            }
                            {err?.password_confirm && <span className='error'> {err?.password_confirm} </span>}
                        </div>

                        <div className='save_abort'>
                            <button disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                            <button type='reset' className='abort' disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeAdminAdmin && setSeeAdminAdmin(false); setErr(data) }}>Annuler</button>
                        </div>
                    </form>

                </div>
            </div>
    )
}

export default AddAdmin