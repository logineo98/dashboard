import React, { useEffect } from 'react'
import { page_dashboard } from '../utils/name_page'
import PageContainer from '../components/page/PageContainer'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import DashboardContainer from '../components/dashboard/DashboardContainer'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'
import { getAllStats } from '../redux/actions/stat.actions'

const Dashboard = () => {

    const { connected } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        document.title = page_dashboard
    }, [])

    useEffect(() => {
        dispatch(getAllStats())
    }, [connected, dispatch])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title='Tableau de bord' />

                <DashboardContainer />
            </div>
        </PageContainer>
    )
}

export default Dashboard