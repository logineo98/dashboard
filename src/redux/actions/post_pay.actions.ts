import axios from 'axios'
import { ERROR_POST_PAY, GET_ALL_POST_PAYS, LOADING_POST_PAY, api_invoice } from '../constants'
import { toast } from 'react-toastify'

const token = localStorage.getItem('token')

const LoadingPostPay: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_POST_PAY })
}

export const getAllPostPays = () => async (dispatch: any) => {
    try {
        dispatch(LoadingPostPay())

        const response = await axios.get(`${api_invoice}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_POST_PAYS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_POST_PAY, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}