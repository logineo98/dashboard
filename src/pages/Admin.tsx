import React, { useEffect, useState } from 'react'
import PageContainer from '../components/page/PageContainer'
import { page_admin } from '../utils/name_page'
import TitreAjout from '../components/titre_ajout/TitreAjout'
import ListeAdmin from '../components/listes/ListeAdmin'
import AddAdmin from '../components/add/AddAdmin'
import { PAGE_COMPONENT_TYPE } from '../utils/types'
import { getAllAdmins } from '../redux/actions/user.actions'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../redux/store'

const Admin: PAGE_COMPONENT_TYPE = () => {

    const [seeAdminAdmin, setSeeAdminAdmin] = useState(false)

    const { connected } = useSelector((state: RootReducerType) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        document.title = page_admin
    }, [])

    useEffect(() => {
        dispatch(getAllAdmins())
    }, [connected, dispatch])

    return (
        <PageContainer>
            <div className='right_container'>
                <TitreAjout title='Administrateurs' name_add='admin' setSeeAdminAdmin={setSeeAdminAdmin} />

                <AddAdmin seeAdminAdmin={seeAdminAdmin} setSeeAdminAdmin={setSeeAdminAdmin} />
                <ListeAdmin />
            </div>
        </PageContainer>
    )
}

export default Admin