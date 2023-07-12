import axios from 'axios'
import { ERROR_STAT, GET_ALL_STATS, LOADING_STAT, api_stat } from '../constants'
import { toast } from 'react-toastify'

const token = localStorage.getItem('token')

const LoadingStat: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_STAT })
}

export const getAllStats = () => async (dispatch: any) => {
    try {
        dispatch(LoadingStat())

        const response = await axios.get(`${api_stat}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_STATS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_STAT, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}