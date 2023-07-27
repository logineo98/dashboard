import { toast } from 'react-toastify'
import { ERROR_DEVIS, EXPORT_DEVIS, FILTER_DEVIS, GET_ALL_DEVIS, IMPORT_DEVIS, LOADING_DEVIS, VALIDATE_DEVIS, api_devis } from '../constants'
import axios from 'axios'
import { VALIDATION_DEVIS_TYPE } from '../../utils/types'

const token = localStorage.getItem('token')

const LoadingDevis: () => any = () => (dispatch: any) => {
    dispatch({ type: LOADING_DEVIS })
}

export const getAllDevis = () => async (dispatch: any) => {
    try {
        dispatch(LoadingDevis())

        const response = await axios.get(`${api_devis}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: GET_ALL_DEVIS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_DEVIS, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const validateDevis = (id: string, data: VALIDATION_DEVIS_TYPE, setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>, setValidationDevisData: React.Dispatch<React.SetStateAction<VALIDATION_DEVIS_TYPE>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingDevis())

        const response = await axios.put(`${api_devis}/${id}/validate`, data, { headers: { Authorization: `Bearer ${token}` } })

        if (data.status === 'PENDING') toast.success('Le devis a été mise en attente de validation avec succès.')
        else if (data.status === 'VALIDATED') toast.success('Le devis a été validé avec succès.')
        else if (data.status === 'REJECT') toast.success('Le devis a été rejeté avec succès.')
        setSeeModalDisplayEditDelete(false)
        setValidationDevisData({ amount: '', motif: '', status: '' })

        dispatch({ type: VALIDATE_DEVIS, payload: { id, data: response.data } })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_DEVIS, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const filterDevis = (data: { status?: string | null, paymentStatus?: string | null, begin?: string | null, end?: string | null }) => async (dispatch: any) => {
    try {
        dispatch(LoadingDevis())

        const response = await axios.post(`${api_devis}/filter`, data, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: FILTER_DEVIS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_DEVIS, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const exportDevis = (data: { status?: string | null, paymentStatus?: string | null, begin?: string | null, end?: string | null }) => async (dispatch: any) => {
    try {
        dispatch(LoadingDevis())

        const response = await axios.post(`${api_devis}/export`, data, { headers: { Authorization: `Bearer ${token}` }, responseType: 'blob' })

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'devis.xlsx')
        document.body.appendChild(link)
        link.click()

        toast.success('L\'exportation du fichier a été effectuée avec succès.')

        dispatch({ type: EXPORT_DEVIS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_DEVIS, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const importDevis = (data: FormData, setDevisFile: React.Dispatch<React.SetStateAction<File | null>>, setDevisFileName: React.Dispatch<React.SetStateAction<string>>, setDisplayDevisImportation: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any) => {
    try {
        dispatch(LoadingDevis())

        const response = await axios.post(`${api_devis}/import`, data, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })

        setDevisFileName('')
        setDevisFile(null)
        setDisplayDevisImportation(false)

        toast.success('L\'importation du fichier a été effectuée avec succès.')

        dispatch(getAllDevis())
        dispatch({ type: IMPORT_DEVIS, payload: response.data })
    } catch (error: any) {
        toast.error(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: ERROR_DEVIS, payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}