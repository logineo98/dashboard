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

            <p className='info'>Statistiques des paiements DEVIS</p>
            <Statistic title='devis' />

            <p className='info'>Statistiques des paiements ISAGO</p>
            <Statistic title='pre_pay' />

            <p className='info'>Statistiques des paiements POST PAID</p>
            <Statistic title='post_pay' />
        </div>
    )
}

export default DashboardContainer