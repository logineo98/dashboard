import axios from 'axios'
import { ERROR_PRE_PAY, GET_ALL_PRE_PAYS, LOADING_PRE_PAY, api_isago } from '../constants'
import { toast } from 'react-toastify'

const token = localStorage.getItem('token')

const LoadingPrePay: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_PRE_PAY })
}

export const getAllPrePays = () => async (dispatch: any) => {
    try {
        dispatch(LoadingPrePay())

        const response = await axios.get(`${api_isago}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_PRE_PAYS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_PRE_PAY, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}