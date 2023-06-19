import React, { useEffect, useState } from 'react'
import PageContainer from '../components/page/PageContainer'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'
import { page_news } from '../utils/name_page'
import { getAllNews } from '../redux/actions/news.actions'
import { PAGE_COMPONENT_TYPE } from '../utils/types'
import AddNewsInformation from '../components/add/AddNewsInformation'
import ListeNewsInformation from '../components/listes/ListeNewsInformation'

const News: PAGE_COMPONENT_TYPE = () => {

    const [seeAddNewsInformation, setSeeAddNewsInformation] = useState(false)

    const { connected } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        document.title = page_news
    }, [])

    useEffect(() => {
        dispatch(getAllNews())
    }, [connected, dispatch])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title="Actualités" name_add='news' setSeeAddNewsInformation={setSeeAddNewsInformation} />

                <AddNewsInformation title='news' seeAddNewsInformation={seeAddNewsInformation} setSeeAddNewsInformation={setSeeAddNewsInformation} />
                <ListeNewsInformation title='news' />
            </div>
        </PageContainer>
    )
}

export default News