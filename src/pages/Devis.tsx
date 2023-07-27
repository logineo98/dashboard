import React, { useEffect } from 'react'
import PageContainer from '../components/page/PageContainer'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import ListeDevis from '../components/listes/ListeDevis'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'
import { page_devis } from '../utils/name_page'
import { getAllDevis } from '../redux/actions/devis.actions'

const Devis = () => {

    const { connected } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        document.title = page_devis
    }, [])

    useEffect(() => {
        dispatch(getAllDevis())
    }, [connected, dispatch])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title='Devis' />

                <ListeDevis />
            </div>
        </PageContainer>
    )
}

export default Devis