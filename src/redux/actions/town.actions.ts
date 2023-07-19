import axios from 'axios'
import { ADD_TOWN, DELETE_TOWN, EDIT_TOWN, ERROR_TOWN, GET_ALL_TOWNS, GET_TOWN, LOADING_TOWN, api_town } from '../constants'
import { toast } from 'react-toastify'
import { ADD_EDIT_TOWN_TYPE } from '../../utils/types'

const token = localStorage.getItem('token')

const LoadingTown: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_TOWN })
}

export const getAllTowns = () => async (dispatch: any) => {
    try {
        dispatch(LoadingTown())

        const response = await axios.get(`${api_town}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_TOWNS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_TOWN, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const getTown = (id: string) => async (dispatch: any) => {
    try {
        dispatch(LoadingTown())

        const response = await axios.get(`${api_town}/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_TOWN, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_TOWN, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const addTown = (data: ADD_EDIT_TOWN_TYPE, setAddTownData?: React.Dispatch<React.SetStateAction<ADD_EDIT_TOWN_TYPE>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingTown())

        const response = await axios.post(`${api_town}`, data, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('La ville a été ajoutée avec succès.')

        setAddTownData && setAddTownData({ name: '' })

        dispatch({ type: ADD_TOWN, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_TOWN, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const editTown = (id: string | undefined, data: { name: string }, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingTown())

        const response = await axios.put(`${api_town}/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('La ville a été modifiée avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: EDIT_TOWN, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_TOWN, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const deleteTown = (id: string, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingTown())

        const response = await axios.delete(`${api_town}/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('La ville a été supprimée avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: DELETE_TOWN, payload: { data: response.data, id } })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_TOWN, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}