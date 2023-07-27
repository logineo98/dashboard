import React from 'react'
import { PAGE_COMPONENT_TYPE } from '../../utils/types'

const NoFilteredDataSearch: PAGE_COMPONENT_TYPE = ({ title }) => {

    if (title === 'admin') {
        return <h2 className='no_data'>Aucun(e) administrateur(trice) trouvé(e) !</h2>
    } else if (title === 'client') {
        return <h2 className='no_data'>Aucun client trouvé !</h2>
    } else if (title === 'news') {
        return <h2 className='no_data'>Aucune actualité trouvée !</h2>
    } else if (title === 'information') {
        return <h2 className='no_data'>Aucune information trouvée !</h2>
    } else if (title === 'town') {
        return <h2 className='no_data'>Aucune ville trouvée !</h2>
    } else if (title === 'post_pay') {
        return <h2 className='no_data'>Aucune facture post-payé trouvée !</h2>
    } else if (title === 'pre_pay') {
        return <h2 className='no_data'>Aucune facture pré-payé trouvée !</h2>
    } else if (title === 'devis') {
        return <h2 className='no_data'>Aucun devis trouvé !</h2>
    } else if (title === 'commune') {
        return <h2 className='no_data'>Aucune commune trouvé !</h2>
    } else if (title === 'quarter') {
        return <h2 className='no_data'>Aucun quartier trouvé !</h2>
    } else {
        return <></>
    }
}

export default NoFilteredDataSearch