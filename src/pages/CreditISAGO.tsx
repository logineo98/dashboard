import React, { useEffect } from 'react'
import PageContainer from '../components/page/PageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'
import { page_credit_ISAGO } from '../utils/name_page'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import ListeFacturePostPayAndPrePay from '../components/listes/ListeFacturePostPayAndPrePay'
import { getAllPrePays } from '../redux/actions/pre_pay.actions'

const CreditISAGO = () => {

    const { connected } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        document.title = page_credit_ISAGO
    }, [])

    useEffect(() => {
        dispatch(getAllPrePays())
    }, [connected, dispatch])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title='Factures PRE PAID' />

                <ListeFacturePostPayAndPrePay title='pre_pay' />
            </div>
        </PageContainer>
    )
}

export default CreditISAGO