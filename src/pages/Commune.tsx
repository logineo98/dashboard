import React, { useEffect, useState } from 'react'
import PageContainer from '../components/page/PageContainer'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import { page_commune } from '../utils/name_page'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'
import { getAllCommunes } from '../redux/actions/commune.actions'
import AddCommune from '../components/add/AddCommune'
import ListeCommune from '../components/listes/ListeCommune'

const Commune = () => {

    const [seeCommune, setSeeCommune] = useState(false)

    const { connected } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        document.title = page_commune
    }, [])

    useEffect(() => {
        dispatch(getAllCommunes())
    }, [connected, dispatch])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title='Communes' name_add='commune' setSeeCommune={setSeeCommune} />

                <AddCommune seeCommune={seeCommune} setSeeCommune={setSeeCommune} />
                <ListeCommune />
            </div>
        </PageContainer>
    )
}

export default Commune