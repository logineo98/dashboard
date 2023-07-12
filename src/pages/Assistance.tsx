import React, { useEffect } from 'react'
import PageContainer from '../components/page/PageContainer'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import { page_assistance } from '../utils/name_page'

const Assistance = () => {

    useEffect(() => {
        document.title = page_assistance
    }, [])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title='Assistances' />
            </div>
        </PageContainer>
    )
}

export default Assistance