import { toast } from 'react-toastify'
import { ADD_QUARTER, ERROR_QUARTER, GET_ALL_QUARTERS, LOADING_QUARTER, api_quarter } from '../constants'
import axios from 'axios'
import { ADD_EDIT_QUARTER_TYPE } from '../../utils/types'

const token = localStorage.getItem('token')

const LoadingQuarter: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_QUARTER })
}

export const getAllQuarters = () => async (dispatch: any) => {
    try {
        dispatch(LoadingQuarter())

        const response = await axios.get(`${api_quarter}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_QUARTERS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_QUARTER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const addQuarter = (data: ADD_EDIT_QUARTER_TYPE, setAddQuarterData: React.Dispatch<React.SetStateAction<ADD_EDIT_QUARTER_TYPE>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingQuarter())

        const response = await axios.post(`${api_quarter}`, data, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('Le quartier a été ajoutée avec succès.')

        setAddQuarterData({ communeId: '', name: '' })

        dispatch({ type: ADD_QUARTER, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_QUARTER, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}