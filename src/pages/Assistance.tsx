import React, { useEffect } from 'react'
import PageContainer from '../components/page/PageContainer'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import { page_assistance } from '../utils/name_page'
import Map from '../components/assistance/Map'
import Discussion from '../components/assistance/Discussion'


const Assistance = () => {

    useEffect(() => {
        document.title = page_assistance
    }, [])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title='Assistances' />

                <div className='map_discussion_container'>
                    <Map />
                    <Discussion />
                </div>
            </div>
        </PageContainer>
    )
}

export default Assistance