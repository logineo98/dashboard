import axios from 'axios'
import { ERROR_STAT_POST_PAY_BY_YEAR, GET_ALL_STATS_PRE_PAY_BY_YEAR, LOADING_STAT_PRE_PAY_BY_YEAR, api_stat_isago } from '../constants'
import { toast } from 'react-toastify'

const token = localStorage.getItem('token')

const LoadingStatPrePayByYear: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_STAT_PRE_PAY_BY_YEAR })
}

export const getAllStatsPrePayByYear = (year: string) => async (dispatch: any) => {
    try {
        dispatch(LoadingStatPrePayByYear())

        const response = await axios.get(`${api_stat_isago}/${year}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_STATS_PRE_PAY_BY_YEAR, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_STAT_POST_PAY_BY_YEAR, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}