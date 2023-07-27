import React, { useEffect, useState } from 'react'
import PageContainer from '../components/page/PageContainer'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'
import { page_quartier } from '../utils/name_page'
import { getAllQuarters } from '../redux/actions/quarter.actions'
import AddQuarter from '../components/add/AddQuarter'
import ListeQuarter from '../components/listes/ListeQuarter'

const Quarter = () => {

    const [seeQuarter, setSeeQuarter] = useState(false)

    const { connected } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        document.title = page_quartier
    }, [])

    useEffect(() => {
        dispatch(getAllQuarters())
    }, [connected, dispatch])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title='Quartiers' name_add='quarter' setSeeQuarter={setSeeQuarter} />

                <AddQuarter seeQuarter={seeQuarter} setSeeQuarter={setSeeQuarter} />
                <ListeQuarter />
            </div>
        </PageContainer>
    )
}

export default Quarter