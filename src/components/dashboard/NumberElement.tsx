import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'
import { NUMBER_ELEMENT_DASHBOARD_TYPE } from '../../utils/types'
import { Link } from 'react-router-dom'

const NumberElement: FC<NUMBER_ELEMENT_DASHBOARD_TYPE> = ({ title, icon, name, link }) => {

    const { allStats } = useSelector((state: RootReducerType) => state.stat)

    return (
        <Link to={link} className='container'>
            <p className='icon_container'> {icon} </p>

            <div className='name_number'>
                <p className='name'> {name} </p>
                <p className='number'> {title === 'actu' ? allStats?.actu : title === 'info' ? allStats?.info : title === 'user' ? allStats?.user : title === 'admin' ? allStats?.admin : title === 'devis' ? allStats?.devis : 'Inconnu'} </p>
            </div>
        </Link>
    )
}

export default NumberElement