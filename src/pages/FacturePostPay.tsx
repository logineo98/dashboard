import React, { useEffect } from 'react'
import PageContainer from '../components/page/PageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'
import { page_facture_post_pay } from '../utils/name_page'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import { getAllPostPays } from '../redux/actions/post_pay.actions'
import ListeFacturePostPayAndPrePay from '../components/listes/ListeFacturePostPayAndPrePay'

const FacturePostPay = () => {

    const { connected } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        document.title = page_facture_post_pay
    }, [])

    useEffect(() => {
        dispatch(getAllPostPays())
    }, [connected, dispatch])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title='Factures POST PAID' />

                <ListeFacturePostPayAndPrePay title='post_pay' />
            </div>
        </PageContainer>
    )
}

export default FacturePostPay