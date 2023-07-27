import axios from 'axios'
import { ERROR_POST_PAY, EXPORT_POST_PAY, FILTER_POST_PAY, GET_ALL_POST_PAYS, LOADING_POST_PAY, api_invoice } from '../constants'
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

export const filterPostPay = (data: { paymentStatus?: string | null, begin?: string | null, end?: string | null }) => async (dispatch: any) => {
    try {
        dispatch(LoadingPostPay())

        const response = await axios.post(`${api_invoice}/filter`, data, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: FILTER_POST_PAY, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_POST_PAY, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const exportPostPay = (data: { paymentStatus?: string | null, begin?: string | null, end?: string | null }) => async (dispatch: any) => {
    try {
        dispatch(LoadingPostPay())

        const response = await axios.post(`${api_invoice}/export`, data, { headers: { Authorization: `Bearer ${token}` }, responseType: 'blob' })

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'facture.xlsx')
        document.body.appendChild(link)
        link.click()

        toast.success('L\'exportation du fichier a été effectuée avec succès.')

        dispatch({ type: EXPORT_POST_PAY, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_POST_PAY, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}