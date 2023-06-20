import React from 'react'
import { PAGE_COMPONENT_TYPE } from '../../../utils/types'
import ActionFiltre from './ActionFiltre'
import Commun from './Commun'

const HautListe: PAGE_COMPONENT_TYPE = ({ title, ElementSelected, nbSelectedRow, setSearch, setEmptyRowSelected, setElementSelected }) => (

    <div className='haut_liste'>
        <Commun title={title} setSearch={setSearch} />
        <ActionFiltre title={title} nbSelectedRow={nbSelectedRow} ElementSelected={ElementSelected} setEmptyRowSelected={setEmptyRowSelected} setElementSelected={setElementSelected} />
    </div>
)

export default HautListe