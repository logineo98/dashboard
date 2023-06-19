import React, { useEffect } from 'react'
import { page_dashboard } from '../utils/name_page'
import PageContainer from '../components/page/PageContainer'

const Dashboard = () => {

    useEffect(() => {
        document.title = page_dashboard
    }, [])

    return (
        <PageContainer>
            <div>
                <p>Bonjour et bienvenue à tous et à toutes</p>
            </div>
        </PageContainer>
    )
}

export default Dashboard