import axios from 'axios'
import { ACTIVE_ADMIN_USER, ADD_ADMIN, DELETE_ADMIN, EDIT_ADMIN, EMPTY_ERROR_USER, ERROR_USER, FILTER_CLIENT, GET_ADMIN, GET_ADMIN_BY_USERNAME_OR_PHONE, GET_ALL_ADMINS, GET_ALL_USERS, IS_CONNECTED, LOADING_USER, RESEND_CODE, RESET_FORGET, RESET_PASSWORD, SEND_PIN, api_user, auth } from '../constants'
import { toast } from 'react-toastify'
import { ADD_EDIT_ADMIN_TYPE, FORGET_PASSWORD_TYPE, PIN_TYPE } from '../../utils/types'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

export const LoadingUser: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_USER })
}

export const emptyErrorUser: () => any = () => (dispatch: any) => {
    dispatch({ type: EMPTY_ERROR_USER, payload: null })
}

export const isUserConnected: (value: boolean) => any = (value) => (dispatch: any) => {
    dispatch({ type: IS_CONNECTED, payload: value })
}

export const getAdmin = () => async (dispatch: any) => {
    try {
        dispatch(LoadingUser())

        user ? dispatch({ type: GET_ADMIN, payload: JSON.parse(user) }) : dispatch({ type: GET_ADMIN, payload: null })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_USER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const getAdminByUsernameOrPhone = (usernameOrPhone: string, setVerifyData: React.Dispatch<React.SetStateAction<FORGET_PASSWORD_TYPE>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingUser())

        const response = await axios.get(`${auth}/password/${usernameOrPhone}`)

        setVerifyData({ user: false, choose: true, code: false, write_password: false, success: false })
        toast.success('L\'administrateur(rice) correspondant(e) a été trouvé(e)')

        dispatch({ type: GET_ADMIN_BY_USERNAME_OR_PHONE, payload: { usernameOrPhone, data: response.data } })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_USER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const sendPin = (data: PIN_TYPE, setVerifyData: React.Dispatch<React.SetStateAction<FORGET_PASSWORD_TYPE>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingUser())

        const response = await axios.post(`${auth}/password/send-pin`, data)

        setVerifyData({ user: false, choose: false, code: true, write_password: false, success: false })
        toast.success('Le code vous a été envoyé avec succès.')

        dispatch({ type: SEND_PIN, payload: { ...response.data, choose: data.type } })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_USER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const resetPassword = (data: PIN_TYPE, setVerifyData: React.Dispatch<React.SetStateAction<FORGET_PASSWORD_TYPE>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingUser())

        const response = await axios.post(`${auth}/password/reset`, data)

        setVerifyData({ user: false, choose: false, code: false, write_password: false, success: true })
        dispatch({ type: RESET_PASSWORD, payload: response.data })
        toast.success('Modification effectuée avec succès.')
    } catch (error: any) {
        dispatch({ type: ERROR_USER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const resendCode = (data: PIN_TYPE) => async (dispatch: any) => {
    try {
        dispatch(LoadingUser())

        const response = await axios.post(`${auth}/password/send-pin`, data)

        toast.success('Le code vous a été renvoyé avec succès.')

        dispatch({ type: RESEND_CODE, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_USER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const resetForget = () => (dispatch: any) => {
    dispatch({ type: RESET_FORGET })
}

export const addAdmin = (data: ADD_EDIT_ADMIN_TYPE, setAddAdminData?: React.Dispatch<React.SetStateAction<ADD_EDIT_ADMIN_TYPE>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingUser())

        const response = await axios.post(`${api_user}`, data, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('L\'administrateur a été ajouté avec succès.')

        setAddAdminData && setAddAdminData({ name: '', username: '', email: '', phone: '', password: '', password_confirm: '' })

        dispatch({ type: ADD_ADMIN, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_USER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const getAllAdmins = () => async (dispatch: any) => {
    try {
        dispatch(LoadingUser())

        const response = await axios.get(`${api_user}/admins`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_ADMINS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_USER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const getAllClients = () => async (dispatch: any) => {
    try {
        dispatch(LoadingUser())

        const response = await axios.get(`${api_user}/customers`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_USERS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_USER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const editAdmin = (data: ADD_EDIT_ADMIN_TYPE, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingUser())
        const admin_connected = user ? JSON.parse(user) : null

        const response = await axios.put(`${api_user}/${data.id}`, data, { headers: { Authorization: `Bearer ${token}` } })

        admin_connected?.id === data.id && localStorage.setItem('user', JSON.stringify(response.data))

        toast.success('L\'administrateur a été modifié avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: EDIT_ADMIN, payload: { data: response.data, admin_connected: admin_connected?.id === data.id ? response.data : admin_connected } })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_USER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const deleteAdmin = (id: string, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingUser())

        const response = await axios.delete(`${api_user}/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('L\'administrateur a été supprimé avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: DELETE_ADMIN, payload: { data: response.data, id } })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_USER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const activeAdminOrUser = (id: string, oldStatus: boolean, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingUser())

        const response = await axios.get(`${api_user}/${id}/status`, { headers: { Authorization: `Bearer ${token}` } })

        if (oldStatus === false) toast.success('L\'activation du compte a été effectuée avec succès.')
        else toast.success('La desactivation du compte a été effectuée avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: ACTIVE_ADMIN_USER, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_USER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const filterClient = (data: { enabled?: string | boolean | null }) => async (dispatch: any) => {
    try {
        dispatch(LoadingUser())

        const response = await axios.post(`${api_user}/customers/filter`, data, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: FILTER_CLIENT, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_USER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}