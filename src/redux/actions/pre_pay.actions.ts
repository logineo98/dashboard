import axios from 'axios'
import { ERROR_PRE_PAY, EXPORT_PRE_PAY, FILTER_PRE_PAY, GET_ALL_PRE_PAYS, LOADING_PRE_PAY, api_isago } from '../constants'
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

export const filterPrePay = (data: { paymentStatus?: string | null, begin?: string | null, end?: string | null }) => async (dispatch: any) => {
    try {
        dispatch(LoadingPrePay())

        const response = await axios.post(`${api_isago}/filter`, data, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: FILTER_PRE_PAY, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_PRE_PAY, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const exportPrePay = (data: { paymentStatus?: string | null, begin?: string | null, end?: string | null }) => async (dispatch: any) => {
    try {
        dispatch(LoadingPrePay())

        const response = await axios.post(`${api_isago}/export`, data, { headers: { Authorization: `Bearer ${token}` }, responseType: 'blob' })

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'isago.xlsx')
        document.body.appendChild(link)
        link.click()

        toast.success('L\'exportation du fichier a été effectuée avec succès.')

        dispatch({ type: EXPORT_PRE_PAY, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_PRE_PAY, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}