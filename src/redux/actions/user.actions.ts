import axios from 'axios'
import { EMPTY_ERROR_USER, ERROR_USER, GET_ADMIN, GET_ADMIN_BY_USERNAME_OR_PHONE, IS_CONNECTED, LOADING_USER, PUT_LOADING_USER_FALSE, RESEND_CODE, SEND_PIN, auth } from '../constants'
import { toast } from 'react-toastify'
import { FORGET_PASSWORD_TYPE, PIN_TYPE } from '../../utils/types'


const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

export const LoadingUser: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_USER })
}

export const putLoadingUserFalse: () => any = () => (dispatch: any) => {
    dispatch({ type: PUT_LOADING_USER_FALSE })
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