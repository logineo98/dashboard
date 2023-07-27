import { toast } from 'react-toastify'
import { ADD_COMMUNE, ERROR_COMMUNE, GET_ALL_COMMUNES, LOADING_COMMUNE, api_commune } from '../constants'
import axios from 'axios'
import { ADD_EDIT_COMMUNE_TYPE } from '../../utils/types'

const token = localStorage.getItem('token')

const LoadingCommune: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_COMMUNE })
}

export const getAllCommunes = () => async (dispatch: any) => {
    try {
        dispatch(LoadingCommune())

        const response = await axios.get(`${api_commune}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_COMMUNES, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_COMMUNE, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const addCommune = (data: ADD_EDIT_COMMUNE_TYPE, setAddCommuneData: React.Dispatch<React.SetStateAction<ADD_EDIT_COMMUNE_TYPE>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingCommune())

        const response = await axios.post(`${api_commune}`, data, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('La commune a été ajoutée avec succès.')

        setAddCommuneData({ cityId: '', name: '' })

        dispatch({ type: ADD_COMMUNE, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_COMMUNE, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}
