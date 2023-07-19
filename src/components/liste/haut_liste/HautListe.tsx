import React from 'react'
import { PAGE_COMPONENT_TYPE } from '../../../utils/types'
import Commun from './Commun'
import Stats from './Stats'
import FilterExportImport from './FilterExportImport'

const HautListe: PAGE_COMPONENT_TYPE = ({ title, setSearch }) => (

    <div className='haut_liste'>
        <Commun title={title} setSearch={setSearch} />
        <Stats title={title} />
        <FilterExportImport title={title} />
        {/* <ActionFiltre title={title} nbSelectedRow={nbSelectedRow} ElementSelected={ElementSelected} setEmptyRowSelected={setEmptyRowSelected} setElementSelected={setElementSelected} /> */}
    </div>
)

export default HautListe