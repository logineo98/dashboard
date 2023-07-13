import React from 'react'
import { PAGE_COMPONENT_TYPE } from '../../../utils/types'

const Stats: PAGE_COMPONENT_TYPE = ({ title }) => {
    return (
        <div className='stat_top_data_table'>
            <div className='stat_container'>
                <span className='stat_name'>Statut = <span style={{}}>activé</span> </span>
                <span className='stat_number'>5</span>
            </div>
            <div className='stat_container'>
                <span className='stat_name'>Statut = <span style={{}}>non activé</span> </span>
                <span className='stat_number'>5</span>
            </div>
        </div>
    )
}

export default Stats