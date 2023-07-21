import React, { useEffect, useState } from 'react'
import PageContainer from '../components/page/PageContainer'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import { page_assistance } from '../utils/name_page'
import Map from '../components/assistance/Map'
import Discussion from '../components/assistance/Discussion'
import { useDispatch } from 'react-redux'
import { getAllAssistances } from '../redux/actions/assistance.actions'

const Assistance = () => {

    const [displayDiscussion, setDisplayDiscussion] = useState(false)

    const dispatch = useDispatch<any>()

    useEffect(() => {
        document.title = page_assistance

        dispatch(getAllAssistances())
    }, [dispatch])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title='Assistances' />

                <div className='map_discussion_container'>
                    <Map displayDiscussion={displayDiscussion} setDisplayDiscussion={setDisplayDiscussion} />
                    <Discussion displayDiscussion={displayDiscussion} setDisplayDiscussion={setDisplayDiscussion} />
                </div>
            </div>
        </PageContainer>
    )
}

export default Assistance