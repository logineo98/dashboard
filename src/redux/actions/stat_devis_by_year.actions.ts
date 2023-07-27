import axios from 'axios'
import { ERROR_STAT_DEVIS_BY_YEAR, GET_ALL_STATS_DEVIS_BY_YEAR, LOADING_STAT_DEVIS_BY_YEAR, api_stat_devis } from '../constants'
import { toast } from 'react-toastify'

const token = localStorage.getItem('token')

const LoadingStatDevisByYear: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_STAT_DEVIS_BY_YEAR })
}

export const getAllStatsDevisByYear = (year: string) => async (dispatch: any) => {
    try {
        dispatch(LoadingStatDevisByYear())

        const response = await axios.get(`${api_stat_devis}/${year}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_STATS_DEVIS_BY_YEAR, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_STAT_DEVIS_BY_YEAR, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}