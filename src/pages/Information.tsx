import React, { useEffect, useState } from 'react'
import PageContainer from '../components/page/PageContainer'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'
import { page_information } from '../utils/name_page'
import { PAGE_COMPONENT_TYPE } from '../utils/types'
import AddNewsInformation from '../components/add/AddNewsInformation'
import ListeNewsInformation from '../components/listes/ListeNewsInformation'
import { getAllInformations } from '../redux/actions/information.actions'

const Information: PAGE_COMPONENT_TYPE = () => {

    const [seeAddNewsInformation, setSeeAddNewsInformation] = useState(false)

    const { connected } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        document.title = page_information
    }, [])

    useEffect(() => {
        dispatch(getAllInformations())
    }, [connected, dispatch])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title="Informations" name_add='information' setSeeAddNewsInformation={setSeeAddNewsInformation} />

                <AddNewsInformation title='information' seeAddNewsInformation={seeAddNewsInformation} setSeeAddNewsInformation={setSeeAddNewsInformation} />
                <ListeNewsInformation title='information' />
            </div>
        </PageContainer>
    )
}

export default Information