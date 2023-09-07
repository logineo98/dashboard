import axios from 'axios'
import { ERROR_INFORMATION, GET_ALL_INFORMATIONS, LOADING_INFORMATION, api_information } from '../constants'
import { toast } from 'react-toastify'
import { ADD_EDIT_NEWS_INFORMATION_TYPE } from '../../utils/types'
import { ADD_INFORMATION } from '../constants'
import { EDIT_INFORMATION } from '../constants'
import { DELETE_INFORMATION } from '../constants'

const token = localStorage.getItem('token')

const LoadingInformation: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_INFORMATION })
}

export const getAllInformations = () => async (dispatch: any) => {
    try {
        dispatch(LoadingInformation())

        const response = await axios.get(`${api_information}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_INFORMATIONS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_INFORMATION, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const addInformation = (data: FormData, setAddInformationData: React.Dispatch<React.SetStateAction<ADD_EDIT_NEWS_INFORMATION_TYPE>>, setPreviewImg: React.Dispatch<React.SetStateAction<string | File>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingInformation())

        const response = await axios.post(`${api_information}`, data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } })

        toast.success('L\'information a été ajoutée avec succès.')

        setAddInformationData({ title: '', content: '', image: '', type: '', diffusionItems: [] })
        setPreviewImg('')

        dispatch({ type: ADD_INFORMATION, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_INFORMATION, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const editInformation = (id: string, data: FormData, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingInformation())

        const response = await axios.put(`${api_information}/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } })

        toast.success('L\'information a été modifiée avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: EDIT_INFORMATION, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_INFORMATION, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const deleteInformation = (id: string, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>, setEmptyRowSelected?: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(getAllInformations())

        const response = await axios.delete(`${api_information}/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('L\'information a été supprimée avec succès.')

        setEmptyRowSelected && setEmptyRowSelected(true)
        setSeeModalDisplayEditDelete(false)

        dispatch({ type: DELETE_INFORMATION, payload: { data: response.data, id } })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_INFORMATION, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}