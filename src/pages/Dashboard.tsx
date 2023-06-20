import React, { useEffect } from 'react'
import { page_dashboard } from '../utils/name_page'
import PageContainer from '../components/page/PageContainer'
import TitreAjout from '../components/titre_ajout/TitreAjout'

const Dashboard = () => {

    useEffect(() => {
        document.title = page_dashboard
    }, [])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title='Bonjour et bienvenue à tous et à toutes' />
            </div>
        </PageContainer>
    )
}

export default Dashboard