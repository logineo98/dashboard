import axios from "axios"
import { ADD_NEWS, DELETE_NEWS, EDIT_NEWS, ERROR_NEWS, GET_ALL_NEWS, LOADING_NEWS, api_news } from "../constants"
import { toast } from "react-toastify"
import { ADD_EDIT_NEWS_INFORMATION_TYPE } from "../../utils/types"

const token = localStorage.getItem('token')

const LoadingNews: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_NEWS })
}

export const getAllNews = () => async (dispatch: any) => {
    try {
        dispatch(LoadingNews())

        const response = await axios.get(`${api_news}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_NEWS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_NEWS, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const addNews = (data: FormData, setAddNewsData: React.Dispatch<React.SetStateAction<ADD_EDIT_NEWS_INFORMATION_TYPE>>, setPreviewImg: React.Dispatch<React.SetStateAction<string | File>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingNews())

        const response = await axios.post(`${api_news}`, data, { headers: { "Content-Type": 'multipart/form-data', Authorization: `Bearer ${token}` } })

        toast.success('L\'actualité a été ajoutée avec succès.')

        setAddNewsData({ title: '', content: '', image: '' })
        setPreviewImg('')

        dispatch({ type: ADD_NEWS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_NEWS, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const editNews = (id: string, data: FormData, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingNews())

        const response = await axios.put(`${api_news}/${id}`, data, { headers: { "Content-Type": 'multipart/form-data', Authorization: `Bearer ${token}` } })

        toast.success('L\'actualité a été modifiée avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: EDIT_NEWS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_NEWS, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const deleteNews = (id: string, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingNews())

        const response = await axios.delete(`${api_news}/${id}`, { headers: { Authorization: `Bearer ${token}` } })

        toast.success('L\'actualité a été supprimée avec succès.')

        setSeeModalDisplayEditDelete(false)

        dispatch({ type: DELETE_NEWS, payload: { data: response.data, id } })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_NEWS, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}