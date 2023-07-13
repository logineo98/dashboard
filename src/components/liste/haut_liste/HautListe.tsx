import React from 'react'
import { PAGE_COMPONENT_TYPE } from '../../../utils/types'
import ActionFiltre from './ActionFiltre'
import Commun from './Commun'
import Stats from './Stats'
import FilterExportImport from './FilterExportImport'

const HautListe: PAGE_COMPONENT_TYPE = ({ title, ElementSelected, nbSelectedRow, setSearch, setEmptyRowSelected, setElementSelected }) => (

    <div className='haut_liste'>
        <Commun title={title} setSearch={setSearch} />
        <Stats />
        <FilterExportImport />
        {/* <ActionFiltre title={title} nbSelectedRow={nbSelectedRow} ElementSelected={ElementSelected} setEmptyRowSelected={setEmptyRowSelected} setElementSelected={setElementSelected} /> */}
    </div>
)

export default HautListe