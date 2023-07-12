import React from 'react'
import Statistic from './Statistic'
import NumberElement from './NumberElement'
import { numberElements } from '../../utils/dashboard'


const DashboardContainer = () => {

    return (
        <div className='dashboard'>
            <div className='number_element'>
                {numberElements.map((el, i) => <NumberElement key={i} title={el.title} icon={el.icon} name={el.name} link={el.link} />)}
            </div>

            <p className='info'>Statistiques des paiements ISAGO</p>
            <Statistic />

            <p className='info'>Statistiques des paiements POST PAYÉ</p>
            <Statistic />

            <p className='info'>Statistiques des paiements DEVIS</p>
            <Statistic />
        </div>
    )
}

export default DashboardContainer