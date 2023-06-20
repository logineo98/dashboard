import React, { useEffect, useState } from 'react'
import PageContainer from '../components/page/PageContainer'
import { PAGE_COMPONENT_TYPE } from '../utils/types'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import { page_town } from '../utils/name_page'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'
import { getAllTowns } from '../redux/actions/town.actions'
import ListeTown from '../components/listes/ListeTown'
import AddTown from '../components/add/AddTown'

const Town: PAGE_COMPONENT_TYPE = () => {

    const [seeAddTown, setSeeAddTown] = useState(false)

    const { connected } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        document.title = page_town
    }, [])

    useEffect(() => {
        dispatch(getAllTowns())
    }, [connected, dispatch])


    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title="Villes" name_add='town' setSeeAddTown={setSeeAddTown} />

                <AddTown seeAddTown={seeAddTown} setSeeAddTown={setSeeAddTown} />
                <ListeTown />
            </div>
        </PageContainer>
    )
}

export default Town