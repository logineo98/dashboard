import axios from 'axios'
import { ERROR_ASSISTANCE, GET_ALL_ASSISTANCES, GET_ASSISTANCE, LOADING_STAT, REPLY_ASSISTANCE, api_assistance } from '../constants'
import { toast } from 'react-toastify'

const token = localStorage.getItem('token')

const LoadingAssistance: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_STAT })
}

export const getAllAssistances = () => async (dispatch: any) => {
    try {
        dispatch(LoadingAssistance())

        const response = await axios.get(`${api_assistance}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_ASSISTANCES, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_ASSISTANCE, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const getAssistance = (id: string) => async (dispatch: any) => {
    try {
        dispatch(LoadingAssistance())

        const response = await axios.get(`${api_assistance}/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ASSISTANCE, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_ASSISTANCE, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const replyAssistance = (id: string, data: { response: string }, setMsg: React.Dispatch<React.SetStateAction<string>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingAssistance())

        const response = await axios.post(`${api_assistance}/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })

        setMsg('')
        dispatch({ type: REPLY_ASSISTANCE, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_ASSISTANCE, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}