import React, { useEffect } from 'react'
import PageContainer from '../components/page/PageContainer'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'
import ListeClient from '../components/listes/ListeClient'
import { getAllClients } from '../redux/actions/user.actions'
import { page_client } from '../utils/name_page'

const ClientsMobile = () => {

    const { connected } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        document.title = page_client
    }, [])

    useEffect(() => {
        dispatch(getAllClients())
    }, [connected, dispatch])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title="Clients mobiles" />

                <ListeClient />
            </div>
        </PageContainer>
    )
}

export default ClientsMobile