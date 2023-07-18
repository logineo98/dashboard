import React from 'react'
import Circle from './statistic/Circle'
import Vertical from './statistic/Vertical'
import { PAGE_COMPONENT_TYPE } from '../../utils/types'

const Statistic: PAGE_COMPONENT_TYPE = ({ title }) => {
    return (
        <div className='statistic'>
            <Circle title={title} />

            <Vertical title={title} />
        </div>
    )
}

export default Statistic