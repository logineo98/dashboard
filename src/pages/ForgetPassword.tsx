import React, { useEffect, useState } from 'react'
import LoginContainer from '../components/login/LoginContainer'
import { FORGET_PASSWORD_TYPE } from '../utils/types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'
import { getAdminByUsernameOrPhone, resendCode, resetForget, resetPassword, sendPin } from '../redux/actions/user.actions'
import { toast } from 'react-toastify'

// importation des icons
import { MdOutlineAccountCircle } from 'react-icons/md'
import { BsSend } from 'react-icons/bs'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { page_forget_password } from '../utils/name_page'


const ForgetPassword = () => {
    const verify: FORGET_PASSWORD_TYPE = { user: true, choose: false, code: false, write_password: false, success: false }
    const initSmsEmail = { smsOrEmail: '' }

    const [verifyData, setVerifyData] = useState(verify)
    const [seePassword, setSeePassword] = useState(false)
    const [usernameOrPhone, setUsernameOrPhone] = useState('')
    const [smsEmail, setSmsEmail] = useState(initSmsEmail)
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')

    const { loadingUser, adminForget, chooseForget, pinForget } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (verifyData.user) {
            if (usernameOrPhone && usernameOrPhone.trim() !== '') {
                dispatch(getAdminByUsernameOrPhone(usernameOrPhone, setVerifyData))
            } else {
                toast.warn('Veuillez renseigner le champ.')
            }
        } else if (verifyData.choose) {

            if (smsEmail.smsOrEmail !== '') {
                dispatch(sendPin({ id: adminForget?.id, type: smsEmail.smsOrEmail }, setVerifyData))
            } else {
                toast.warn('Veuillez choisir email ou sms.')
            }
        } else if (verifyData.code) {
            if (code !== '' && code.trim() !== '') {

                if (parseInt(code, 10) !== pinForget) {
                    toast.error('Désolé, le code n\'est pas valide.')
                } else {
                    toast.success('Le code saisi est correct.')
                    setVerifyData({ user: false, choose: false, code: false, write_password: true, success: false })
                }
            } else {
                toast.warn('Veuillez renseigner le champ.')
            }
        } else if (verifyData.write_password) {
            if (password !== '') {
                if (password.length >= 6) {
                    dispatch(resetPassword({ id: adminForget?.id, pin: pinForget, password: password }, setVerifyData))
                } else {
                    toast.warn('Doit être supérieur ou égal à 6 caractères.')
                }
            } else {
                toast.warn('Veuillez renseigner le champ.')
            }
        }
    }

    const resendCodePin = () => {
        dispatch(resendCode({ id: adminForget?.id, type: chooseForget }))
    }

    const handleChangeSmsEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSmsEmail({ smsOrEmail: e.target.value })
    }

    useEffect(() => {
        document.title = page_forget_password
    }, [])

    return (
        <LoginContainer>
            <form onSubmit={handleSubmit}>
                {verifyData.user &&
                    <div className='container_user'>
                        <div className='input_container'>
                            <input type='text' name='usernameOrPhone' id='usernameOrPhone' value={usernameOrPhone} placeholder='Username ou num. de tél.' onChange={e => { setUsernameOrPhone(e.target.value) }} />
                            <MdOutlineAccountCircle className='icon' />
                        </div>
                        <div className='back_login'>
                            <Link to='/'>Retour sur la page de connexion</Link>
                        </div>

                        <button disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }}>Envoyer</button>
                    </div>
                }

                {verifyData.choose &&
                    <div className='container_choose_back'>
                        <p className='question'>Voulez-vous recevoir votre code par : </p>
                        <div className='choose_container'>
                            <label htmlFor='email'>
                                <input type='radio' name='choose' id='email' value='email' checked={smsEmail.smsOrEmail === 'email'} onChange={handleChangeSmsEmail} /> Email
                            </label>

                            <label htmlFor='sms'>
                                <input type='radio' name='choose' id='sms' value='sms' checked={smsEmail.smsOrEmail === 'sms'} onChange={handleChangeSmsEmail} /> SMS
                            </label>

                            <button disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }}> <BsSend className='icon' /> </button>
                        </div>
                        <div className='back_forget'>
                            <span onClick={() => { setVerifyData({ user: true, choose: false, code: false, write_password: false, success: false }); setSmsEmail({ smsOrEmail: '' }) }}>Retour</span>
                        </div>
                    </div>
                }

                {verifyData.code &&
                    <div className='container_code_resend'>
                        <p className='question'>Veuillez saisir le code reçu : </p>
                        <div className='code_container'>
                            <input type='number' name='code' id='code' value={code} onChange={e => { setCode(e.target.value) }} />
                            <button disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }}> <BsSend className='icon' /> </button>
                        </div>
                        <div className='resend_back'>
                            <span onClick={resendCodePin}>Renvoyer le code</span>
                            <span onClick={() => { setVerifyData({ user: false, choose: true, code: false, write_password: false, success: false }) }}>Retour</span>
                        </div>
                        <p style={{ color: 'black', opacity: '0.1' }}> {pinForget} </p>
                    </div>
                }

                {verifyData.write_password &&
                    <div className='container_write_password'>
                        <p className='question'>Veuillez saisir le nouveau mot de passe : </p>
                        <div className='password_send_container'>
                            <div className='password_container'>
                                <input type={seePassword ? 'text' : 'password'} name='password' id='password' placeholder='Nouveau mot de passe' value={password} onChange={e => { setPassword(e.target.value) }} />
                                {!seePassword ?
                                    <AiOutlineEye className='icon' title='Afficher le mot de passe' onClick={() => setSeePassword(prev => !prev)} /> :
                                    <AiOutlineEyeInvisible className='icon' title='Masquer le mot de passe' onClick={() => setSeePassword(prev => !prev)} />
                                }
                            </div>
                            <button disabled={loadingUser ? true : false} style={{ cursor: loadingUser ? 'not-allowed' : 'pointer' }}> <BsSend className='icon' /> </button>
                        </div>
                        <div className='code_back'>
                            <span onClick={() => { setVerifyData({ user: false, choose: false, code: true, write_password: false, success: false }); setCode(''); setPassword('') }}>Retour</span>
                        </div>
                    </div>
                }

                {verifyData.success &&
                    <div className='container_success'>
                        <p className="msg_success">Votre mot de passe a été modifié avec succès, veuillez retourner sur la page de connexion pour vous connecter.</p>
                        <div className='back_login'>
                            <Link to='/' onClick={() => dispatch(resetForget())}>Retour sur la page de connexion</Link>
                        </div>
                    </div>
                }
            </form>
        </LoginContainer>
    )
}

export default ForgetPassword