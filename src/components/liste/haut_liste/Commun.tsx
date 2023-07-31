import React, { useEffect, useState } from 'react'
import { PAGE_COMPONENT_TYPE } from '../../../utils/types'
import Loading from '../../loading/Loading'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../../redux/store'

const Commun: PAGE_COMPONENT_TYPE = ({ title, setSearch }) => {

    const [reduxLoading, setReduxLoading] = useState(false)

    const { loadingDevis } = useSelector((state: RootReducerType) => state.devis)
    const { loadingInfo } = useSelector((state: RootReducerType) => state.information)
    const { loadingNews } = useSelector((state: RootReducerType) => state.news)
    const { loadingPostPay } = useSelector((state: RootReducerType) => state.post_pay)
    const { loadingPrePay } = useSelector((state: RootReducerType) => state.pre_pay)
    const { loadingTown } = useSelector((state: RootReducerType) => state.town)
    const { loadingUser } = useSelector((state: RootReducerType) => state.user)
    const { loadingCommune } = useSelector((state: RootReducerType) => state.commune)
    const { loadingQuarter } = useSelector((state: RootReducerType) => state.quarter)

    useEffect(() => {
        switch (title) {
            case 'devis': setReduxLoading(loadingDevis); break
            case 'information': setReduxLoading(loadingInfo); break
            case 'news': setReduxLoading(loadingNews); break
            case 'post_pay': setReduxLoading(loadingPostPay); break
            case 'pre_pay': setReduxLoading(loadingPrePay); break
            case 'town': setReduxLoading(loadingTown); break
            case 'admin': setReduxLoading(loadingUser); break
            case 'client': setReduxLoading(loadingUser); break
            case 'commune': setReduxLoading(loadingCommune); break
            case 'quarter': setReduxLoading(loadingQuarter); break

            default: setReduxLoading(false); break
        }
    }, [title, loadingDevis, loadingInfo, loadingNews, loadingPostPay, loadingPrePay, loadingTown, loadingUser, loadingCommune, loadingQuarter])


    return (
        <div className='common'>
            <div className='loading_container'>
                {reduxLoading ? <Loading h_w={30} hide_text padding='0px' mg='0px' /> : <div></div>}
            </div>

            <div className='filtre_by_search'>
                <input type='search' name='search' id='search' placeholder='Recherche...' onChange={(e) => setSearch && setSearch(e.target.value)} />
            </div>
        </div >
    )
}

export default Commun